<template>
  <section
    class="bg-gradient flex justify-center items-center w-full min-h-[400px] p-4 py-10 lg:py-20"
  >
    <ProfileCard />
  </section>
</template>
<script setup lang="ts">
import ProfileCard from '@/components/header/ProfileCard.vue';
</script>
<style scoped>
.bg-gradient {
  background: #a5d8ff radial-gradient(#155dfc 0%, #a5d8ff 100%) center/500%;
  z-index: -5;
  animation: gradient-move 5s ease-in-out infinite alternate;
}

@keyframes gradient-move {
  0% {
    background-position: left top;
  }
  50% {
    background-position: center;
  }
  100% {
    background-position: right bottom;
  }
}
</style>
