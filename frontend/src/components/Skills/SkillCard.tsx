import type { IconType } from 'react-icons';

import { useState } from 'react';
import {
  TbBrandPython,
  TbBrandTypescript,
  TbBrandMysql,
  TbBrandMongodb,
  TbBrandTailwind,
  TbBrandPhp,
  TbBrandDocker,
  TbBrandUbuntu,
} from 'react-icons/tb';

import type { TechSchema } from '../../schemas/dataSchemas';

import styles from './Skills.module.css';

interface Props {
  tech: TechSchema;
}

const SkillCard = ({ tech }: Props) => {
  const [descriptionVisibility, setDescriptionVisibility] = useState(false);
  const iconMap = new Map<string, IconType>([
    ['python', TbBrandPython],
    ['typescript', TbBrandTypescript],
    ['mysql', TbBrandMysql],
    ['mongodb', TbBrandMongodb],
    ['tailwindcss', TbBrandTailwind],
    ['php', TbBrandPhp],
    ['docker', TbBrandDocker],
    ['linux', TbBrandUbuntu],
    // ['n8n', TbBrandN8N],
  ]);

  const TechIcon = iconMap.get(tech.name.toLowerCase());
  const toggleDescriptionVisibility = () => setDescriptionVisibility(!descriptionVisibility);

  return (
    <>
      <div className={styles.skillCard} onClick={toggleDescriptionVisibility}>
        <p>
          {TechIcon && <TechIcon />} {tech.name}
        </p>
        <span>{tech.level}</span>
      </div>
      {descriptionVisibility && <p className={styles.skillDescription}>{tech.description}</p>}
    </>
  );
};

export default SkillCard;
