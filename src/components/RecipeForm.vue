<template>
  <v-card class="pa-4">
    <v-form>
      <v-text-field v-model="local.title" label="Título" required />
      <v-textarea v-model="local.ingredientsText" label="Ingredientes (cada linha um ingrediente)" rows="4" />
      <v-textarea v-model="local.preparation" label="Modo de preparo" rows="5" />
      <v-text-field v-model="local.tagsText" label="Tags (separadas por vírgula)" />

      <v-row class="mt-3" align="center">
        <v-col>
          <v-btn color="primary" @click="submitForm">Salvar</v-btn>
          <v-btn text @click="$emit('cancel')">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ modelValue: { type: Object, default: null } })
const emit = defineEmits(['save', 'cancel'])
const local = reactive({
  id: props.modelValue?.id || null,
  title: props.modelValue?.title || '',
  ingredientsText: (props.modelValue?.ingredients || []).join('\n'),
  preparation: props.modelValue?.preparation || '',
  tagsText: (props.modelValue?.tags || []).join(', ')
})
watch(() => props.modelValue, (v) => {
  if (v) {
    local.id = v.id || null
    local.title = v.title || ''
    local.ingredientsText = (v.ingredients || []).join('\n')
    local.preparation = v.preparation || ''
    local.tagsText = (v.tags || []).join(', ')
  }
})
const submitForm = () => {
  if (!local.title.trim()) {
    alert('Título obrigatório')
    return
  }
  const recipe = {
    id: local.id,
    title: local.title.trim(),
    ingredients: local.ingredientsText ? local.ingredientsText.split('\n').map(s => s.trim()).filter(Boolean) : [],
    preparation: local.preparation,
    tags: local.tagsText ? local.tagsText.split(',').map(s => s.trim()).filter(Boolean) : []
  }
  emit('save', recipe)
}
</script>