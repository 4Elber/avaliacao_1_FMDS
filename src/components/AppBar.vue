<template>
  <v-app-bar app color="teal darken-1" dark>
    <v-app-bar-title>Catálogo de Receitas Saudáveis</v-app-bar-title>
    <v-spacer />
    <v-btn text :to="{ name: 'Home' }">Home</v-btn>
    <v-btn text :to="{ name: 'Receitas' }">Receitas</v-btn>
    <v-btn text :to="{ name: 'Sobre' }">Sobre</v-btn>
  </v-app-bar>
</template>

<script setup>
</script>