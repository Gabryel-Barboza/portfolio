import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { ProjectObject as ProjectSchema } from '@/schemas/ProjectSchema';
import type { ResumeObject as ResumeSchema } from '@/schemas/ResumeSchema';

const PROJECTS_URL = import.meta.env.VITE_REPOSITORY_URL;
const RESUME_URL = import.meta.env.VITE_RESUME_URL;

if (!PROJECTS_URL || !RESUME_URL) {
  console.warn('Variáveis ambiente de repositório não configuradas!');
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    projects: reactive([]),
    resume: reactive({}),
  }),
  actions: {
    async fetchProjects() {
      const response = await fetch(PROJECTS_URL);
      const projs = await response.json();

      this.projects = reactive(projs);
    },
    getProjects(offset: number = 0): ProjectSchema[] {
      return this.projects.slice(offset, offset + 10);
    },
    async fetchResume() {
      const response = await fetch(RESUME_URL);
      const resume = await response.json();

      this.resume = reactive(resume);
    },
    getResume(): ResumeSchema {
      const resume = this.resume as ResumeSchema;
      return resume;
    },
  },
});
