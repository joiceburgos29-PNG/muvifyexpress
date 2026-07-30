<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link to="/company/dashboard" class="text-primary hover:text-primary-dark">
          ← Volver al Panel
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mis Presupuestos</h1>

      <div class="space-y-4">
        <div 
          v-for="quote in companyStore.companyQuotes" 
          :key="quote.id"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ quote.clientName }}</h3>
              <p class="text-gray-500 text-sm">ID Solicitud: {{ quote.requestId }}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary">{{ quote.price }}€</p>
              <span :class="['px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block', getStatusColor(quote.status)]">
                {{ getStatusLabel(quote.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="companyStore.companyQuotes.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">No has enviado presupuestos aún</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from '../../stores/companyStore'

const companyStore = useCompanyStore()

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    accepted: 'Aceptado',
    rejected: 'Rechazado'
  }
  return labels[status]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
