<template>
  <nav class="flex items-center min-h-[100px] p-4 bg-gray-800 z-[-1]">
    <ul class="overflow-hidden flex justify-start items-center gap-6">
      <li>
        <RouterLink
          :class="[{ tab_selected: $route.name === 'home' }, 'routerlink']"
          :to="{ name: 'home' }"
          >Projetos</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[{ tab_selected: $route.name === 'profile' }, 'routerlink']"
          :to="{ name: 'profile' }"
          >Sobre mim</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<style scoped>
li {
  position: relative;
  padding: 8px;
}

li:has(.tab_selected) {
  background-color: white;
  border-radius: 5px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.routerlink {
  font-size: 1.2rem;
  color: gray;
}

.routerlink:hover:not(.tab_selected) {
  color: white;
}

.tab_selected {
  color: #155dfc;
}
</style>
