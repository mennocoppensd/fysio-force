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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      if (window.scrollY < 50) {
        setActiveSection('home');
        return;
      }

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < (sectionTop + sectionHeight)
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'team', label: t('nav.team') },
    { id: 'values', label: t('nav.values') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
    { id: 'faq', label: t('nav.faq') }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={(e) => handleClick(e, 'home')}>
          <img src="/favicon.svg" alt="FysioForce Logo" className="navbar-logo" />
          FysioForce
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