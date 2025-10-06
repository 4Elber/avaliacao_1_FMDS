<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container class="pa-4" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from './components/AppBar.vue'
</script>