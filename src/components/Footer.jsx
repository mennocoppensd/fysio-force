import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="site-footer-brand">
          <span className="site-footer-brand-fysio">Fysio</span>
          <span className="site-footer-brand-force">Force</span>
        </p>
        <p className="site-footer-rights">{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  );
};

export default Footer;
