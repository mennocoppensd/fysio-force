import { useTranslation } from 'react-i18next';

const Rates = () => {
  const { t } = useTranslation();

  return (
    <section id="rates" className="rates">
      <div className="container">
        <h1 className="section-title">{t('rates.title')}</h1>
        <p className="section-description">{t('rates.subtitle')}</p>
        
        <div className="rates-content">
          <div className="rate-item">
            <h2>{t('rates.conventional.title')}</h2>
            <p className="description">{t('rates.conventional.description')}</p>
            
            <div className="rates-table">
              {t('rates.conventional.items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="rate-row">
                  <div className="rate-info">
                    <h3>{item.name}</h3>
                    <p className="reimbursement">
                      {t('rates.insurance.title')}: {item.reimbursement}
                    </p>
                  </div>
                  <div className="rate-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rate-item">
            <h2>{t('rates.insurance.title')}</h2>
            <p className="description">{t('rates.insurance.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rates; 