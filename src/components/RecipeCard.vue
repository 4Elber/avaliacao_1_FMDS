<template>
  <v-card class="ma-2" max-width="400">
    <v-card-title>{{ recipe.title }}</v-card-title>

    <v-card-subtitle v-if="recipe.tags && recipe.tags.length">
      <v-chip v-for="(t, i) in recipe.tags" :key="i" small class="ma-1">{{ t }}</v-chip>
    </v-card-subtitle>

    <v-card-text>
      <div v-if="shortIngredients.length">
        <strong>Ingredientes:</strong>
        <ul>
          <li v-for="(ing, idx) in shortIngredients" :key="idx">{{ ing }}</li>
        </ul>
      </div>
      <div v-else><em>Sem ingredientes listados</em></div>
    </v-card-text>

    <v-card-actions>
      <v-btn small text @click="$emit('view', recipe)">Ver</v-btn>
      <v-btn small text color="primary" @click="$emit('edit', recipe)">Editar</v-btn>
      <v-btn small text color="error" @click="$emit('delete', recipe)">Excluir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ recipe: { type: Object, required: true } })
const shortIngredients = computed(() => {
  if (!props.recipe.ingredients) return []
  return props.recipe.ingredients.slice(0, 3)
})
</script>