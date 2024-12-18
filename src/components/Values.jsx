import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Values.css';

const Values = () => {
  const { t } = useTranslation();

  const values = [
    {
      title: t('values.items.movement.title'),
      description: t('values.items.movement.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
        </svg>
      )
    },
    {
      title: t('values.items.evidence.title'),
      description: t('values.items.evidence.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/>
        </svg>
      )
    },
    {
      title: t('values.items.communication.title'),
      description: t('values.items.communication.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="values" className="values-section">
      <div className="container">
        <h2 className="section-title">{t('values.title')}</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card fade-in-element">
              <div className="value-icon">
                {value.icon}
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values; 