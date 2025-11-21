import { createContext } from 'react';
import type { ProjectSchema, ResumeSchema } from '../schemas/dataSchemas';

interface ServerContextType {
  isLoading: boolean;
  resume?: ResumeSchema;
  projects?: ProjectSchema[];
  getResume: () => void;
  getProjects: () => void;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export { ServerContext };
