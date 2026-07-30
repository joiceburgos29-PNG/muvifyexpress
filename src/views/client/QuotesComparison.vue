<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link :to="`/client/requests/${route.params.requestId}`" class="text-primary hover:text-blue-700">
          ← Volver
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Comparar Presupuestos</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="quote in quotes" 
          :key="quote.id"
          class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-900">{{ quote.companyName }}</h3>
            <div class="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <span>⭐ {{ quote.rating }}</span>
              <span>({{ quote.reviews }} opiniones)</span>
            </div>
          </div>

          <!-- Price -->
          <div class="p-6 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
            <p class="text-gray-500 text-sm mb-1">Presupuesto</p>
            <p class="text-4xl font-bold text-primary">{{ quote.price }}€</p>
            <p class="text-gray-500 text-sm mt-2">Estimado: {{ quote.estimatedHours }} horas</p>
          </div>

          <!-- Services -->
          <div class="p-6 border-b border-gray-200">
            <p class="font-semibold text-gray-900 mb-3">Servicios Incluidos</p>
            <ul class="space-y-2">
              <li v-for="service in quote.services" :key="service" class="text-sm text-gray-600 flex items-center gap-2">
                <span class="text-primary">✓</span> {{ capitalizeService(service) }}
              </li>
            </ul>
          </div>

          <!-- Action Button -->
          <div class="p-6 bg-gray-50 border-t border-gray-200">
            <button 
              @click="acceptQuote(quote.id)"
              class="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Aceptar Presupuesto
            </button>
            <button 
              @click="rejectQuote(quote.id)"
              class="w-full mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>

      <div v-if="quotes.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">Aún no hay presupuestos disponibles</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'

const route = useRoute()
const clientStore = useClientStore()

const quotes = computed(() => clientStore.selectedRequestQuotes)

const acceptQuote = async (quoteId: string) => {
  await clientStore.acceptQuote(quoteId)
  alert('Presupuesto aceptado. Tu mudanza ha sido confirmada.')
}

const rejectQuote = async (quoteId: string) => {
  await clientStore.rejectQuote(quoteId)
}

const capitalizeService = (service: string) => {
  const services: Record<string, string> = {
    embalaje: 'Embalaje',
    descarga: 'Descarga',
    montaje: 'Montaje'
  }
  return services[service] || service
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
</script>

<style scoped>
</style>
