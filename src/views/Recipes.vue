<template>
  <div>
    <h2>Receitas</h2>

    <v-row align="center">
      <v-col cols="12" md="6">
        <v-text-field v-model="q" label="Buscar por título" clearable />
      </v-col>
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="showCreate = true">Nova Receita</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" v-for="r in filtered" :key="r.id">
        <RecipeCard :recipe="r" @edit="onEdit" @delete="onDelete" @view="onView" />
      </v-col>
      <v-col v-if="filtered.length === 0">Nenhuma receita encontrada.</v-col>
    </v-row>

    <v-dialog v-model="showCreate" width="700">
      <RecipeForm :modelValue="editing" @save="save" @cancel="() => { showCreate=false; editing=null }" />
    </v-dialog>

    <ConfirmDialog v-model="confirmOpen" title="Excluir receita" :message="`Deseja excluir '${toDelete?.title}'?`" @confirm="confirmDelete" @cancel="() => confirmOpen=false" />
  </div>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import RecipeForm from '../components/RecipeForm.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import useRecipes from '../composables/useRecipes'
import { ref, computed, onMounted } from 'vue'

const { recipes, add, update, remove, find } = useRecipes()
const q = ref('')
const showCreate = ref(false)
const editing = ref(null)
const confirmOpen = ref(false)
const toDelete = ref(null)

const filtered = computed(() => {
  const text = q.value.trim().toLowerCase()
  if (!text) return recipes.value
  return recipes.value.filter(r => r.title.toLowerCase().includes(text))
})

const onEdit = (r) => { editing.value = { ...r }; showCreate.value = true }
const onView = (r) => { alert(`Título: ${r.title}\n\nIngredientes:\n${(r.ingredients||[]).join('\n')}\n\nModo:\n${r.preparation||'---'}`) }
const onDelete = (r) => { toDelete.value = r; confirmOpen.value = true }
const confirmDelete = () => { remove(toDelete.value.id); confirmOpen.value = false; toDelete.value = null }

const save = (recipe) => {
  if (recipe.id) { update(recipe.id, recipe); alert('Receita atualizada') }
  else { add(recipe); alert('Receita criada') }
  showCreate.value = false; editing.value = null
}

onMounted(() => {
  const hash = window.location.hash
  if (hash && hash.startsWith('#edit-')) {
    const id = hash.replace('#edit-','')
    const r = find(id)
    if (r) { editing.value = { ...r }; showCreate.value = true; history.replaceState(null, '', window.location.pathname) }
  }
})
</script>