<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <router-link to="/company/requests" class="text-primary hover:text-blue-700">← Volver</router-link>
    <div class="mt-8 bg-white rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-900">Detalle de Solicitud</h1>
      <p class="text-gray-600 mt-4">{{ route.params.id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
