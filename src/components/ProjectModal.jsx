import '../styles/ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
        {project.content && (
          <div className="project-details">
            {project.content.map((item, index) => (
              <p key={index} className="detail-item">{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal; 