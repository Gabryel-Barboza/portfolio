import axios from 'axios';

import { useCallback, useState } from 'react';

import type { ProjectSchema, ResumeSchema } from '../schemas/dataSchemas';

const API_URL = 'https://raw.githubusercontent.com/Gabryel-Barboza/gabryel-barboza/refs/heads/main';

const fetchResume = async () => {
  const url = API_URL + '/resume.json';

  const response = await axios.get(url);
  return response.data;
};

const fetchProjects = async () => {
  const url = API_URL + '/projects/projects.json';

  const response = await axios.get(url);
  return response.data;
};

const useApiData = () => {
  const [resume, setResume] = useState<ResumeSchema | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectSchema[] | undefined>(undefined);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  // Recuperar resumo
  const getResume = useCallback(async () => {
    setIsLoadingResume(true);

    try {
      const resume = await fetchResume();
      setResume(resume);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingResume(false);
    }
  }, []);

  // Recuperar projetos
  const getProjects = useCallback(async () => {
    setIsLoadingProjects(true);

    try {
      const projects = await fetchProjects();
      setProjects(projects);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  return {
    resume,
    projects,
    isLoadingResume,
    isLoadingProjects,
    setIsLoadingResume,
    setIsLoadingProjects,
    getResume,
    getProjects,
  };
};

export default useApiData;
