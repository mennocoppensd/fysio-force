export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  diploma: 120,
};

export const MIN_SUBMIT_MS = 3000;
export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_KEY = 'ff_vacancy_submissions';

export const sanitizeText = (value, maxLen) =>
  value.trim().slice(0, maxLen).replace(/\0/g, '');

export const isValidEmail = (email) =>
  email.length <= FIELD_LIMITS.email &&
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export const isValidPhone = (phone) =>
  !phone || /^[\d\s+\-().]{0,30}$/.test(phone);

export const looksLikeSpam = (message) => {
  const urlCount = (message.match(/https?:\/\//gi) || []).length;
  return urlCount > 3 || /<script|javascript:/i.test(message);
};

export const isSafeFilename = (name) => {
  const base = name.split(/[/\\]/).pop() || '';
  return (
    base.length > 0 &&
    base.length <= 200 &&
    !/\.(exe|js|html|htm|php|sh|bat|cmd|svg)$/i.test(base)
  );
};

export const isRateLimited = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter(
      (ts) => Date.now() - ts < RATE_LIMIT_WINDOW_MS
    );
    return recent.length >= RATE_LIMIT_MAX;
  } catch {
    return false;
  }
};

export const recordSubmission = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter(
      (ts) => Date.now() - ts < RATE_LIMIT_WINDOW_MS
    );
    recent.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch {
    /* ignore storage errors */
  }
};

export const isBotSubmission = ({ honeypot, mountedAt }) => {
  if (honeypot.trim()) return true;
  if (Date.now() - mountedAt < MIN_SUBMIT_MS) return true;
  return false;
};

export const validateField = (fieldName, value, options = {}) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  switch (fieldName) {
    case 'name':
      if (!trimmed) return 'nameRequired';
      if (trimmed.length < 2) return 'nameTooShort';
      return null;
    case 'email':
      if (!trimmed) return 'emailRequired';
      if (!isValidEmail(trimmed)) return 'invalidEmail';
      return null;
    case 'phone':
      if (trimmed && !isValidPhone(trimmed)) return 'invalidPhone';
      return null;
    case 'message':
      if (!trimmed) return null;
      if (looksLikeSpam(trimmed)) return 'messageSpam';
      return null;
    case 'cv':
      if (options.cvFile && !isSafeFilename(options.cvFile.name)) return 'invalidFile';
      return null;
    default:
      return null;
  }
};

export const getAllFieldErrors = (form, cvFile) => {
  const errors = {};
  ['name', 'email', 'phone', 'message'].forEach((field) => {
    const errorKey = validateField(field, form[field]);
    if (errorKey) errors[field] = errorKey;
  });
  if (cvFile) {
    const cvError = validateField('cv', '', { cvFile });
    if (cvError) errors.cv = cvError;
  }
  return errors;
};

export const validateVacancyForm = (form, cvFile) => {
  const name = sanitizeText(form.name, FIELD_LIMITS.name);
  const email = sanitizeText(form.email, FIELD_LIMITS.email);
  const phone = sanitizeText(form.phone, FIELD_LIMITS.phone);
  const diploma = sanitizeText(form.diploma, FIELD_LIMITS.diploma);
  const message = form.message.trim().replace(/\0/g, '');

  if (!name || !email) {
    return { ok: false, error: 'invalidInput' };
  }
  if (message && looksLikeSpam(message)) {
    return { ok: false, error: 'messageSpam' };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'invalidEmail' };
  }
  if (!isValidPhone(phone)) {
    return { ok: false, error: 'invalidPhone' };
  }
  if (cvFile && !isSafeFilename(cvFile.name)) {
    return { ok: false, error: 'invalidFile' };
  }

  return {
    ok: true,
    data: { name, email, phone, diploma, message },
  };
};
