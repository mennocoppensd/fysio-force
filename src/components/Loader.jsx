import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <svg viewBox="0 0 100 100">
          <rect
            className="morph-shape"
            x="25"
            y="25"
            width="50"
            height="50"
            rx="0"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader; 