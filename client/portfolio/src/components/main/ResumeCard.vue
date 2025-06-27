<template>
  <div class="bg-white text-black p-2 my-2 rounded-md">
    <h3 class="text-xl text-center font-bold">{{ resume.name }}</h3>

    <div class="container bg-gray-800">
      <div
        class="container-title"
        @click="personalInfoClass = changeDisplay(personalInfoClass, $event)"
      >
        <span>Informações Pessoais</span>
        <button class="container-btn">></button>
      </div>

      <div :class="personalInfoClass">
        <div class="w-full">
          <span class="info-key">bio:</span> <span class="info-text">{{ resume.bio }}</span>
          <span class="info-key">idade:</span> <span class="info-text">{{ resume.age }}</span>
          <span class="info-key">email:</span>
          <a class="info-text" :href="'mailto:' + resume.contacts.email">{{
            resume.contacts.email
          }}</a>
          <span class="info-key">telefone:</span>
          <a class="info-text" :href="'tel:' + resume.contacts.phone">{{
            resume.contacts.phone
          }}</a>
        </div>
      </div>
    </div>

    <div class="container bg-gray-800">
      <div class="container-title" @click="hobbyInfoClass = changeDisplay(hobbyInfoClass, $event)">
        <span>Hobbies</span>
        <button class="container-btn">></button>
      </div>

      <div :class="hobbyInfoClass">
        <ul>
          <li class="list-item" v-for="(hobby, index) in resume.hobbies" :key="index">
            <span class="list-item-name">{{ hobby.hobby }}</span>
            <span class="list-item-description">{{ hobby.description }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="container bg-gray-800"
      @click="stackInfoClass = changeDisplay(stackInfoClass, $event)"
    >
      <div class="container-title">
        <span>Tecnologias</span>
        <button class="container-btn">></button>
      </div>

      <div :class="stackInfoClass">
        <ul>
          <li v-for="(tech, index) in resume.stack" :key="index">
            <span :class="`p-1 rounded-sm sm:text-lg tag-${tech.name}`">{{ tech.name }}</span>
            <span class="list-item-description">{{ tech.description }}</span>
          </li>
        </ul>

        <p class="my-2 font-bold">Habilidades Adicionais</p>

        <li v-for="(tech, index) in resume.extra" :key="index">
          <span :class="`p-1 rounded-sm sm:text-lg tag-${tech.name}`">{{ tech.name }}</span>
          <span class="list-item-description">{{ tech.description }}</span>
        </li>
      </div>
    </div>

    <div class="container">
      <div
        class="container-title"
        @click="educationInfoClass = changeDisplay(educationInfoClass, $event)"
      >
        <span>Formação Acadêmica</span>
        <button class="container-btn">></button>
      </div>

      <div :class="educationInfoClass">
        <ul>
          <li class="education-li" v-for="(degree, index) in resume.education.degrees" :key="index">
            <span class="font-bold">{{ degree.college }}</span>
            <span class="block text-blue-600">{{ degree.course }}</span>
            <span class="bg-gray-600">[{{ degree.date }}]</span>
          </li>

          <p class="bg-white text-black my-4 px-2 w-max">Cursos</p>

          <li class="education-li" v-for="(course, index) in resume.education.courses" :key="index">
            <span class="font-bold block">{{ course.name }}</span>
            <span class="bg-gray-600">{{ course.date }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeObject } from '@/schemas/ResumeSchema';
import { ref } from 'vue';

defineProps<{ resume: ResumeObject }>();

const personalInfoClass = ref('container-info hidden flex flex-wrap justify-between');
const hobbyInfoClass = ref('container-info hidden');
const stackInfoClass = ref('container-info hidden');
const educationInfoClass = ref('container-info hidden');

const changeDisplay = (cls: string, $evt: MouseEvent) => {
  // Alterar classes do botão para ativar animação
  if ($evt && $evt.target) {
    const btnDiv = $evt.target as HTMLDivElement;
    const btn = btnDiv.nodeName === 'BUTTON' ? btnDiv : btnDiv.querySelector('button');

    if (btn) {
      btn.classList = btn.classList.contains('btn-rotate')
        ? 'container-btn'
        : 'container-btn btn-rotate';
    }
  }

  // Adicionar/retirar propriedade para esconder elemento
  return cls.includes('hidden') ? cls.replace('hidden', '') : cls + ' hidden';
};
</script>

<style scoped>
.container {
  padding: 8px;
  margin: 10px 0;
  color: #fff;
  background-color: #1e2939;
}

.container-title,
.container-btn {
  cursor: pointer;
}

.container-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4px;
  width: 100%;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-rotate {
  animation: rotate 0.3s;
  animation-fill-mode: forwards;
}

.info-key {
  text-transform: capitalize;
  color: #a5d8ff;
  font-weight: bold;
}

.info-text,
.list-item-description {
  display: block;
  width: 100%;
  padding: 4px 6px;
  margin: 10px 0px 10px -10px;
  background-color: white;
  color: black;
}

.list-item,
.education-li {
  vertical-align: middle;
  list-style-type: disc;
  list-style-position: inside;
  list-style-image: url('/check.png');
}

.list-item-name {
  display: inline-block;
  margin: 6px 0;
  color: #a5d8ff;
  font-weight: bold;
  text-transform: capitalize;
}

.list-item-description {
  padding: 4px 10px;
}

.education-li {
  list-style-type: circle;
  list-style-image: none;
}

@keyframes rotate {
  to {
    transform: rotate(90deg);
  }
}
</style>
