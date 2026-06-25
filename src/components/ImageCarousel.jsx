import { useState, useEffect, useMemo } from 'react';
import '../styles/ImageCarousel.css';

const TRANSITION_MS = 500;

const buildSlides = (images) => {
  if (!images?.length) return [];
  if (images.length === 1) return images.map((img, i) => ({ ...img, _key: `only-${i}` }));
  const n = images.length;
  return [
    { ...images[n - 1], _key: 'clone-prev' },
    ...images.map((img, i) => ({ ...img, _key: `slide-${i}` })),
    { ...images[0], _key: 'clone-next' },
  ];
};

const ImageCarousel = ({ images }) => {
  const slides = useMemo(() => buildSlides(images), [images]);
  const n = images?.length ?? 0;
  const hasLoop = n > 1;

  const [currentIndex, setCurrentIndex] = useState(() =>
    (images?.length ?? 0) > 1 ? 1 : 0
  );
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    if (!hasLoop) return undefined;
    if (currentIndex !== n + 1 && currentIndex !== 0) return undefined;

    const target = currentIndex === n + 1 ? 1 : n;
    const id = window.setTimeout(() => {
      setDisableTransition(true);
      setCurrentIndex(target);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      });
    }, TRANSITION_MS);

    return () => window.clearTimeout(id);
  }, [currentIndex, hasLoop, n]);

  const nextSlide = () => {
    if (!hasLoop) return;
    setCurrentIndex((prev) => Math.min(prev + 1, n + 1));
  };

  const prevSlide = () => {
    if (!hasLoop) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const realDotIndex =
    !hasLoop || n === 0
      ? 0
      : currentIndex === 0
        ? n - 1
        : currentIndex === n + 1
          ? 0
          : currentIndex - 1;

  if (!slides.length) return null;

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button type="button" className="carousel-button prev" onClick={prevSlide} aria-label="Vorige foto">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="carousel-content">
          {slides.map((image, index) => (
            <div
              key={image._key ?? index}
              className={`carousel-slide${disableTransition ? ' carousel-slide--no-transition' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            >
              <img
                src={image.url}
                alt={image.alt ?? ''}
                className="carousel-image"
                style={{
                  ...(image.imageObjectFit && { objectFit: image.imageObjectFit }),
                  ...(image.imageObjectPosition && {
                    objectPosition: image.imageObjectPosition,
                  }),
                }}
              />
            </div>
          ))}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === realDotIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <button type="button" className="carousel-button next" onClick={nextSlide} aria-label="Volgende foto">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
