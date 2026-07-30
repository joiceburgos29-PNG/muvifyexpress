<template>
  <div :class="['bg-white rounded-lg shadow-md p-6 transition-all duration-200 h-full flex flex-col', isSelected && 'ring-2 ring-primary shadow-lg']">
    <!-- Company Header -->
    <div class="flex items-center gap-4 mb-6">
      <img :src="quote.company.logo" :alt="quote.company.name" class="w-12 h-12 rounded-lg object-cover" />
      <div class="flex-1">
        <h3 class="font-bold text-gray-900">{{ quote.company.name }}</h3>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-yellow-400">★</span>
          <span class="text-sm font-semibold text-gray-700">{{ quote.company.rating }}</span>
          <span class="text-xs text-gray-500">({{ quote.company.reviews }})</span>
        </div>
      </div>
    </div>

    <!-- Main Price -->
    <div class="mb-6">
      <p class="text-gray-600 text-sm mb-1">Presupuesto Total</p>
      <p class="text-3xl font-bold text-primary">{{ formatCurrency(quote.totalPrice) }}</p>
    </div>

    <!-- Services -->
    <div class="mb-6">
      <p class="text-gray-600 text-sm mb-2 font-semibold">Servicios Incluidos</p>
      <div class="flex flex-wrap gap-2">
        <span v-for="service in quote.services.slice(0, 3)" :key="service" class="text-xs bg-yellow-50 text-primary-dark px-2 py-1 rounded">
          {{ service }}
        </span>
        <span v-if="quote.services.length > 3" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
          +{{ quote.services.length - 3 }}
        </span>
      </div>
    </div>

    <!-- Key Info -->
    <div class="space-y-3 mb-6 flex-1">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Disponible:</span>
        <span class="font-semibold text-gray-900">{{ formatDate(quote.availableDate) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Experiencia:</span>
        <span class="font-semibold text-gray-900">{{ quote.company.yearsExperience }} años</span>
      </div>
    </div>

    <!-- Badge for best deal -->
    <div v-if="isBestPrice" class="mb-4 bg-green-50 border border-green-200 rounded px-3 py-2">
      <p class="text-xs text-green-800 font-semibold">
        El mejor precio en esta búsqueda
      </p>
    </div>

    <!-- Status indicator -->
    <div :class="['px-3 py-1 rounded text-center text-xs font-semibold', isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700']">
      {{ isSelected ? 'Seleccionada' : 'Disponible' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Company {
  id: string
  name: string
  logo: string
  rating: number
  reviews: number
  yearsExperience: number
}

interface Quote {
  id: string
  company: Company
  totalPrice: number
  services: string[]
  availableDate: string
  description: string
  createdAt: string
}

interface Props {
  quote: Quote
  isSelected?: boolean
  isBestPrice?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  isBestPrice: false
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
}
</script>
