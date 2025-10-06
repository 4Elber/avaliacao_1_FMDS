<template>
  <v-dialog v-model="open" width="400">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="error" @click="confirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ modelValue: Boolean, title: { type: String, default: 'Confirmar' }, message: { type: String, default: 'Deseja continuar?' } })
const emit = defineEmits(['update:modelValue','confirm','cancel'])
const open = ref(props.modelValue)
watch(() => props.modelValue, v => open.value = v)
watch(open, v => emit('update:modelValue', v))
const confirm = () => emit('confirm')
const cancel = () => emit('cancel')
</script>