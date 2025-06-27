<template>
  <header class="relative">
    <HeaderSection />
  </header>
  <NavBar />
  <main class="flex items-center w-full max-w-[800px] min-h-[200px] mx-auto">
    <ResumeSection />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>
<script setup lang="ts">
import HeaderSection from '@/components/header/HeaderSection.vue';
import FooterBar from '@/components/footer/FooterBar.vue';
import NavBar from '@/components/header/NavBar.vue';
import ResumeSection from '@/components/main/ResumeSection.vue';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

counterStore.fetchResume();
</script>
<style scoped></style>
