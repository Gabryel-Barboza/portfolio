<template>
  <section class="bg-gradient flex justify-center items-center w-full min-h-[400px] p-4">
    <ProfileCard />
  </section>
</template>
<script setup lang="ts">
import ProfileCard from '@/components/header/ProfileCard.vue';
</script>
<style scoped>
.bg-gradient {
  background-color: #a5d8ff;
  background-image: radial-gradient(#155dfc 0%, #a5d8ff 100%);
  transition: background 0.5s;
  z-index: -5;
}
</style>
