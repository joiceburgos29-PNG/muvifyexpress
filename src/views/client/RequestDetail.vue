<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link to="/client/requests" class="text-primary hover:text-blue-700">
          ← Volver a Solicitudes
        </router-link>
      </div>
    </nav>

    <div v-if="selectedRequest" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Detalle de Solicitud</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Request Details -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Información de la Mudanza</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Origen</p>
              <p class="text-lg font-semibold text-gray-900">{{ selectedRequest.origin }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Destino</p>
              <p class="text-lg font-semibold text-gray-900">{{ selectedRequest.destination }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Tipo de Vivienda</p>
                <p class="font-semibold text-gray-900">{{ getPropertyLabel(selectedRequest.propertyType) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Metros Cuadrados</p>
                <p class="font-semibold text-gray-900">{{ selectedRequest.squareMeters }}m²</p>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-500">Fecha de Mudanza</p>
              <p class="font-semibold text-gray-900">{{ formatDate(selectedRequest.date) }}</p>
            </div>
            <div class="pt-4 border-t">
              <p class="text-sm text-gray-500 mb-2">Servicios Adicionales</p>
              <div class="flex gap-2">
                <span v-if="selectedRequest.needsPacking" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Embalaje
                </span>
                <span v-if="selectedRequest.needsAssembly" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Montaje
                </span>
                <span v-if="!selectedRequest.needsPacking && !selectedRequest.needsAssembly" class="text-gray-500 text-sm">
                  Ninguno
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Acciones</h2>
          <div class="space-y-3">
            <router-link 
              :to="`/client/quotes/${selectedRequest.id}`"
              class="block w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition text-center font-semibold"
            >
              Ver Presupuestos ({{ requestQuotes.length }})
            </router-link>
            <button 
              @click="goToMessages"
              class="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Mensajes
            </button>
          </div>

          <div v-if="requestQuotes.length > 0" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-sm font-semibold text-green-900">
              ✓ Tienes {{ requestQuotes.length }} presupuesto(s) disponible(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'

const router = useRouter()
const clientStore = useClientStore()

const selectedRequest = computed(() => clientStore.selectedRequest)
const requestQuotes = computed(() => clientStore.selectedRequestQuotes)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getPropertyLabel = (type: string) => {
  const labels: Record<string, string> = {
    apartment: 'Apartamento',
    house: 'Casa',
    office: 'Oficina'
  }
  return labels[type]
}

const goToMessages = () => {
  if (selectedRequest.value) {
    router.push(`/client/messages/${selectedRequest.value.id}`)
  }
}
</script>

<style scoped>
</style>
