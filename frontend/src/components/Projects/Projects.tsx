import { forwardRef } from 'react';
import { BsGithub, BsArrowUpRight } from 'react-icons/bs';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';

import styles from './Projects.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';

type Props = SectionTitleSchema;

const Projects = forwardRef<HTMLDivElement, Props>(
  ({ id, pageStyles, titleIcon: TitleIcon, titleText }, ref) => {
    const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
    const { projects } = useServerContext();

    const titleClass = pageStyles
      ? isHovering
        ? pageStyles.titleMouseEnter
        : pageStyles.titleMouseLeave
      : '';

    return (
      projects && (
        <section id={id} className={styles.projects} ref={ref}>
          <h2
            className={titleClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>{<TitleIcon />}</span> {titleText}
          </h2>
          {projects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div>
                <ul>
                  {project.tags.map((tag, idx) => (
                    <li key={idx}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button type="button">
                  <a href={project.imageUrl}>
                    Ver Projeto <BsArrowUpRight />
                  </a>
                </button>
                <button type="button">
                  <a href={project.projectUrl} target="_blank" rel="external">
                    Repositório <BsGithub />
                  </a>
                </button>
              </div>
            </div>
          ))}
        </section>
      )
    );
  }
);

export default Projects;
