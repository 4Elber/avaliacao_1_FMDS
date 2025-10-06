<template>
  <div>
    <h2>Bem-vindo ao Catálogo</h2>
    <p>Confira algumas receitas recentes:</p>

    <v-row>
      <RecipeCard
        v-for="r in recent"
        :key="r.id"
        :recipe="r"
        @view="openView"
        @edit="startEdit"
        @delete="startDelete"
      />
      <v-col v-if="recent.length === 0">Nenhuma receita ainda. Vá para Receitas e crie a primeira.</v-col>
    </v-row>

    <v-divider class="my-4" />

    <h3>Contagem de tags</h3>
    <div v-if="Object.keys(counts).length">
      <v-chip v-for="(n, tag) in counts" :key="tag" class="ma-1">{{ tag }} ({{ n }})</v-chip>
    </div>
    <div v-else><em>Nenhuma tag ainda.</em></div>
  </div>
</template>

<script setup>
import useRecipes from '../composables/useRecipes'
import RecipeCard from '../components/RecipeCard.vue'
import { computed } from 'vue'

const { recipes, countByTag, remove } = useRecipes()
const counts = computed(() => countByTag.value)
const recent = computed(() => recipes.value.slice(0, 6))

const startEdit = (r) => { window.location.href = '/receitas#edit-' + r.id }
const startDelete = (r) => {
  if (confirm(`Excluir "${r.title}"?`)) {
    remove(r.id)
    alert('Receita excluída')
  }
}
const openView = (r) => {
  alert(`Título: ${r.title}\n\nIngredientes:\n${(r.ingredients||[]).join('\n')}\n\nModo:\n${r.preparation || '---'}`)
}
</script>