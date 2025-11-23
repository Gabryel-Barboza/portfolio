import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { ProjectSchema, getSortedProjectsConf } from '../schemas/dataSchemas';
import useApiData from '../hooks/useApiData';
import { ServerContext } from './ServerContext';
import { sortArrayByDate } from '../utils/arrayUtils';

const ServerProvider = ({ children }: { children: ReactNode }) => {
  const { projects, resume, getResume, getProjects, isLoadingResume, isLoadingProjects } =
    useApiData();
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar contexto
  useEffect(() => {
    if (!resume) getResume();
    if (!projects) getProjects();
  }, [getResume, getProjects, projects, resume]);

  useEffect(() => {
    if (isLoadingResume || isLoadingProjects) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoadingProjects, isLoadingResume]);

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
