import { useTranslation, Trans } from 'react-i18next';
import '../styles/Services.css';

const Services = () => {
  const { t } = useTranslation();

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
                  {index === 2 ? (
                    <p>
                      <Trans
                        i18nKey="services.specialties.osteopathyEnerki"
                        components={{
                          enerkiLink: (
                            <a
                              href="https://enerki.be/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="services-enerki-link"
                            />
                          ),
                        }}
                      />
                    </p>
                  ) : (
                    <p>{item}</p>
                  )}
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
