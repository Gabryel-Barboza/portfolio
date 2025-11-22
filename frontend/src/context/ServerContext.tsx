import { createContext } from 'react';
import type { ProjectSchema, ResumeSchema, getSortedProjectsConf } from '../schemas/dataSchemas';

interface ServerContextType {
  isLoading: boolean;
  resume?: ResumeSchema;
  projects?: ProjectSchema[];
  getResume: () => void;
  getProjects: () => void;
  getSortedProjects: ({ sortFn, orient }: getSortedProjectsConf) => ProjectSchema[];
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export { ServerContext };
