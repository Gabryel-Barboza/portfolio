import { forwardRef } from 'react';
import { BsGithub, BsArrowUpRight } from 'react-icons/bs';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './Projects.module.css';
import useHovering from '../../hooks/useHovering';

type Props = SectionTitleSchema;

const Projects = forwardRef<HTMLDivElement, Props>(
  ({ pageStyles, titleIcon: TitleIcon, titleText }, ref) => {
    const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();

    const titleClass = pageStyles
      ? isHovering
        ? pageStyles.titleMouseEnter
        : pageStyles.titleMouseLeave
      : '';

    return (
      <section id="projects" className={styles.projects} ref={ref}>
        <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span>{<TitleIcon />}</span> {titleText}
        </h2>
        <div className={styles.projectCard}>
          <h3>Meu projeto</h3>
          <p>
            Descrição para este projeto, escreva algo incrível aqui para chamar a atenção de
            recrutadores, induzindo ao clique.
          </p>
          <div>
            <ul>
              <li>React</li>
              <li>Python</li>
              <li>Docker</li>
              <li>Fullstack</li>
              <li>Web</li>
            </ul>
          </div>
          <div>
            <button type="button">
              Ver projeto <BsArrowUpRight />
            </button>
            <button type="button">
              {' '}
              Repositório
              <BsGithub />
            </button>
          </div>
        </div>
      </section>
    );
  }
);

export default Projects;
