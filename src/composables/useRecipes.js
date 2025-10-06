import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'recipe_catalog_v1'

export default function useRecipes() {
  const recipes = ref([])

  const load = () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    try {
      recipes.value = raw ? JSON.parse(raw) : []
    } catch (e) {
      recipes.value = []
    }
  }
  load()

  watch(recipes, (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  }, { deep: true })

  const add = (recipe) => {
    recipe.id = Date.now().toString()
    recipes.value.unshift(recipe)
  }

  const update = (id, updated) => {
    const idx = recipes.value.findIndex(r => r.id === id)
    if (idx !== -1) recipes.value.splice(idx, 1, { ...recipes.value[idx], ...updated })
  }

  const remove = (id) => {
    recipes.value = recipes.value.filter(r => r.id !== id)
  }

  const find = (id) => recipes.value.find(r => r.id === id) || null

  const countByTag = computed(() => {
    const map = {}
    recipes.value.forEach(r => {
      (r.tags || []).forEach(t => map[t] = (map[t] || 0) + 1)
    })
    return map
  })

  return { recipes, load, add, update, remove, find, countByTag }
}