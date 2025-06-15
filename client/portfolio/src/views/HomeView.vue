<script setup lang="ts">
import ProjectSection from '@/components/main/ProjectSection.vue';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';

const counterStore = useCounterStore();
const showProjects = ref(false);

const projectInterval = setInterval(() => {
  let i = 0;
  if (counterStore.projects.length) {
    showProjects.value = true;
    clearInterval(projectInterval);
  } else i++;

  if (i == 5) {
    counterStore.fetchProjects();
  }

  if (i > 10) {
    console.log('Não foi possível carregar os projetos');
    clearInterval(projectInterval);
  }
}, 1000);
</script>

<template>
  <ProjectSection v-if="showProjects" />
</template>
