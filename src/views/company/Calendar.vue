<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link to="/company/dashboard" class="text-primary hover:text-blue-700">
          ← Volver al Panel
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Calendario de Mudanzas</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendar -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">{{ currentMonth }}</h2>
            <div class="flex gap-2">
              <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">← Anterior</button>
              <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">Siguiente →</button>
            </div>
          </div>
          <div class="text-gray-600 text-center py-12">
            Calendario (compatible con herramientas de terceros)
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
          <div class="space-y-3">
            <div 
              v-for="move in companyStore.scheduledMoves" 
              :key="move.id"
              class="p-3 border border-gray-200 rounded-lg"
            >
              <p class="font-semibold text-gray-900 text-sm">{{ move.clientName }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(move.date) }} a las {{ move.time }}</p>
              <span :class="['text-xs font-medium px-2 py-1 rounded mt-2 inline-block', getStatusColor(move.status)]">
                {{ getStatusLabel(move.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCompanyStore } from '../../stores/companyStore'

const companyStore = useCompanyStore()

const currentMonth = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES')
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Programada',
    in_progress: 'En Curso',
    completed: 'Completada'
  }
  return labels[status]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
