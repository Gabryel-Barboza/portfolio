<template>
  <div :class="`relative w-full min-h-[400px] my-20 overflow-hidden ${lowercaseProjectName}`">
    <div class="bg-1"></div>
    <div class="bg-2"></div>

    <div class="flex flex-wrap flex-col w-full h-full">
      <h2 class="mx-auto text-5xl font-display">{{ project.name }}</h2>
      <button
        class="order-[-1] mt-2 ml-[88%] max-w-[80px] px-3 py-2 rounded-full cursor-pointer hover:text-amber-300"
        @click="$emit('closeProject')"
      >
        X
      </button>
      <img
        class="mx-auto my-8 w-7/10 max-w-[300px]"
        :src="project.imageUrl"
        :alt="`Imagem do projeto ${project.name}`"
      />
      <p class="mx-auto max-w-[400px] p-3 my-4 font-bold">{{ project.description }}</p>
      <p class="mx-auto p-3 my-4 font-bold" v-show="project.projectUrl">
        O projeto está disponível
        <a class="underline hover:text-amber-300" :href="project.projectUrl" target="_blank"
          >aqui</a
        >
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProjectObject } from '@/schemas/ProjectSchema';

defineEmits(['closeProject']);
const props = defineProps<{ project: ProjectObject }>();
const lowercaseProjectName = props.project.name.toLowerCase().replace(/ /g, '-');
</script>
<style scoped>
.bg-1,
.bg-2 {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  z-index: -1;
}

.bg-2 {
  height: 200%;
  transform: rotate(45deg);
  left: 40%;
  background: white;
}

.hbo-clone {
  color: white;
}

.hbo-clone .bg-1 {
  background: linear-gradient(#39113c 50%, #1b0f1c 100%);
}
.hbo-clone .bg-2 {
  background: linear-gradient(#1b0f1c 40%, #01011b 100%);
}

.hbo-clone button {
  background: black;
}

.pokedex {
  color: black;
}

.pokedex .bg-1 {
  background: red;
}

.pokedex button {
  background: white;
}

.portfolio-tailwind-css .bg-1 {
  background: #e5e7eb;
  border: 1px solid #c026d3;
}

.portfolio-tailwind-css .bg-2 {
  border: 1px solid #c026d3;
}

.portfolio-javascript {
  color: white;
}

.portfolio-javascript .bg-1 {
  background: linear-gradient(#572968 20%, #1d0937 60%, #000000 100%);
}

.portfolio-javascript .bg-2 {
  background: black;
}
</style>
