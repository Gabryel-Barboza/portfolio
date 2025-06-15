<template>
  <ResumeCard v-if="showResume" :resume="counterStore.resume" />
</template>
<script setup lang="ts">
import ResumeCard from '@/components/main/ResumeCard.vue';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';

const showResume = ref(false);
const counterStore = useCounterStore();
const resumeInterval = setInterval(() => {
  let i = 0;
  if (counterStore.resume) {
    showResume.value = true;
    clearInterval(resumeInterval);
  } else i++;

  if (i == 5) {
    counterStore.fetchResume();
  }

  if (i > 10) {
    console.log('Não foi possível carregar o currículo!');
    clearInterval(resumeInterval);
  }
}, 1000);
</script>
<style scoped></style>
