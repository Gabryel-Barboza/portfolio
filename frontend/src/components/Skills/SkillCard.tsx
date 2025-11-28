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
  TbBrandReact,
  TbBrandDjango,
  TbBrandVue,
  TbApi,
  TbLink,
  TbCircuitChangeover,
} from 'react-icons/tb';
import { FaUbuntu } from 'react-icons/fa6';

import type { TechSchema } from '../../schemas/dataSchemas';

import styles from './Skills.module.css';
import clsx from 'clsx';

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
    ['fastapi', TbApi],
    ['langchain', TbLink],
    ['react', TbBrandReact],
    ['vue.js', TbBrandVue],
    ['django', TbBrandDjango],
    ['php', TbBrandPhp],
    ['docker', TbBrandDocker],
    ['linux', FaUbuntu],
    ['n8n', TbCircuitChangeover],
  ]);

  const TechIcon = iconMap.get(tech.name.toLowerCase());
  const skillDescriptionClass = clsx(styles.skillDescription, {
    [styles.descriptionToggled]: descriptionVisibility,
  });

  const toggleDescriptionVisibility = () => setDescriptionVisibility(!descriptionVisibility);

  return (
    <>
      <div className={styles.skillCard} onClick={toggleDescriptionVisibility}>
        <p>
          {TechIcon && <TechIcon />} {tech.name}
        </p>
        <span>{tech.level}</span>
      </div>
      <p className={skillDescriptionClass}>{tech.description}</p>
    </>
  );
};

export default SkillCard;
