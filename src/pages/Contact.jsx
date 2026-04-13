import { useTranslation } from 'react-i18next';
import '../styles/Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h1 className="animate-slide-in">{t('contact.title')}</h1>
        <p className="section-description animate-fade-in delay-200">
          {t('contact.subtitle')}
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                </svg>
              </div>
              <h3>{t('contact.openingHours')}</h3>
              <div className="hours-list">
                <p>{t('contact.hours.weekdays')}</p>
                <p>{t('contact.hours.weekend')}</p>
              </div>
              <div className="button-group">
                <a 
                  href={t('contact.bookingUrl')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-button primary-btn"
                >
                  {t('contact.bookingButton')}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.477 10-10c0-5.524-4.477-10-10-10zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-2 12v-3H8v-2h2V9h2v2h2v2h-2v3h-2zm6-6h-2V8h2v2zm-2 2h2v2h-2v-2z"/>
                </svg>
              </div>
              <h3>{t('contact.social')}</h3>
              <a 
                href="https://linktr.ee/your-username"
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button secondary-btn"
              >
                {t('contact.followUs')}
              </a>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3>{t('contact.whatsapp')}</h3>
              <a 
                href="https://wa.me/32496112545"
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button secondary-btn"
              >
                {t('contact.whatsappText')}
              </a>
            </div>
          </div>

          <div className="contact-map-column">
            <div className="contact-address-panel">
              <div className="contact-address-icon" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.035a8.955 8.955 0 00-8.956-8.956c-4.935 0-8.957 4.021-8.957 8.957 0 3.064 2.018 6.046 3.962 8.035 1.029 1.052 2.15 1.99 2.683 2.282a16.975 16.975 0 001.145.742zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="contact-address-body">
                <span className="contact-address-label">{t('contact.addressLabel')}</span>
                <p className="contact-address-street">{t('contact.addressStreet')}</p>
                <p className="contact-address-city">{t('contact.addressCity')}</p>
                <a
                  href={t('contact.mapsUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-address-maps"
                >
                  {t('contact.openInMaps')}
                </a>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.6917913034283!2d4.2404646!3d50.8667369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c7f5d9c8c5a7%3A0x5b7b7c96c5e16b9a!2sStationsstraat%20312a%2C%201700%20Dilbeek%2C%20Belgium!5e0!3m2!1sen!2sus!4v1681762200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.mapEmbedTitle')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 