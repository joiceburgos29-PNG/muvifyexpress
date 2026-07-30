<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link to="/client/dashboard" class="text-primary hover:text-blue-700">
          ← Volver al Panel
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mis Mudanzas Confirmadas</h1>

      <div class="space-y-6">
        <div 
          v-for="booking in clientStore.bookings" 
          :key="booking.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ booking.companyName }}</h3>
                <p class="text-gray-500 text-sm">ID: {{ booking.id }}</p>
              </div>
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusBadge(booking.status)]">
                {{ getStatusLabel(booking.status) }}
              </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
              <div>
                <p class="text-gray-500 text-sm">Fecha</p>
                <p class="font-semibold text-gray-900">{{ formatDate(booking.date) }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">Importe</p>
                <p class="font-semibold text-primary text-lg">{{ booking.amount }}€</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">Estado</p>
                <p class="font-semibold text-gray-900">{{ getStatusLabel(booking.status) }}</p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">Acción</p>
                <button class="text-primary hover:text-blue-700 font-semibold text-sm">
                  Ver Detalles →
                </button>
              </div>
            </div>

            <div class="mt-4 flex gap-3">
              <button class="flex-1 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-semibold">
                Descargar Factura
              </button>
              <button class="flex-1 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition font-semibold">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="clientStore.bookings.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">No tienes mudanzas confirmadas aún</p>
        <router-link 
          to="/"
          class="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
        >
          Solicitar presupuesto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '../../stores/clientStore'

const clientStore = useClientStore()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    confirmed: 'Confirmada',
    in_progress: 'En Curso',
    completed: 'Completada',
    cancelled: 'Cancelada'
  }
  return labels[status]
}

const getStatusBadge = (status: string) => {
  const colors: Record<string, string> = {
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
