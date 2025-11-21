import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './Skills.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';
import SkillCard from './SkillCard';

type Props = SectionTitleSchema;

const Skills = ({ id, pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
  const { resume } = useServerContext();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  return (
    resume && (
      <section id={id} className={styles.skills}>
        <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span>{<TitleIcon />}</span>
          {titleText}
        </h2>
        {resume.stack.map((tech, idx) => (
          <SkillCard key={idx} tech={tech} />
        ))}
      </section>
    )
  );
};

export default Skills;
