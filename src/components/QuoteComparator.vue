<template>
  <div class="w-full">
    <!-- Controls -->
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Compara Presupuestos</h2>
        <p class="text-gray-600 mt-1">{{ quotes.length }} propuestas disponibles</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="sortBy('price')"
          :class="['px-4 py-2 rounded-lg font-medium transition-colors', sortField === 'price' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          Precio
        </button>
        <button
          @click="sortBy('rating')"
          :class="['px-4 py-2 rounded-lg font-medium transition-colors', sortField === 'rating' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          Rating
        </button>
        <button
          @click="sortBy('date')"
          :class="['px-4 py-2 rounded-lg font-medium transition-colors', sortField === 'date' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          Reciente
        </button>
      </div>
    </div>

    <!-- Responsive Grid / Carousel -->
    <div v-if="sortedQuotes.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-600">No hay presupuestos disponibles aún</p>
    </div>

    <!-- Desktop View (3 columns) -->
    <div class="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
      <div
        v-for="(quote, index) in sortedQuotes.slice(0, 3)"
        :key="quote.id"
        @click="selectQuote(quote)"
        :class="['cursor-pointer transition-all duration-200', quote.id === selectedId ? 'ring-2 ring-primary' : 'hover:shadow-lg']"
      >
        <QuoteCard :quote="quote" :isSelected="quote.id === selectedId" />
      </div>
    </div>

    <!-- Mobile/Tablet View (Carousel) -->
    <div class="lg:hidden mb-8">
      <div class="overflow-x-auto pb-4">
        <div class="flex gap-4" style="width: max-content">
          <div
            v-for="quote in sortedQuotes"
            :key="quote.id"
            class="flex-shrink-0"
            style="width: 340px"
            @click="selectQuote(quote)"
            :class="['cursor-pointer transition-all duration-200', quote.id === selectedId ? 'ring-2 ring-primary' : 'hover:shadow-lg']"
          >
            <QuoteCard :quote="quote" :isSelected="quote.id === selectedId" />
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Comparison Table -->
    <div v-if="selectedQuote" class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Comparación Detallada</h3>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b-2 border-gray-200">
            <tr>
              <th class="text-left py-3 px-4 font-semibold text-gray-700">Característica</th>
              <th v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-3 px-4 font-semibold text-gray-700">
                <div class="flex items-center justify-center gap-2">
                  <img :src="quote.company.logo" :alt="quote.company.name" class="w-6 h-6 rounded" />
                  <span class="hidden sm:inline">{{ quote.company.name }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Precio Total</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <div class="text-2xl font-bold text-primary">{{ formatCurrency(quote.totalPrice) }}</div>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Servicios</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <div class="text-sm text-gray-600">
                  <div v-for="service in quote.services" :key="service" class="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                    {{ service }}
                  </div>
                </div>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Fecha Disponible</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <div class="text-gray-900">{{ formatDate(quote.availableDate) }}</div>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Rating</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <div class="flex items-center justify-center gap-1">
                  <span class="text-yellow-400">★</span>
                  <span class="font-bold text-gray-900">{{ quote.company.rating }}</span>
                  <span class="text-gray-500 text-sm">({{ quote.company.reviews }} reviews)</span>
                </div>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Experiencia</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <div class="text-gray-900">{{ quote.company.yearsExperience }} años</div>
              </td>
            </tr>
            <tr class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4 font-semibold text-gray-900">Descripción</td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="py-4 px-4">
                <div class="text-sm text-gray-600">{{ quote.description }}</div>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4"></td>
              <td v-for="quote in comparisonQuotes" :key="quote.id" class="text-center py-4 px-4">
                <button
                  @click="acceptQuote(quote)"
                  class="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Aceptar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import QuoteCard from './QuoteCard.vue'

interface Quote {
  id: string
  company: {
    id: string
    name: string
    logo: string
    rating: number
    reviews: number
    yearsExperience: number
  }
  totalPrice: number
  services: string[]
  availableDate: string
  description: string
  createdAt: string
}

interface Props {
  quotes: Quote[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  accept: [quote: Quote]
}>()

const selectedId = ref<string | null>(props.quotes[0]?.id || null)
const sortField = ref<'price' | 'rating' | 'date'>('price')

const sortedQuotes = computed(() => {
  const sorted = [...props.quotes]
  if (sortField.value === 'price') {
    return sorted.sort((a, b) => a.totalPrice - b.totalPrice)
  } else if (sortField.value === 'rating') {
    return sorted.sort((a, b) => b.company.rating - a.company.rating)
  } else {
    return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
})

const selectedQuote = computed(() => sortedQuotes.value.find(q => q.id === selectedId.value))

const comparisonQuotes = computed(() => sortedQuotes.value.slice(0, 3))

const selectQuote = (quote: Quote) => {
  selectedId.value = quote.id
}

const sortBy = (field: 'price' | 'rating' | 'date') => {
  sortField.value = field
}

const acceptQuote = (quote: Quote) => {
  emit('accept', quote)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
