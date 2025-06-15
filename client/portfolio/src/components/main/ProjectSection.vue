<template>
  <div class="min-h-[300px] text-center">
    <h2 class="text-3xl text-center mt-4">Projetos</h2>
    <ProjectCard
      v-for="(project, index) in projects"
      :key="index"
      :imgUrl="project.imageUrl"
      :projUrl="project.projectUrl"
      :tags="project.tags"
      :lastUpd="project.last_update"
    >
      <template v-slot:title> {{ project.name }} </template>
      <template v-slot:text>
        {{ project.description }}
      </template>
    </ProjectCard>
  </div>
</template>
<script setup lang="ts">
import ProjectCard from '@/components/main/ProjectCard.vue';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
const projects = counterStore.getProjects();
</script>
<style scoped></style>
