import type { IconType } from 'react-icons';

interface SectionSchema {
  id: string;
  text: string;
  icon: IconType;
}

interface SectionTitleSchema {
  id: string;
  pageStyles?: CSSModuleClasses;
  titleIcon: IconType;
  titleText: string;
}

export type { SectionSchema, SectionTitleSchema };
