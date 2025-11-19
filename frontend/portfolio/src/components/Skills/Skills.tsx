import { TbBrandReact } from 'react-icons/tb';

import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './Skills.module.css';
import useHovering from '../../hooks/useHovering';

type Props = SectionTitleSchema;

const Skills = ({ pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  return (
    <section id="skills">
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span>{<TitleIcon />}</span>
        {titleText}
      </h2>
      <div className={styles.skillCard}>
        <p>
          <TbBrandReact />
          React
        </p>
        <span>Avançado</span>
      </div>
      <div className={styles.skillCard}>
        <p>
          <></>Python
        </p>
        <span>Avançado</span>
      </div>
      <div className={styles.skillCard}>
        <p>TypeScript</p>
        <span>Intermediário</span>
      </div>
    </section>
  );
};

export default Skills;
