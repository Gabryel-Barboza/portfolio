<template>
  <div class="bg-white text-black p-2 my-2 rounded-md">
    <h3 class="text-xl text-center font-bold">{{ resume.name }}</h3>

    <div class="container bg-gray-800">
      <div class="container-title">
        <span>Informações Pessoais</span>
        <button
          @click="personalInfoClass = changeDisplay(personalInfoClass, $event)"
          class="container-btn"
        >
          >
        </button>
      </div>

      <div :class="personalInfoClass">
        <span>Idade: {{ resume.age }}</span>
        <span v-for="(contact, index) in resume.contacts" :key="index">{{ contact }}</span>
        <span>Bio: {{ resume.bio }}</span>
      </div>
    </div>

    <div class="container bg-gray-800">
      <div class="container-title">
        <span>Hobbies</span>
        <button
          @click="hobbyInfoClass = changeDisplay(hobbyInfoClass, $event)"
          class="container-btn"
        >
          >
        </button>
      </div>

      <div :class="hobbyInfoClass">
        <ul>
          <li v-for="(hobby, index) in resume.hobbies" :key="index">
            {{ hobby.hobby }} : {{ hobby.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container bg-gray-800">
      <div class="container-title">
        <span>Tecnologias</span>
        <button
          @click="stackInfoClass = changeDisplay(stackInfoClass, $event)"
          class="container-btn"
        >
          >
        </button>
      </div>

      <div :class="stackInfoClass">
        <ul>
          <li v-for="(tech, index) in resume.stack" :key="index">
            {{ tech.name }} : {{ tech.description }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container bg-gray-800">
      <div class="container-title">
        <span>Formação Acadêmica</span>
        <button
          @click="educationInfoClass = changeDisplay(educationInfoClass, $event)"
          class="container-btn"
        >
          >
        </button>
      </div>

      <div :class="educationInfoClass">
        <span v-for="(item, index) in resume.education" :key="index">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeObject } from '@/schemas/ResumeSchema';
import { ref } from 'vue';

const props = defineProps(['resume']);
const resume: ResumeObject = props.resume;

const personalInfoClass = ref('container-info hidden flex flex-wrap justify-between');
const hobbyInfoClass = ref('container-info hidden');
const stackInfoClass = ref('container-info hidden');
const educationInfoClass = ref('container-info hidden');

const changeDisplay = (cls: string, $evt: any) => {
  // Alterar classes do botão para ativar animação
  let btn = $evt.target.classList;
  btn.contains('btn-rotate') ? (btn = ['container-btn']) : (btn = ['btn-rotate container-btn']);
  $evt.target.classList = btn;

  //Alterar cor de fundo do container pai
  let btnParent = $evt.target.parentElement.classList;
  btnParent.contains('title-animate')
    ? (btnParent = ['container-title bg-gray-800'])
    : (btnParent = ['container-title title-animate']);
  $evt.target.parentElement.classList = btnParent;

  // Adicionar/retirar propriedade para esconder elemento
  return cls.includes('hidden') ? cls.replace('hidden', '') : cls + ' hidden';
};
</script>

<style scoped>
.container {
  overflow-y: scroll;
  max-height: 300px;
  padding: 8px;
  margin: 10px 0;
  color: #fff;
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

.container-btn {
  cursor: pointer;
}

.title-animate {
}

.btn-rotate {
  animation: rotate 0.3s;
  animation-fill-mode: forwards;
}

.container-info span {
  width: 100%;
  background-color: white;
  padding: 2px;
  margin: 5px 0;
  color: black;
}

@keyframes rotate {
  to {
    transform: rotate(90deg);
  }
}
</style>
