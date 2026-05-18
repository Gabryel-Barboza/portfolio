import { useState } from 'react';
import type { ReactNode } from 'react';

import { BsGithub, BsArrowUp } from 'react-icons/bs';

import type { ProjectSchema } from '../../schemas/dataSchemas';

import styles from './ProjectCard.module.css';
import ProjectCarrousel from './ProjectCarrousel';

interface Props {
  project: ProjectSchema;
  tags: ReactNode[];
}

const ProjectCard = ({ project, tags }: Props) => {
  const [showProjectCarrousel, setShowProjectCarrousel] = useState(false);
  const viewProjectBtnClass = showProjectCarrousel ? styles.viewProjectBtn : '';

  const toggleProjectImage = () => setShowProjectCarrousel(!showProjectCarrousel);

  return (
    <>
      <div className={styles.projectCard}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div>
          <ul>{tags}</ul>
        </div>
        <div>
          {project.projectMedia[0] && (
            <button className={viewProjectBtnClass} type="button" onClick={toggleProjectImage}>
              Ver Projeto{' '}
              <span className={styles.viewProjectIcon}>
                <BsArrowUp />
              </span>
            </button>
          )}
          {project.projectUrl && (
            <button type="button">
              <a href={project.projectUrl} target="_blank" rel="external">
                Repositório <BsGithub />
              </a>
            </button>
          )}
        </div>
        {showProjectCarrousel && <ProjectCarrousel mediaList={project.projectMedia} />}
      </div>
    </>
  );
};

export default ProjectCard;
