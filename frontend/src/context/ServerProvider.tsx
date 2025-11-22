import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';

import type { ProjectSchema, getSortedProjectsConf } from '../schemas/dataSchemas';
import useApiData from '../hooks/useApiData';
import { ServerContext } from './ServerContext';
import { sortArrayByDate } from '../utils/arrayUtils';

const ServerProvider = ({ children }: { children: ReactNode }) => {
  const { projects, resume, getResume, getProjects, isLoading, setIsLoading } = useApiData();

  // Inicializar contexto
  useEffect(() => {
    setIsLoading(true);

    try {
      getResume();
      getProjects();
    } catch (err) {
      console.log(err);
    }
  }, [getResume, getProjects, setIsLoading]);

  const getSortedProjects = useCallback(
    ({ sortFn, orient }: getSortedProjectsConf) => {
      if (projects) {
        const sortFunc = sortFn
          ? sortFn
          : (a: ProjectSchema, b: ProjectSchema) =>
              sortArrayByDate(a.lastUpdate, b.lastUpdate, orient);

        const sortedProjects = [...projects].sort(sortFunc);

        return sortedProjects;
      }

      return [];
    },
    [projects]
  );

  const value = { isLoading, resume, getResume, projects, getProjects, getSortedProjects };

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

export default ServerProvider;
