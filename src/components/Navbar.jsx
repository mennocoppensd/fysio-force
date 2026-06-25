import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('userLanguage') || 'en'
  );

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'team',
      'values',
      'services',
      'rates',
      'contact',
      'faq',
      'vacancy'
    ];

    const getNavOffset = () => {
      const nav = document.querySelector('.navbar');
      return (nav?.offsetHeight ?? 80) + 24;
    };

    const updateActiveFromScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      const trigger = window.scrollY + getNavOffset();
      let active = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (trigger >= top) {
          active = id;
        }
      }

      setActiveSection(active);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);

    /* <main> mount pas na Loader (~2s); extra ticks na paint */
    const resyncDelays = [0, 100, 500, 1200, 2100, 2800].map((ms) =>
      window.setTimeout(updateActiveFromScroll, ms)
    );

    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
      resyncDelays.forEach(clearTimeout);
    };
  }, []);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    setIsOpen(false);
  };

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'team', label: t('nav.team') },
    { id: 'values', label: t('nav.values') },
    { id: 'services', label: t('nav.services') },
    { id: 'rates', label: t('nav.rates') },
    { id: 'contact', label: t('nav.contact') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'vacancy', label: t('nav.vacancy') }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={(e) => handleClick(e, 'home')}>
          <img src="/Logo.svg" alt="FysioForce Logo" className="navbar-logo" />
          <span className="logo-text">
            <span className="logo-fysio">Fysio</span>
            <span className="logo-force">Force</span>
          </span>
        </a>
        
        <div className="nav-right">
          <LanguageSwitcher
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <div className={`hamburger ${isOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 