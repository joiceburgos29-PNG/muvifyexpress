import { ref, computed } from 'vue'
import { findBestMatches, estimatePrice, type MatchScore } from '../services/matchingService'

interface Location {
  lat: number
  lng: number
}

interface QuoteRequest {
  id: string
  origin: Location
  destination: Location
  date: Date
  services: string[]
  volume: number
  specialRequirements?: string[]
  budget?: number
}

interface Company {
  id: string
  name: string
  location: Location
  serviceArea: number
  rating: number
  yearsExperience: number
  services: string[]
  currentLoad: number
  availability: Date[]
  maxVolume: number
  pricePerKm: number
  pricePerHour: number
}

export function useMatching() {
  const matches = ref<MatchScore[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Realiza el matching automático
   */
  const performMatching = async (
    request: QuoteRequest,
    companies: Company[],
    topN: number = 3
  ) => {
    loading.value = true
    error.value = null

    try {
      // Simular delay de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 500))

      matches.value = findBestMatches(request, companies, topN)

      console.log('[v0] Matching completed:', matches.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error en el matching'
      console.error('[v0] Matching error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene empresa con mejor puntuación
   */
  const getBestMatch = computed(() => matches.value[0] || null)

  /**
   * Obtiene puntuación promedio
   */
  const averageScore = computed(() => {
    if (matches.value.length === 0) return 0
    const sum = matches.value.reduce((acc, m) => acc + m.score, 0)
    return Math.round(sum / matches.value.length)
  })

  /**
   * Reinicia el estado
   */
  const reset = () => {
    matches.value = []
    loading.value = false
    error.value = null
  }

  return {
    matches,
    loading,
    error,
    performMatching,
    getBestMatch,
    averageScore,
    reset,
  }
}
