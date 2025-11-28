import { useMemo } from 'react';

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

  const levelTexts = new Map<string, string>([
    ['Básico', 'Sou Iniciante com Estas Tecnologias'],
    ['Intermediário', 'Estou Caminhando para Dominar Estas Tecnologias'],
    ['Avançado', 'Domino Estas Tecnologias'],
  ]);

  const { firstStack, secondStack, lastStack } = useMemo(() => {
    if (!resume) return { firstStack: [], secondStack: [], lastStack: [] };

    const begTechs = resume.stack.filter((tech) => tech.level === 'Básico');
    const intTechs = resume.stack.filter((tech) => tech.level === 'Intermediário');
    const advTechs = resume.stack.filter((tech) => tech.level === 'Avançado');

    const [firstStack, secondStack, lastStack] = [begTechs, intTechs, advTechs].sort(
      (stackA, stackB) => stackB.length - stackA.length
    );
    console.log(lastStack);

    return { firstStack, secondStack, lastStack };
  }, [resume]);

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
      {resume && (
        <>
          {firstStack.length > 0 && (
            <div className={styles.levelDiv}>
              <h3>{levelTexts.get(firstStack[0].level)}</h3>
              {firstStack.map((tech, idx) => (
                <SkillCard key={idx} tech={tech} />
              ))}
            </div>
          )}
          {secondStack.length > 0 && (
            <div className={styles.levelDiv}>
              <h3>{levelTexts.get(secondStack[0].level)}</h3>
              {secondStack.map((tech, idx) => (
                <SkillCard key={idx} tech={tech} />
              ))}
            </div>
          )}
          {lastStack.length > 0 && (
            <div className={styles.levelDiv}>
              <h3>{levelTexts.get(lastStack[0].level)}</h3>
              {lastStack.map((tech, idx) => (
                <SkillCard key={idx} tech={tech} />
              ))}
            </div>
          )}
          {resume.extra && (
            <div className={`${styles.levelDiv} ${styles.extraTechDiv}`}>
              <h3>Utilizo Estas Tecnologias Fora da Programação</h3>
              {resume.extra.map((tech, idx) => (
                <SkillCard key={idx} tech={tech} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Skills;
