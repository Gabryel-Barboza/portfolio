<template>
  <div class="flex flex-col items-center gap-2 p-2 pt-8 w-full min-h-[300px]">
    <img
      class="w-6/10 max-h-[600px] shadow-md shadow-black/40 border-2 border-blue-600 cursor-pointer"
      :src="project.imageUrl"
      @click="$emit('clickProject', project)"
    />
    <div class="w-8/10">
      <div class="title-animate overflow-hidden relative p-[2px] my-2 shadow-md shadow-black/30">
        <h3 class="font-bold text-lg bg-[#a5d8ff]">
          {{ project.name }}
        </h3>
      </div>

      <div v-if="project.tags" class="flex flex-wrap mt-4">
        <span :class="[`tag-${tag}`, 'tag']" v-for="(tag, index) in project.tags" :key="index">{{
          tag
        }}</span>
      </div>

      <div v-if="project.lastUpdate" class="mt-4 text-right">
        <span
          class="inline-block p-1 bg-gray-800 rounded-md text-white text-2xl font-display font-bold"
        >
          {{ project.lastUpdate }}
        </span>
      </div>

      <hr class="text-gray-400 my-4" />

      <p class="text-justify">
        {{ project.description }}
      </p>

      <hr class="text-gray-400 my-2" />

      <p v-if="project.projectUrl" class="text-md">
        O projeto está disponibilizado publicamente
        <a class="text-blue-600 font-bold" :href="project.projectUrl" target="_blank">aqui</a>.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProjectObject } from '@/schemas/ProjectSchema';

defineProps<{ project: ProjectObject }>();
defineEmits(['clickProject']);
</script>
<style scoped>
.title-animate::before {
  content: '';
  width: 102%;
  height: 102%;
  top: -2px;
  left: -3px;
  position: absolute;
  background-image: linear-gradient(#eb8d8d, #155dfc);
  z-index: -1;
  animation: border-movement 5s ease-in-out 3s infinite forwards;
}
</style>
