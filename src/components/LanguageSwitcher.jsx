import { useState, useRef } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import ukFlag from '../assets/flags/uk-flag.svg';
import belgianFlag from '../assets/flags/belgian-flag.svg';
import frenchFlag from '../assets/flags/french-flag.svg';
import '../styles/LanguageSwitcher.css';

const LanguageSwitcher = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'EN', flag: ukFlag },
    { code: 'nl', name: 'BE', flag: belgianFlag },
    { code: 'fr', name: 'FR', flag: frenchFlag }
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    // Only enable hover on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Only enable hover on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };

  return (
    <div 
      className="language-switcher"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={languages.find(lang => lang.code === currentLang).flag} 
          alt={`${languages.find(lang => lang.code === currentLang).name} flag`}
          className="flag-icon"
        />
        {languages.find(lang => lang.code === currentLang).name}
        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => {
                handleLanguageChange(lang.code);
              }}
            >
              <img src={lang.flag} alt={`${lang.name} flag`} className="flag-icon" />
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 