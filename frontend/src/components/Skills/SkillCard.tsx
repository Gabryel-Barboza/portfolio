import { useState } from 'react';
import type { TechSchema } from '../../schemas/dataSchemas';

import styles from './Skills.module.css';

interface Props {
  tech: TechSchema;
}

const SkillCard = ({ tech }: Props) => {
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);

  const toggleDescriptionVisibility = () => setDescriptionVisibility(!descriptionVisibility);

  return (
    <>
      <div className={styles.skillCard} onClick={toggleDescriptionVisibility}>
        <p>{tech.name}</p>
        <span>{tech.level}</span>
      </div>
      {descriptionVisibility && <p className={styles.skillDescription}>{tech.description}</p>}
    </>
  );
};

export default SkillCard;
