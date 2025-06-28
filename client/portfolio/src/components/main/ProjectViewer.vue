<template>
  <div
    :class="`relative w-screen min-h-[400px] my-20 overflow-hidden selection:bg-gray-400 ${lowercaseProjectName}`"
  >
    <div class="bg-1"></div>
    <div class="bg-2"></div>

    <div class="flex flex-wrap flex-col w-full h-full p-4 sm:p-8 sm:flex-row sm:items-start">
      <h2 class="mx-auto w-full text-5xl text-center font-display">{{ project.name }}</h2>
      <button
        class="order-[-1] mt-2 ml-[90%] max-w-[80px] px-3 py-2 rounded-full cursor-pointer hover:text-blue-600 hover:brightness-90 sm:ml-[97%]"
        @click="$emit('closeProject')"
      >
        X
      </button>
      <img
        class="mx-auto my-8 w-7/10 max-w-[300px] shadow-md shadow-black/60 lg:mr-4"
        :src="project.imageUrl"
        :alt="`Imagem do projeto ${project.name}`"
      />
      <div class="mx-auto w-full max-w-[400px] p-3 lg:ml-10">
        <p class="my-4 font-bold sm:text-lg">
          {{ project.description }}
        </p>
        <p class="mx-auto my-4 font-bold sm:text-lg" v-show="project.projectUrl">
          O projeto está disponível
          <a class="underline hover:text-amber-300" :href="project.projectUrl" target="_blank"
            >aqui</a
          >.
        </p>
      </div>
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
  background: #fff;
}

.hbo-clone {
  color: #fff;
}

.hbo-clone .bg-1 {
  background: linear-gradient(#39113c 50%, #1b0f1c 100%);
}
.hbo-clone .bg-2 {
  background: linear-gradient(#1b0f1c 40%, #01011b 100%);
}

.hbo-clone button {
  background: #000;
}

.pokedex {
  color: #000;
}

.pokedex .bg-1 {
  background: #f00;
}

.pokedex button {
  background: #fff;
}

.portfolio-tailwind-css .bg-1 {
  background: #e5e7eb;
  border: 1px solid #c026d3;
}

.portfolio-tailwind-css .bg-2 {
  border: 1px solid #c026d3;
}

.portfolio-tailwind-css button {
  background: #e5e7eb;
}

.portfolio-javascript {
  color: #fff;
}

.portfolio-javascript .bg-1 {
  background: linear-gradient(#572968 20%, #1d0937 60%, #000000 100%);
}

.portfolio-javascript .bg-2 {
  background: #000;
}

.portfolio-javascript button {
  background: #1a0832;
}

.vuejs-todo-list {
  color: #fff;
}

.vuejs-todo-list .bg-1 {
  background: #1e2939;
}

.vuejs-todo-list .bg-2 {
  background: #18212e;
}

.vuejs-todo-list button {
  color: #7af0a7;
  background: #18212e;
}

.python-chatbot .bg-1 {
  background: #007bff;
}

.python-chatbot button {
  background: #fff;
}

.rag-agent-chatbot {
  color: #fff;
}

.rag-agent-chatbot .bg-1 {
  background: #18181a;
}
.rag-agent-chatbot .bg-2 {
  background: #3b82f6;
}
.rag-agent-chatbot button {
  background: #2563eb;
}
</style>
