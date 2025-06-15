<template>
  <div>{{ resume.name }}</div>
  <div>{{ resume.age }}</div>
  <div>{{ resume.sex }}</div>
  <div>{{ resume.bio }}</div>
  <div>{{ resume.hobbies }}</div>
  <div>{{ resume.stack }}</div>
  <div>{{ resume.education }}</div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const props = defineProps(['resume']);
</script>
<style scoped></style>
