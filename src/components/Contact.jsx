import React, { useTranslation } from 'react-i18next';
import { FaShare, FaWhatsapp, FaClock } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-description">{t('contact.subtitle')}</p>

        <div className="contact-grid">
          {/* Social Media Link */}
          <a 
            href="https://linktr.ee/jouw-linktree-username" // Vervang met je eigen Linktree URL
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-item"
          >
            <FaShare className="icon" />
            <span>{t('contact.social')}</span>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/jouw-nummer" // Vervang met je WhatsApp nummer
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-item"
          >
            <FaWhatsapp className="icon" />
            <span>{t('contact.whatsapp')}</span>
          </a>

          {/* Opening Hours */}
          <div className="contact-item opening-hours">
            <FaClock className="icon" />
            <div className="hours-container">
              <h3>{t('contact.openingHours')}</h3>
              <ul>
                <li>{t('contact.hours.monday')}</li>
                <li>{t('contact.hours.tuesday')}</li>
                <li>{t('contact.hours.wednesday')}</li>
                <li>{t('contact.hours.thursday')}</li>
                <li>{t('contact.hours.friday')}</li>
                <li>{t('contact.hours.saturday')}</li>
                <li>{t('contact.hours.sunday')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 