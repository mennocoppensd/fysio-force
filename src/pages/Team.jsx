import { useState, useEffect, useRef } from 'react';
import ProjectModal from '../components/ProjectModal';
import '../styles/Projects.css';
import '../styles/Team.css';
import { getScrollbarWidth } from '../utils/scrollbarWidth';
import { useTranslation } from 'react-i18next';

const Team = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const observerRef = useRef(null);
  const { t } = useTranslation();

  const projects = [
    {
      title: "Mathieu Vanderroost",
      description: "Founder PhysioForce",
      image: "/mathieu.png",
      content: [
        "Master in rehabilitation sciences (2018, VUB)",
        "Master in sports physiotherapy (2018, VUB)",
        "Postgraduate degree in manual therapy (2021, UGent)",
        "Dry needling (2023, The Hive)",
        "Physical coach football (2021, Voetbal Vlaanderen)",
        "Velocity-based training (2023, Smart Education)",
        "Medical staff BOKA United (2017 - 2023) and K Diegem Sport (2023 - present)"
      ],
    },
    {
      title: "Bruno Janssens",
      description: "E-commerce platform development",
      image: "/src/assets/bruno.png",
      tags: ["E-commerce", "Full Stack", "UI/UX"],
      client: "Online Retailer",
      duration: "6 months",
      technologies: "Next.js, Stripe, PostgreSQL",
      challenges: "Implementing a secure payment system and optimizing the checkout process for maximum conversion.",
      results: "Successfully launched with 100+ products and achieved 95% customer satisfaction rate.",
      link: "https://project2.com"
    },
    // Add more projects...
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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.documentElement.style.removeProperty('--scrollbar-width');
  };

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">{t('team.title')}</h2>
        <p className="section-description animate-fade-in delay-200">
          {t('team.subtitle')}
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button 
                    className="view-project"
                    onClick={() => handleProjectClick(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags?.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Team; 