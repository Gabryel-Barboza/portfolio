import type { CSSProperties } from 'react';

import styles from './ProjectTag.module.css';

interface Props {
  text: string;
  clickHandler: (tag: string) => void;
}

const ProjectTag = ({ text, clickHandler }: Props) => {
  const textStripped = text.replaceAll(' ', '-').toLowerCase();

  return (
    <li
      className={styles.tag}
      style={{ '--hover-color': `var(--color-${textStripped})` } as CSSProperties}
      onClick={() => clickHandler(text)}
      title={`Clique para filtrar por ${text.toUpperCase()}`}
    >
      {text}
    </li>
  );
};

export default ProjectTag;
