<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { RouterView } from 'vue-router';
import HeaderSection from '@/components/header/HeaderSection.vue';
import FooterBar from '@/components/footer/FooterBar.vue';
import NavBar from '@/components/header/NavBar.vue';

const counterStore = useCounterStore();
counterStore.fetchProjects().then(() => console.log('Projects loaded'));
counterStore.fetchResume().then(() => console.log('Resume loaded'));
</script>

<template>
  <header class="relative">
    <HeaderSection />
  </header>
  <NavBar />
  <main class="w-full max-w-[800px] min-h-[200px] mx-auto">
    <RouterView />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<style scoped></style>
