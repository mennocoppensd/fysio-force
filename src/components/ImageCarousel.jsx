import { useState } from 'react';
import '../styles/ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="carousel-button prev" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="carousel-content">
          {images.map((image, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="carousel-image"
              />
            </div>
          ))}
          <div className="image-caption">
            {images[currentIndex].caption}
          </div>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <button className="carousel-button next" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel; 