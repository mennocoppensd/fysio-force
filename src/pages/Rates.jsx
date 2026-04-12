import { useTranslation } from 'react-i18next';

const Rates = () => {
  const { t } = useTranslation();
  const conventionalItems = t('rates.conventional.items', { returnObjects: true });
  const items = Array.isArray(conventionalItems) ? conventionalItems : [];

  return (
    <section id="rates" className="rates">
      <div className="container">
        <h1 className="section-title">{t('rates.title')}</h1>

        <div className="rates-content">
          <div className="rate-item">
            <h2>{t('rates.nonConventionedTitle')}</h2>
            <p className="rates-lead">{t('rates.nonConventionedIntro')}</p>
            <div className="rates-table">
              <div className="rate-row">
                <div className="rate-info">
                  <h3>{t('rates.nonConventionedPerSession')}</h3>
                </div>
                <div className="rate-price">{t('rates.nonConventioned')}</div>
              </div>
            </div>
          </div>

          <div className="rate-item">
            <h2>{t('rates.conventional.title')}</h2>
            <p className="rates-lead">{t('rates.conventional.lead')}</p>
            <p className="description">{t('rates.conventional.description')}</p>

            <div className="rates-table">
              {items.map((item, index) => (
                <div key={index} className="rate-row">
                  <div className="rate-info">
                    <h3>{item.name}</h3>
                    <p className="reimbursement">
                      {t('rates.conventional.reimbursementLabel')}: {item.reimbursement}
                    </p>
                  </div>
                  <div className="rate-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rates;
