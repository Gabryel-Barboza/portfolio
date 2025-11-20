import type { SectionTitleSchema } from '../../schemas/layoutSchemas';
import styles from './AboutMe.module.css';
import useHovering from '../../hooks/useHovering';

interface Props extends SectionTitleSchema {
  sectionText: string;
}

const AboutMe = ({ pageStyles, titleIcon: TitleIcon, titleText, sectionText }: Props) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHovering();

  const titleClass = pageStyles
    ? isHovering
      ? pageStyles.titleMouseEnter
      : pageStyles.titleMouseLeave
    : '';

  return (
    <section id="about-me">
      <h2 className={titleClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span>{<TitleIcon />}</span>
        {titleText}
      </h2>
      <div className={styles.aboutMe}>
        <p>{sectionText}</p>
      </div>
    </section>
  );
};

export default AboutMe;
