import { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import '../styles/Projects.css';
import '../styles/Team.css';
import { useTranslation, Trans } from 'react-i18next';

const memberDisplayTitle = (member, t) => {
  if (member.convention) {
    return `${member.name} – ${t(`team.convention.${member.convention}`)}`;
  }
  return member.name;
};

const Team = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const observerRef = useRef(null);
  const { t, i18n } = useTranslation();

  const members = useMemo(() => {
    const list = t('team.members', { returnObjects: true });
    return Array.isArray(list) ? list : [];
  }, [t, i18n.language]);

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

    const cards = document.querySelectorAll('.team .team-card-wrapper');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [members]);

  const toggleExpanded = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">{t('team.title')}</h2>
        <p className="section-description animate-fade-in delay-200">
          {t('team.subtitle')}
        </p>
        <div className="projects-grid">
          {members.map((member, index) => {
            const details = member.details ?? [];
            const hasDetails = details.length > 0;
            const isOpen = expandedIndex === index;

            return (
              <Fragment key={`${member.name}-${index}`}>
                {member.enerki && !members[index - 1]?.enerki && (
                  <div className="team-subsection-heading">
                    <h3>{t('team.enerkiHeading')}</h3>
                    <p>{t('team.enerkiSub')}</p>
                    <p className="team-enerki-link-wrap">
                      <Trans
                        i18nKey="team.enerkiOsteoLink"
                        components={{
                          enerkiLink: (
                            <a
                              href="https://enerki.be/"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
                <div
                  className="team-card-wrapper project-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="team-card-top">
                    <div className="project-image">
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          ...(member.imageObjectPosition && {
                            objectPosition: member.imageObjectPosition,
                          }),
                          ...(member.imageScale
                            ? {
                                transform: `scale(${member.imageScale})`,
                                transformOrigin: 'center center',
                              }
                            : {}),
                        }}
                      />
                    </div>
                    <div className="project-content">
                      <h3>{memberDisplayTitle(member, t)}</h3>
                      {member.enerki && (
                        <span className="team-badge-enerki">{t('team.enerkiBadge')}</span>
                      )}
                      <p>{member.role}</p>
                      {hasDetails && (
                        <button
                          type="button"
                          className={`team-toggle-btn${isOpen ? ' team-toggle-btn--hide' : ''}`}
                          onClick={() => toggleExpanded(index)}
                          aria-expanded={isOpen}
                        >
                          {isOpen ? (
                            <span className="team-toggle-hide">
                              <svg
                                className="team-toggle-arrow-up"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                              >
                                <path
                                  d="M6 15l6-6 6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {t('team.hideDetails')}
                            </span>
                          ) : (
                            <span>{t('team.viewDetails')}</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {hasDetails && (
                    <div className={`team-expand${isOpen ? ' is-open' : ''}`}>
                      <div className="team-expand-measure">
                        <div className="team-expand-inner">
                          {details.map((item, i) => (
                            <p key={i} className="team-expand-line">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
