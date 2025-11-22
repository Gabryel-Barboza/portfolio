import axios from 'axios';

import { useCallback, useState } from 'react';

import type { ProjectSchema, ResumeSchema } from '../schemas/dataSchemas';

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

const useApiData = () => {
  const [resume, setResume] = useState<ResumeSchema | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectSchema[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Recuperar resumo
  const getResume = useCallback(async () => {
    const resume = await fetchResume();
    setResume(resume);
  }, []);

  // Recuperar projetos
  const getProjects = useCallback(async () => {
    const projects = await fetchProjects();
    setProjects(projects);
  }, []);

  return { resume, projects, isLoading, setIsLoading, getResume, getProjects };
};

export default useApiData;
