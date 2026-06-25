import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Vacancy.css';
import {
  FIELD_LIMITS,
  getAllFieldErrors,
  isBotSubmission,
  isRateLimited,
  recordSubmission,
  validateField,
  validateVacancyForm,
} from '../utils/vacancyFormSecurity';

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPTED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const VACANCY_FORM_EMAIL = 'mathieu@fysioforce.be';

const resetFormState = () => ({
  name: '',
  email: '',
  phone: '',
  diploma: '',
  message: '',
});

const isFieldValid = (field, value, cvFile) => {
  if (field === 'cv') {
    return Boolean(cvFile) && !validateField('cv', '', { cvFile });
  }
  if (field === 'message') {
    const trimmed = value.trim();
    return trimmed.length > 0 && !validateField('message', value);
  }
  if (field === 'phone') {
    const trimmed = value.trim();
    return trimmed.length > 0 && !validateField('phone', value);
  }
  return !validateField(field, value);
};

const Vacancy = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(resetFormState);
  const [honeypot, setHoneypot] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef(null);
  const formMountedAt = useRef(Date.now());

  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

  const inputClassName = (field) => {
    if (!touched[field]) return '';
    if (field === 'cv') {
      return cvFile && isFieldValid('cv', '', cvFile) ? 'vacancy-input--valid' : '';
    }
    return isFieldValid(field, form[field], cvFile) ? 'vacancy-input--valid' : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const limit = FIELD_LIMITS[name];
    setForm((prev) => ({
      ...prev,
      [name]: limit ? value.slice(0, limit) : value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrorMessage('');
    setStatus('idle');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setTouched((prev) => ({ ...prev, cv: true }));
    setErrorMessage('');
    setStatus('idle');

    if (!file) {
      setCvFile(null);
      return;
    }

    if (!ACCEPTED_CV_TYPES.includes(file.type) || file.size > MAX_CV_BYTES) {
      setCvFile(null);
      e.target.value = '';
      return;
    }

    setCvFile(file);
  };

  const clearForm = () => {
    setForm(resetFormState());
    setHoneypot('');
    setCvFile(null);
    setTouched({});
    setErrorMessage('');
    setStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('idle');

    setTouched({ name: true, email: true, phone: true, message: true, cv: true, diploma: true });

    if (isBotSubmission({ honeypot, mountedAt: formMountedAt.current })) {
      setStatus('success');
      clearForm();
      return;
    }

    if (isRateLimited()) {
      setErrorMessage(t('vacancy.errors.rateLimit'));
      return;
    }

    const liveErrors = getAllFieldErrors(form, cvFile);
    const validation = validateVacancyForm(form, cvFile);

    if (Object.keys(liveErrors).length || !validation.ok) {
      return;
    }

    const { name, email, phone, diploma, message } = validation.data;
    setStatus('sending');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone || '—');
    formData.append('diploma', diploma || '—');
    formData.append('message', message || '—');
    formData.append('_subject', t('vacancy.formSubject'));
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('_honey', honeypot);
    if (cvFile) {
      formData.append('attachment', cvFile);
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${VACANCY_FORM_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('submit_failed');
      }

      recordSubmission();
      setStatus('success');
      clearForm();
      formMountedAt.current = Date.now();
    } catch {
      setErrorMessage(t('vacancy.errors.submit'));
    }
  };

  return (
    <section id="vacancy" className="vacancy">
      <div className="container">
        <h2 className="section-title">{t('vacancy.title')}</h2>
        <p className="vacancy-tagline">{t('vacancy.tagline')}</p>
        <p className="section-description vacancy-description">{t('vacancy.body')}</p>

        <div className="vacancy-form-card">
          <h3>{t('vacancy.formTitle')}</h3>
          <form className="vacancy-form" onSubmit={handleSubmit} noValidate>
            <div className="vacancy-honeypot" aria-hidden="true">
              <label htmlFor="vacancy-company">{t('vacancy.honeypotLabel')}</label>
              <input
                id="vacancy-company"
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="vacancy-form-row">
              <label className="vacancy-field">
                <span>{t('vacancy.fields.name')}</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  maxLength={FIELD_LIMITS.name}
                  autoComplete="name"
                  className={inputClassName('name')}
                />
              </label>
              <label className="vacancy-field">
                <span>{t('vacancy.fields.email')}</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  maxLength={FIELD_LIMITS.email}
                  autoComplete="email"
                  className={inputClassName('email')}
                />
              </label>
            </div>

            <div className="vacancy-form-row">
              <label className="vacancy-field">
                <span>{t('vacancy.fields.phone')}</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={FIELD_LIMITS.phone}
                  autoComplete="tel"
                  inputMode="tel"
                  className={inputClassName('phone')}
                />
              </label>
              <label className="vacancy-field">
                <span>{t('vacancy.fields.diploma')}</span>
                <input
                  type="text"
                  name="diploma"
                  value={form.diploma}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={FIELD_LIMITS.diploma}
                  placeholder={t('vacancy.fields.diplomaPlaceholder')}
                  className={inputClassName('diploma')}
                />
              </label>
            </div>

            <label className="vacancy-field">
              <span>{t('vacancy.fields.message')}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                placeholder={t('vacancy.fields.messagePlaceholder')}
                className={inputClassName('message')}
              />
            </label>

            <label className="vacancy-field vacancy-field--file">
              <span>{t('vacancy.fields.cv')}</span>
              <input
                ref={fileInputRef}
                type="file"
                name="attachment"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                onBlur={() => setTouched((prev) => ({ ...prev, cv: true }))}
                className={inputClassName('cv')}
              />
              <small>{t('vacancy.cvHint')}</small>
              {touched.cv && cvFile && isFieldValid('cv', '', cvFile) && (
                <span className="vacancy-file-ok">{t('vacancy.fileSelected', { name: cvFile.name })}</span>
              )}
            </label>

            {errorMessage && <p className="vacancy-notice">{errorMessage}</p>}
            {status === 'success' && (
              <p className="vacancy-success">{t('vacancy.success')}</p>
            )}

            <div className="vacancy-actions">
              <button
                type="submit"
                className={`vacancy-submit submit-btn${status === 'sending' ? ' sending' : ''}${status === 'success' ? ' success' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('vacancy.sending') : t('vacancy.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Vacancy;
