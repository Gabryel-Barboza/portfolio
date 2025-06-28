<template>
  <div class="flex flex-wrap justify-around items-center min-h-[200px] text-white bg-gray-800">
    <ContactInformation class="font-bold">
      <template v-slot:contact1>
        <div class="text-black hover:text-white">
          <i class="fa-brands fa-github"></i>
          <a :href="github">GitHub</a>
        </div>
      </template>
      <template v-slot:contact2>
        <div class="text-blue-500 hover:text-white">
          <i class="fa-brands fa-linkedin"></i>
          <a :href="linkedin">LinkedIn</a>
        </div>
      </template>
      <template v-slot:contact3>
        <div class="text-red-400 hover:text-white">
          <i class="fa-solid fa-envelope"></i>
          <a :href="email">Email</a>
        </div>
      </template>
      <template v-slot:contact4>
        <div class="text-green-500 hover:text-white">
          <i class="fa-brands fa-whatsapp"></i>
          <a :href="whatsapp">WhatsApp</a>
        </div>
      </template>
    </ContactInformation>
    <SignatureBar />
    <p class="block w-full text-center">
      <img class="inline-block" width="20px" src="/src/assets/contacts.png" /> Favicon por
      <a class="text-blue-600 hover:underline" href="https://www.flaticon.com/free-icons/contacts"
        >Flaticon</a
      >
    </p>
  </div>
</template>
<script setup lang="ts">
import ContactInformation from '@/components/footer/ContactInformation.vue';
import SignatureBar from '@/components/footer/SignatureBar.vue';

const github = 'https://github.com/Gabryel-Barboza';
const linkedin = 'https://www.linkedin.com/in/gabryel-barboza-nunes-35a9a6311/';
const email = 'mailto:gabryelbuildbarboza@gmail.com';
const whatsapp = '#';
</script>
<style></style>
