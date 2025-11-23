import { useEffect, useMemo, useState } from 'react';
import type { SectionTitleSchema } from '../../schemas/layoutSchemas';

import styles from './AboutMe.module.css';
import useHovering from '../../hooks/useHovering';
import useServerContext from '../../context/useServerContext';

type Props = SectionTitleSchema;

const AboutMe = ({ id, pageStyles, titleIcon: TitleIcon, titleText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();
  const { resume } = useServerContext();
  const [animatedIndex, setAnimatedIndex] = useState(0);

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  const words = useMemo(() => (resume?.bio ? resume.bio.split(' ') : []), [resume]);
  useEffect(() => {
    if (words) {
      const intervalId = setInterval(() => {
        // Incrementando index até o final, quando no final retorna ao 0;
        setAnimatedIndex((prevIndex) => ++prevIndex % words.length);
      }, 600);

      return () => clearInterval(intervalId);
    }
  }, [words]);

  return (
    <section id={id} className={styles.aboutMe}>
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {resume ? (
          <>
            <span>{<TitleIcon />}</span>
            {titleText}
          </>
        ) : (
          <span>Não foi possível recuperar a biografia do repositório</span>
        )}
      </h2>
      {resume && (
        <div className={styles.aboutMeCard}>
          <p>
            {words.map((word, index) =>
              index === animatedIndex ? (
                <span key={index} className={styles.animatedText}>
                  {word}{' '}
                </span>
              ) : (
                `${word} `
              )
            )}
          </p>
        </div>
      )}
    </section>
  );
};

export default AboutMe;
