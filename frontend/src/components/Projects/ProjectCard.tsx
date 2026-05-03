import { useState } from 'react';
import type { ReactNode } from 'react';

import { BsGithub, BsArrowUp } from 'react-icons/bs';

import type { ProjectSchema } from '../../schemas/dataSchemas';

import styles from './ProjectCard.module.css';

interface Props {
  project: ProjectSchema;
  tags: ReactNode[];
}

const ProjectCard = ({ project, tags }: Props) => {
  const [showProjectImage, setShowProjectImage] = useState(false);
  const projectImageClass = `${styles.projectImg} ${showProjectImage ? styles.toggled : ''}`;
  const viewProjectBtnClass = showProjectImage ? styles.viewProjectBtn : '';

  const toggleProjectImage = () => setShowProjectImage(!showProjectImage);

  return (
    <>
      <div className={styles.projectCard}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div>
          <ul>{tags}</ul>
        </div>
        <div>
          {project.imageUrl && (
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
        {project.imageUrl && (
          <div className={projectImageClass}>
            <img src={project.imageUrl} alt={`Imagem de ${project.name}`}></img>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectCard;
