<template>
  <div class="w-full bg-white rounded-lg shadow-lg p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Buscando las Mejores Empresas</h2>
      <p class="text-gray-600">Analizando {{ totalCompanies }} empresas certificadas</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <!-- Progress Bar -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-semibold text-gray-700">Progreso del análisis</span>
          <span class="text-sm font-semibold text-primary">{{ progress }}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary transition-all duration-500 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Criterios siendo evaluados -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="criterion in criteria"
          :key="criterion.id"
          :class="['p-4 rounded-lg border-2 transition-all duration-300', criterion.completed ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50']"
        >
          <div class="flex items-center gap-2 mb-2">
            <div
              v-if="criterion.completed"
              class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs"
            >
              ✓
            </div>
            <div v-else class="w-5 h-5 rounded-full bg-yellow-500 animate-spin"></div>
            <span class="text-sm font-semibold text-gray-900">{{ criterion.label }}</span>
          </div>
          <p class="text-xs text-gray-600">{{ criterion.description }}</p>
        </div>
      </div>

      <!-- Status message -->
      <div class="text-center py-4 bg-yellow-50 rounded-lg">
        <p class="text-sm text-blue-800">
          {{ statusMessage }}
        </p>
      </div>
    </div>

    <!-- Results -->
    <div v-else-if="!loading && matches.length > 0" class="space-y-6">
      <!-- Summary -->
      <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-500">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Análisis Completado</h3>
        <p class="text-gray-600 mb-4">
          Encontramos <strong>{{ matches.length }}</strong> empresas perfectas para tu mudanza
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="inline-block bg-white px-3 py-1 rounded text-sm font-semibold text-primary border border-primary">
            Puntuación promedio: {{ averageScore }}/100
          </span>
        </div>
      </div>

      <!-- Matches Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(match, index) in matches" :key="match.company.id" class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <!-- Rank -->
          <div class="mb-4">
            <span class="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
              #{{ index + 1 }} - {{ match.score }}/100
            </span>
          </div>

          <!-- Company Info -->
          <div class="mb-4">
            <h4 class="text-lg font-bold text-gray-900">{{ match.company.name }}</h4>
            <div class="flex items-center gap-1 mt-1">
              <span class="text-yellow-400">★</span>
              <span class="text-sm font-semibold text-gray-700">{{ match.company.rating }}</span>
              <span class="text-xs text-gray-500">({{ match.company.yearsExperience }} años)</span>
            </div>
          </div>

          <!-- Breakdown Chart -->
          <div class="space-y-2 mb-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-xs font-semibold text-gray-700">Ubicación</span>
                <span class="text-xs font-bold text-primary">{{ match.breakdown.location }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500" :style="{ width: `${match.breakdown.location}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-xs font-semibold text-gray-700">Servicios</span>
                <span class="text-xs font-bold text-primary">{{ match.breakdown.services }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-green-500" :style="{ width: `${match.breakdown.services}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-xs font-semibold text-gray-700">Disponibilidad</span>
                <span class="text-xs font-bold text-primary">{{ match.breakdown.availability }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500" :style="{ width: `${match.breakdown.availability}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-xs font-semibold text-gray-700">Reputación</span>
                <span class="text-xs font-bold text-primary">{{ match.breakdown.rating }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-purple-500" :style="{ width: `${match.breakdown.rating}%` }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-xs font-semibold text-gray-700">Carga de trabajo</span>
                <span class="text-xs font-bold text-primary">{{ match.breakdown.load }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-red-500" :style="{ width: `${match.breakdown.load}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Action -->
          <button class="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            Ver presupuesto
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">No se encontraron coincidencias para tu solicitud</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface MatchScore {
  company: {
    id: string
    name: string
    rating: number
    yearsExperience: number
  }
  score: number
  breakdown: {
    location: number
    services: number
    availability: number
    rating: number
    load: number
  }
}

interface Props {
  matches: MatchScore[]
  loading?: boolean
  totalCompanies?: number
}

withDefaults(defineProps<Props>(), {
  loading: false,
  totalCompanies: 234,
})

const progress = ref(0)
const currentCriterion = ref(0)
const statusMessage = ref('')
const animationInterval = ref<NodeJS.Timer | null>(null)

const criteria = computed(() => [
  {
    id: 'location',
    label: 'Ubicación',
    description: 'Verificando cobertura geográfica',
    completed: progress.value > 20,
  },
  {
    id: 'services',
    label: 'Servicios',
    description: 'Comparando servicios disponibles',
    completed: progress.value > 40,
  },
  {
    id: 'availability',
    label: 'Disponibilidad',
    description: 'Chequeando calendarios',
    completed: progress.value > 60,
  },
  {
    id: 'rating',
    label: 'Reputación',
    description: 'Analizando ratings',
    completed: progress.value > 80,
  },
  {
    id: 'carga',
    label: 'Carga',
    description: 'Evaluando disponibilidad',
    completed: progress.value > 100,
  },
])

const statusMessages = [
  'Analizando ubicación de empresas...',
  'Verificando servicios disponibles...',
  'Checando disponibilidad de fechas...',
  'Evaluando reputación y calidad...',
  'Calculando puntuaciones finales...',
  'Ordenando resultados...',
]

const averageScore = computed(() => {
  if (props.matches.length === 0) return 0
  const sum = props.matches.reduce((acc, m) => acc + m.score, 0)
  return Math.round(sum / props.matches.length)
})

const props = defineProps<Props>()

onMounted(() => {
  if (props.loading) {
    animationInterval.value = setInterval(() => {
      if (progress.value < 100) {
        progress.value += Math.random() * 20
        if (progress.value > 100) progress.value = 100

        currentCriterion.value = Math.floor(progress.value / 20)
        statusMessage.value = statusMessages[Math.min(currentCriterion.value, statusMessages.length - 1)]
      }
    }, 400)
  }
})

onUnmounted(() => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value)
  }
})
</script>
