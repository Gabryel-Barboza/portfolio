interface ProjectSchema {
  name: string;
  imageUrl: string;
  description: string;
  tags: string[];
  lastUpdate: string;
  projectUrl: string;
}

type ContactType = 'email' | 'phone' | 'linkedin' | 'github';

type ContactsSchema = {
  [contact in ContactType]: string;
};

type HobbySchema = {
  hobby: string;
  description: string;
};

type TechSchema = {
  name: string;
  description: string;
  level: string;
};

type DegreeSchema = {
  college: string;
  course: string;
  date: string;
};

type CourseSchema = {
  name: string;
  date: string;
};

interface EducationSchema {
  degrees: DegreeSchema[];
  courses: CourseSchema[];
}

interface ResumeSchema {
  profilePicture: string;
  name: string;
  age: number;
  contacts: ContactsSchema;
  job: string;
  sex: string;
  bio: string;
  hobbies: HobbySchema[];
  stack: TechSchema[];
  extra: TechSchema[];
  education: EducationSchema;
}

interface getSortedProjectsConf {
  sortFn?: (a: ProjectSchema, b: ProjectSchema) => number;
  orient?: 'asc' | 'desc';
}

export type {
  ContactType,
  ContactsSchema,
  CourseSchema,
  DegreeSchema,
  EducationSchema,
  HobbySchema,
  ProjectSchema,
  ResumeSchema,
  TechSchema,
  getSortedProjectsConf,
};
