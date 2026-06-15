import { forwardRef, useEffect, useMemo, useState } from 'react';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import type { ProjectSchema } from '../../schemas/dataSchemas';

import styles from './Projects.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';

type Props = SectionTitleSchema;

const Projects = forwardRef<HTMLDivElement, Props>(
  ({ id, pageStyles, titleIcon: TitleIcon, titleText }, ref) => {
    const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
    const { getSortedProjects } = useServerContext();

    const [projectsLimit, setProjectsLimit] = useState(5);
    const [selectedTags, setSelectedTags] = useState<string[] | undefined>([]);
    const [projects, setProjects] = useState<ProjectSchema[] | undefined>(undefined);

    const titleClass = pageStyles
      ? isHovering
        ? pageStyles.titleMouseEnter
        : pageStyles.titleMouseLeave
      : '';
    const showTagFilter = selectedTags?.length ? selectedTags.length > 0 : false;
    const hasMoreProjects = projects ? projectsLimit <= projects.length : false;

    const sortedProjects = useMemo(() => {
      if (!projects) return [];
      return projects.slice(0, projectsLimit);
    }, [projects, projectsLimit]);

    const handleProjectSort = (orient?: 'asc' | 'desc') => {
      setProjects(getSortedProjects({ orient: orient, tagFilter: selectedTags }));
    };

    const updateTagsHandler = (tag: string) => {
      setSelectedTags((prev) => {
        const tagSet = new Set(prev);

        if (tagSet.has(tag)) tagSet.delete(tag);
        else tagSet.add(tag);

        return Array.from(tagSet);
      });
    };

    useEffect(() => {
      setProjects(getSortedProjects({ orient: 'desc', tagFilter: selectedTags }));
    }, [getSortedProjects, selectedTags]);

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
              title="Ordenar por primeiros projetos"
            >
              <BsArrowUp />
              ASC
            </button>
            <button
              className={styles.sortBtn}
              type="button"
              onClick={() => handleProjectSort('desc')}
              title="Ordenar por últimos projetos"
            >
              <BsArrowDown />
              DESC
            </button>
          </div>
        </h2>
        {showTagFilter && (
          <div className={styles.tagFilter}>
            <ul>
              <span>Filtrando Projetos por:</span>
              {selectedTags?.map((tag, idx) => (
                <ProjectTag key={idx} text={tag} clickHandler={updateTagsHandler} />
              ))}
            </ul>
          </div>
        )}
        {sortedProjects ? (
          sortedProjects.map((project, idx) => (
            <ProjectCard
              project={project}
              tags={project.tags.map((tag, idx) => (
                <ProjectTag key={idx} text={tag} clickHandler={updateTagsHandler} />
              ))}
              key={idx}
            />
          ))
        ) : (
          <span>Não foi possível carregar os projetos disponíveis do repositório</span>
        )}
        {hasMoreProjects && (
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
  },
);

export default Projects;
