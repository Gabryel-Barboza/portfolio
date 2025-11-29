import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import type { ProjectSchema } from '../../schemas/dataSchemas';

import styles from './Projects.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';
import ProjectCard from './ProjectCard';

type Props = SectionTitleSchema;

const Projects = forwardRef<HTMLDivElement, Props>(
  ({ id, pageStyles, titleIcon: TitleIcon, titleText }, ref) => {
    const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
    const { getSortedProjects } = useServerContext();

    const projectsLoadButton = useRef(true);
    const [projectsLimit, setProjectsLimit] = useState(5);
    const [projects, setProjects] = useState<ProjectSchema[] | undefined>(undefined);

    const titleClass = pageStyles
      ? isHovering
        ? pageStyles.titleMouseEnter
        : pageStyles.titleMouseLeave
      : '';

    useEffect(() => {
      setProjects(getSortedProjects({ orient: 'desc' }));
    }, [getSortedProjects]);

    const sortedProjects = useMemo(() => {
      if (projects) {
        if (projectsLimit >= projects.length) projectsLoadButton.current = false;

        return projects.slice(0, projectsLimit);
      }

      return [];
    }, [projects, projectsLimit]);

    const handleProjectSort = (orient?: 'asc' | 'desc') => {
      setProjects(getSortedProjects({ orient: orient }));
    };

    return (
      <section id={id} className={styles.projects} ref={ref}>
        <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div>
            <span>{<TitleIcon />}</span> {titleText}
          </div>
          <div>
            <button
              className={styles.sortBtn}
              type="button"
              onClick={() => handleProjectSort('asc')}
            >
              <BsArrowUp />
              ASC
            </button>
            <button
              className={styles.sortBtn}
              type="button"
              onClick={() => handleProjectSort('desc')}
            >
              <BsArrowDown />
              DESC
            </button>
          </div>
        </h2>
        {sortedProjects ? (
          sortedProjects.map((project, idx) => <ProjectCard project={project} key={idx} />)
        ) : (
          <span>Não foi possível carregar os projetos disponíveis do repositório</span>
        )}
        {projectsLoadButton.current && (
          <button
            className={styles.projectLoadBtn}
            type="button"
            onClick={() => setProjectsLimit((prevLimit) => prevLimit + 5)}
          >
            Ver mais
          </button>
        )}
      </section>
    );
  }
);

export default Projects;
