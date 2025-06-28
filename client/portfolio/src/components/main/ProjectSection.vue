<template>
  <div v-if="showProjects" class="min-h-[300px] mb-10 text-center">
    <h2 class="text-3xl my-4 sm:my-8">Projetos</h2>
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
import { useCounterStore } from '@/stores/counter';

defineEmits(['clickProject']);
const counterStore = useCounterStore();

const showProjects = ref(false);
await counterStore.fetchProjects();
showProjects.value = true;
const projects = counterStore.getProjects();
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
