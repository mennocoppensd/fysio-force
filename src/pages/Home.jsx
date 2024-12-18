import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';
import '../styles/animations.css';

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (window.innerHeight * 0.5);
      document.documentElement.style.setProperty(
        '--scroll-percentage',
        Math.min(1, scrollPercentage)
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1 className="animate-slide-in">{t('home.welcome')}</h1>
        <p className="animate-fade-in delay-200">{t('home.subtitle')}</p>
        <div className="cta-buttons animate-fade-in delay-400">
          <a 
            href="https://your-booking-url.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button"
          >
            {t('home.cta.contact')}
          </a>
        </div>
        <div className="explore-section animate-fade-in delay-600">
          <p>{t('home.explore')}</p>
          <div className="explore-arrow">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="scroll-arrow"
            >
              <path 
                d="M12 4L12 20M12 20L18 14M12 20L6 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 