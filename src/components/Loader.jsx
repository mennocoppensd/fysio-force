import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
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
      </div>
    </div>
  );
};

export default Loader; 