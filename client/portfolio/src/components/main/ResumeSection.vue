<template>
  <div
    :class="[
      'w-full max-w-9/10 mx-auto my-10 text-white p-4 bg-gray-800 rounded-md shadow-md shadow-black/30',
      resumeClass,
    ]"
    @click="openResume"
  >
    <h2 class="text-2xl font-bold">Currículo</h2>
    <transition name="open">
      <ResumeCard v-if="showResume" :resume="counterStore.resume" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import ResumeCard from '@/components/main/ResumeCard.vue';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';

const counterStore = useCounterStore();

const showResume = ref(false);
const resumeClass = ref('pulse cursor-pointer');

const openResume = () => {
  resumeClass.value = '';
  showResume.value = true;
};
</script>
<style scoped>
.pulse {
  animation: heartbeat 2s ease-in-out infinite alternate;
}

.open-enter-active,
.open-leave-active {
  transition: all 1s ease;
}

.open-enter-from,
.open-leave-to {
  opacity: 0;
}

@keyframes heartbeat {
  50% {
    transform: scale(1.04);
  }
}
</style>
