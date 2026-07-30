<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <p class="text-2xl font-semibold text-gray-900 mb-2">Página no encontrada</p>
      <p class="text-gray-600 mb-8">La página que buscas no existe.</p>
      <router-link 
        to="/" 
        class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
      >
        Volver a inicio
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
