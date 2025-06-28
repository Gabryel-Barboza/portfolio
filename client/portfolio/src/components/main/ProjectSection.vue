<template>
  <div v-if="showProjects" class="relative min-h-[300px] mb-10 text-center">
    <div class="flex justify-center items-center lg:justify-end">
      <ProjectSelector @filter-projects="filterProjects" />
    </div>

    <h2 class="text-3xl mt-4 mb-15 sm:mb-20 lg:text-4xl">Projetos</h2>
    <ProjectCard
      @click-project="(proj) => $emit('clickProject', proj)"
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
    />
  </div>

  <div v-else class="w-full text-blue-600 text-center text-xl font-bold">
    Carregado projetos
    <span class="loading"></span><span class="loading"></span><span class="loading"></span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '@/components/main/ProjectCard.vue';
import ProjectSelector from '@/components/main/ProjectSelector.vue';
import { useCounterStore } from '@/stores/counter';

defineEmits(['clickProject']);
const counterStore = useCounterStore();

const showProjects = ref(false);
await counterStore.fetchProjects();

const projects = ref(counterStore.getProjects());
showProjects.value = true;

const filterProjects = (tag: string) => {
  if (tag === 'all') projects.value = counterStore.getProjects();
  else {
    const projectList = counterStore.getProjects();
    const filteredProjects = projectList.filter((project) => project.tags.includes(tag));
    projects.value = filteredProjects;
  }
};
</script>
<style scoped>
.loading {
  display: inline-block;
  border: 2px solid;
  border-radius: 50%;
  margin: 0px 2px;
}

.loading:nth-child(1) {
  animation: loading 1s ease infinite alternate;
}
.loading:nth-child(2) {
  animation: loading 1s ease 0.3s infinite alternate;
}
.loading:nth-child(3) {
  animation: loading 1s ease 0.6s infinite alternate;
}

@keyframes loading {
  to {
    transform: scale(1.7);
  }
}
</style>
