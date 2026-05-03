import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';

import type { ProjectSchema, getSortedProjectsConf } from '../schemas/dataSchemas';
import useApiData from '../hooks/useApiData';
import { ServerContext } from './ServerContext';
import { sortArrayByDate } from '../utils/arrayUtils';

const ServerProvider = ({ children }: { children: ReactNode }) => {
  const { projects, resume, getResume, getProjects, isLoadingResume, isLoadingProjects } =
    useApiData();
  const isLoading = isLoadingResume || isLoadingProjects;

  // Inicializar contexto
  useEffect(() => {
    if (!resume) getResume();
    if (!projects) getProjects();
  }, [getResume, getProjects, projects, resume]);

  const getSortedProjects = useCallback(
    ({ sortFn, orient, tagFilter }: getSortedProjectsConf) => {
      if (!projects) return [];

      const sortFunc = sortFn
        ? sortFn
        : (a: ProjectSchema, b: ProjectSchema) =>
            sortArrayByDate(a.lastUpdate, b.lastUpdate, orient);

      let sortedProjects = [...projects].sort(sortFunc);

      if (tagFilter && tagFilter.length > 0)
        sortedProjects = sortedProjects.filter((project) =>
          tagFilter.every((tag) => project.tags.includes(tag)),
        );

      return sortedProjects;
    },
    [projects],
  );

  const value = useMemo(
    () => ({ isLoading, resume, getResume, projects, getProjects, getSortedProjects }),
    [isLoading, resume, getResume, projects, getProjects, getSortedProjects],
  );

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

export default ServerProvider;
