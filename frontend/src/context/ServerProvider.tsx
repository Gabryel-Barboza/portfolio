import axios from 'axios';

import type { ReactNode } from 'react';
import { useCallback, useState, useEffect } from 'react';

import type { ResumeSchema, ProjectSchema } from '../schemas/dataSchemas';
import { ServerContext } from './ServerContext';

const API_URL = 'https://raw.githubusercontent.com/Gabryel-Barboza/gabryel-barboza/refs/heads/main';

const fetchResume = async () => {
  const url = API_URL + '/resume.json';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchProjects = async () => {
  const url = API_URL + '/projects/projects.json';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState<ResumeSchema | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectSchema[] | undefined>(undefined);

  // Recuperar resumo
  const getResume = useCallback(async () => {
    if (!isLoading) setIsLoading(true);

    const resume = await fetchResume();
    setResume(resume);

    if (isLoading) setIsLoading(false);
  }, [isLoading]);

  // Recuperar projetos
  const getProjects = useCallback(async () => {
    if (!isLoading) setIsLoading(true);

    const projects = await fetchProjects();
    setProjects(projects);

    if (isLoading) setIsLoading(false);
  }, [isLoading]);

  // Inicializar contexto
  useEffect(() => {
    try {
      getResume();
      getProjects();
    } catch (err) {
      console.log(err);
    }
  }, [getResume, getProjects]);

  const sortProjects = useCallback(
    (sortFn?: (a: ProjectSchema, b: ProjectSchema) => number) => {
      const sortFunc = sortFn ? sortFn : () => 10;
    },
    [projects]
  );

  const value = { isLoading, resume, getResume, projects, getProjects, sortProjects };

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

export default ServerProvider;
