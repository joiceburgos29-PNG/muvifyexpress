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
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mis Solicitudes de Presupuesto</h1>

      <div class="space-y-4">
        <div 
          v-for="request in clientStore.requests" 
          :key="request.id"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          @click="goToDetail(request.id)"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ request.origin }} → {{ request.destination }}
              </h3>
              <p class="text-gray-500 text-sm mt-1">
                Tipo: {{ getPropertyLabel(request.propertyType) }} | {{ request.squareMeters }}m² | 
                Fecha: {{ formatDate(request.date) }}
              </p>
              <div class="mt-3 flex gap-2">
                <span v-if="request.needsPacking" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Embalaje
                </span>
                <span v-if="request.needsAssembly" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Montaje
                </span>
              </div>
            </div>
            <div class="text-right">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(request.status)]">
                {{ getStatusLabel(request.status) }}
              </span>
              <p class="text-gray-500 text-sm mt-2">
                Hace {{ getDaysAgo(request.createdAt) }} días
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'

const router = useRouter()
const clientStore = useClientStore()

const goToDetail = (id: string) => {
  clientStore.selectRequest(id)
  router.push(`/client/requests/${id}`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES')
}

const getDaysAgo = (date: string) => {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
  return days === 0 ? 'Hoy' : days
}

const getPropertyLabel = (type: string) => {
  const labels: Record<string, string> = {
    apartment: 'Apartamento',
    house: 'Casa',
    office: 'Oficina'
  }
  return labels[type]
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    quoted: 'Con Presupuestos',
    booked: 'Confirmada',
    completed: 'Completada'
  }
  return labels[status]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-blue-100 text-blue-800',
    booked: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
