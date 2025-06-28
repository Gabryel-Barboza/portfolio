<template>
  <div class="absolute top-20 flex justify-start gap-3 p-2 bg-gray-800 rounded-md">
    <button
      @click="tagFilterProjects"
      class="filter-btn selected"
      title="Remover filtro de projetos"
    >
      all
    </button>
    <button
      v-for="(filter, index) in filters"
      class="filter-btn"
      :key="index"
      @click="tagFilterProjects"
      :title="`Filtrar pela tag ${filter}`"
    >
      {{ filter }}
    </button>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['filterProjects']);
const filters = ['frontend', 'backend', 'fullstack'];

const tagFilterProjects = (e: MouseEvent) => {
  const btn = e.target as HTMLButtonElement;

  // Verificando se o elemento já está selecionado
  const cls = btn.classList.contains('selected') ? '' : 'selected';

  // Impedindo que reexecute a filtragem para a mesma tag caso elemento já está selecionado
  if (cls) {
    const div = btn.parentElement;
    div?.querySelector('.selected')?.classList.remove('selected');

    btn.classList.add(cls);
    const filterTag = btn.innerText;

    emit('filterProjects', filterTag);
  } else return;
};
</script>
<style scoped>
.filter-btn {
  cursor: pointer;
  width: fit-content;
  padding: 5px;
  color: #fff;
  transition: all 0.2s;
}

.filter-btn:hover {
  color: #2165fc;
}

.selected {
  border-radius: 5px;
  background: gray;
}
</style>
