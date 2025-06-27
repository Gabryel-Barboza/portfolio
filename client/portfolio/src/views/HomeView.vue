<template>
  <header class="relative">
    <HeaderSection />
  </header>
  <NavBar />
  <main class="flex flex-col items-center w-full max-w-[800px] min-h-[200px] mx-auto">
    <ProjectViewer
      v-if="projectOpen"
      :project="project"
      @close-project="closeProject"
      :key="project.name"
    />
    <transition name="fade">
      <Suspense>
        <ProjectSection @click-project="openProject" />
      </Suspense>
    </transition>
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderSection from '@/components/header/HeaderSection.vue';
import FooterBar from '@/components/footer/FooterBar.vue';
import NavBar from '@/components/header/NavBar.vue';
import ProjectSection from '@/components/main/ProjectSection.vue';
import ProjectViewer from '@/components/main/ProjectViewer.vue';
import type { ProjectObject } from '@/schemas/ProjectSchema';

const projectOpen = ref(false);

// Com a propriedade name, a instancia do componente é recarregada toda vez que o atributo key é alterado
const project = ref({
  name: 'undefined',
} as ProjectObject);

const openProject = (obj: ProjectObject) => {
  project.value = obj;
  projectOpen.value = true;
  window.scrollTo(0, 420);
  // Para aplicar um smooth scroll, é adicionada a propriedade scroll-behavior no base.css
};

const closeProject = () => (projectOpen.value = false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
