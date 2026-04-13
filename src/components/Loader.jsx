import { useTranslation } from 'react-i18next';
import '../styles/Loader.css';

const Loader = ({ progress = 0, exiting = false }) => {
  const { t } = useTranslation();
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      className={`loader-container${exiting ? ' loader-container--exiting' : ''}`}
    >
      <div className="loader">
        <img 
          src="/Logo.svg" 
          alt="FysioForce Logo" 
          className="loader-logo"
        />
        <div className="loader-text">
          <span className="logo-fysio">Fysio</span>
          <span className="logo-force">Force</span>
        </div>
        <div
          className="loader-progress"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('loader.ariaProgress')}
        >
          <div
            className="loader-progress-bar"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader; 