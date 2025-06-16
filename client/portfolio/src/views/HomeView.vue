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
  <transition name="fade">
    <ProjectSection v-if="showProjects" />
    <div v-else class="w-full text-blue-600 text-center text-xl font-bold">
      Carregado projetos
      <span class="loading"></span><span class="loading"></span><span class="loading"></span>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
