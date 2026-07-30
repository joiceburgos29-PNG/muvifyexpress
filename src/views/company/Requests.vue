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
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Solicitudes Entrantes</h1>

      <div class="space-y-4">
        <div 
          v-for="request in companyStore.incomingRequests" 
          :key="request.id"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          @click="selectRequest(request.id)"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ request.clientName }}</h3>
              <p class="text-gray-500 text-sm mt-1">
                {{ request.origin }} → {{ request.destination }}
              </p>
              <p class="text-gray-500 text-sm">
                Tipo: {{ request.propertyType }} | Fecha: {{ formatDate(request.date) }}
              </p>
            </div>
            <div class="text-right">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(request.status)]">
                {{ getStatusLabel(request.status) }}
              </span>
              <p class="text-gray-500 text-sm mt-2">Hace {{ getDaysAgo(request.createdAt) }} días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCompanyStore } from '../../stores/companyStore'

const router = useRouter()
const companyStore = useCompanyStore()

const selectRequest = (requestId: string) => {
  companyStore.selectRequest(requestId)
  router.push(`/company/requests/${requestId}`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES')
}

const getDaysAgo = (date: string) => {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
  return days === 0 ? 'Hoy' : days
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: 'Nueva',
    viewed: 'Revisada',
    quoted: 'Presupuestada',
    rejected: 'Rechazada'
  }
  return labels[status]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-red-100 text-red-800',
    viewed: 'bg-blue-100 text-blue-800',
    quoted: 'bg-green-100 text-green-800',
    rejected: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
