import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Services.css';

const Services = () => {
  const { t } = useTranslation();

  const getIconForService = (index) => {
    switch (index) {
      case 0: // Post-operative rehabilitation
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"/>
          </svg>
        );
      case 1: // Manual therapy
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1c-2.4 0-4.52 1.21-5.78 3.05A7.103 7.103 0 0 0 8 4c-3.87 0-7 3.13-7 7 0 2.38 1.19 4.47 3 5.74V19c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-5.99 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V5h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V5h2v2z"/>
          </svg>
        );
      case 2: // Sports physiotherapy
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 5.1L9 3 3 5.02v16.2l6-2.33 6 2.1 6-2.02V2.77L15 5.1zm0 13.79l-6-2.11V5.11l6 2.11v11.67z"/>
          </svg>
        );
      case 3: // Osteopathy
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-4.42 0-8 3.58-8 8 0 2.03.76 3.87 2 5.28V20c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4.72c1.24-1.41 2-3.25 2-5.28 0-4.42-3.58-8-8-8zm-1 17v-3h2v3h-2zm3-5h-4v-2h4v2z"/>
          </svg>
        );
      case 4: // Dry Needling
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
          </svg>
        );
      case 5: // Taping
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
          </svg>
        );
      case 6: // Velocity based training
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
        
        <div className="services-content">
          <div className="specialties">
            <h3>{t('services.specialties.title')}</h3>
            <div className="services-grid">
              {t('services.specialties.items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="service-card fade-in-element">
                  <div className="service-icon">
                    {getIconForService(index)}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="additional-services">
            <h3>{t('services.additional.title')}</h3>
            <div className="services-list">
              {t('services.additional.items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="service-item fade-in-element">
                  <div className="service-bullet">•</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 