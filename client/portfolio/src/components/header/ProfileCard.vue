<template>
  <div
    class="z-[1] flex flex-wrap justify-around gap-1 w-8/10 max-w-[500px] p-4 bg-gray-800 border-2 border-blue-400 rounded-md shadow-md shadow-black/20"
  >
    <div class="profile-picture relative mb-4 mr-2">
      <img class="w-[120px] rounded-full" :src="profilePicture" alt="Foto de perfil" />
    </div>
    <div class="text-black w-8/10 max-w-[250px] p-4 bg-white rounded-sm shadow-md shadow-black/50">
      <p class="text-center">
        Olá <span class="inline-block an-shake">👋</span>, me chamo
        <span class="name">Gabryel Barboza</span> e sou um
        <span class="inline-block an-rotate">⚙️</span>
        <span class="text-green-400">engenheiro de software</span> e entusiasta de
        <span class="text-blue-600 font-bold">tecnologia</span>.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const profilePicture =
  'https://raw.githubusercontent.com/Gabryel-Barboza/gabryel-barboza/refs/heads/main/projects/Imagem_perfil.jpeg';
</script>
<style scoped>
.name {
  font-family: 'Roboto Condensed';
  font-weight: bold;
}

.an-pulse {
  animation: pulse 2s ease-in-out infinite alternate;
}

.an-shake {
  animation: shake 2s ease-in-out infinite alternate;
}

.an-rotate {
  animation: rotate 2s ease-in-out infinite;
}

.profile-picture::before {
  content: '';
  width: 105%;
  height: 105%;
  border-radius: 50%;
  top: -2px;
  left: -3px;
  position: absolute;
  background-image: linear-gradient(#eb8d8d, #155dfc);
  z-index: -1;
  overflow: hidden;
  animation: border-movement 3s ease-in-out 3s infinite forwards;
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(45deg);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
