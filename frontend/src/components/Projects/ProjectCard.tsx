import { useState } from 'react';
import type { ReactNode } from 'react';

import { BsGithub } from 'react-icons/bs';

import type { ProjectSchema } from '../../schemas/dataSchemas';

import styles from './ProjectCard.module.css';
import ProjectCarrousel from './ProjectCarrousel';
import Modal from '../layout/Modal/Modal';

interface Props {
  project: ProjectSchema;
  tags: ReactNode[];
}

const ProjectCard = ({ project, tags }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const images = project.projectMedia.filter((m) => m.type === 'picture');
  const mediaCount = project.projectMedia.length;
  const imageCount = images.length;
  const galleryImages = images.slice(0, 3);
  const remaining = mediaCount - 3;

  return (
    <>
      <div className={`${styles.projectCard} projectCard`}>
        <h3>{project.name}</h3>
        <div className={styles.projectBody}>
          {imageCount >= 2 && (
            <div
              className={styles.previewGallery}
              onClick={openModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openModal();
              }}
            >
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`${styles.galleryCell} ${idx === 2 ? styles.galleryFull : ''}`}
                >
                  <img
                    className={styles.galleryThumb}
                    src={img.url}
                    alt={img.altText}
                    loading="lazy"
                  />
                  {idx === 2 && remaining > 0 && (
                    <div className={styles.galleryOverlay}>+{remaining}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          {imageCount === 1 && (
            <div
              className={styles.previewSingle}
              onClick={openModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openModal();
              }}
            >
              <img
                className={styles.singleThumb}
                src={images[0].url}
                alt={images[0].altText}
                loading="lazy"
              />
            </div>
          )}
          <p>{project.description}</p>
          <div className={styles.projectTags}>
            <ul>{tags}</ul>
          </div>
          {project.projectUrl && (
            <button className={styles.projectRepo} type="button">
              <a href={project.projectUrl} target="_blank" rel="external">
                Repositório <BsGithub />
              </a>
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProjectCarrousel mediaList={project.projectMedia} />
      </Modal>
    </>
  );
};

export default ProjectCard;
