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
    <section id={id} className={styles.skills}>
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {resume ? (
          <>
            <span>{<TitleIcon />}</span>
            {titleText}
          </>
        ) : (
          <span>Não foi possível recuperar as habilidades do repositório</span>
        )}
      </h2>
      {resume && resume.stack.map((tech, idx) => <SkillCard key={idx} tech={tech} />)}
    </section>
  );
};

export default Skills;
