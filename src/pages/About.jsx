import { useEffect, useRef } from 'react';
import '../styles/About.css';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';

const About = () => {
  const observerRef = useRef(null);
  const { t } = useTranslation();

  const galleryImages = [
    {
      url: "/practice1.jpg",
      alt: "Practice Interior",
      caption: t('about.gallery.practice')
    },
    {
      url: "/practice2.jpg",
      alt: "Exercise Equipment",
      caption: t('about.gallery.equipment')
    },
    {
      url: "/practice3.jpg",
      alt: "Treatment Room",
      caption: t('about.gallery.treatment')
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const values = [
    {
      title: t('values.items.movement.title'),
      description: t('values.items.movement.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4.5 9.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5c0-3.8 4.5-8.5 4.5-8.5s4.5 4.7 4.5 8.5zm-4.5-3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"/>
        </svg>
      )
    },
    {
      title: t('values.items.evidence.title'),
      description: t('values.items.evidence.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V6h10v2z"/>
        </svg>
      )
    },
    {
      title: t('values.items.communication.title'),
      description: t('values.items.communication.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="about">
      <div className="container">
        <h1 className="animate-slide-in">{t('about.mainTitle')}</h1>
        <div className="about-content">
          <div className="about-text fade-in-element">
            {Array.isArray(t('about.description', { returnObjects: true })) ? (
              t('about.description', { returnObjects: true }).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{t('about.description')}</p>
            )}
          </div>
          <div className="about-gallery fade-in-element">
            <ImageCarousel images={galleryImages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 