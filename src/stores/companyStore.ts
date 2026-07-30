import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface IncomingRequest {
  id: string
  clientName: string
  origin: string
  destination: string
  date: string
  propertyType: string
  status: 'new' | 'viewed' | 'quoted' | 'rejected'
  createdAt: string
}

export interface CompanyQuote {
  id: string
  requestId: string
  clientName: string
  price: number
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface ScheduledMove {
  id: string
  clientName: string
  destination: string
  date: string
  time: string
  status: 'scheduled' | 'in_progress' | 'completed'
}

export interface Analytics {
  totalRequests: number
  totalQuotes: number
  conversionRate: number
  totalRevenue: number
  avgRating: number
  topCities: { city: string; count: number }[]
}

export const useCompanyStore = defineStore('company', () => {
  const incomingRequests = ref<IncomingRequest[]>([
    {
      id: 'req_1',
      clientName: 'Juan García',
      origin: 'Madrid, Calle Mayor 15',
      destination: 'Madrid, Plaza Mayor 5',
      date: '2024-08-20',
      propertyType: 'apartment',
      status: 'new',
      createdAt: '2024-07-30'
    },
    {
      id: 'req_2',
      clientName: 'María López',
      origin: 'Barcelona, Rambla 100',
      destination: 'Barcelona, Montjuïc 50',
      date: '2024-09-05',
      propertyType: 'house',
      status: 'viewed',
      createdAt: '2024-07-29'
    },
    {
      id: 'req_3',
      clientName: 'Pedro Martínez',
      origin: 'Valencia, Av. del Puerto 20',
      destination: 'Valencia, Centro 10',
      date: '2024-08-15',
      propertyType: 'office',
      status: 'new',
      createdAt: '2024-07-28'
    }
  ])

  const companyQuotes = ref<CompanyQuote[]>([
    {
      id: 'quote_1',
      requestId: 'req_1',
      clientName: 'Juan García',
      price: 450,
      status: 'pending',
      createdAt: '2024-07-30'
    }
  ])

  const scheduledMoves = ref<ScheduledMove[]>([
    {
      id: 'move_1',
      clientName: 'Carlos Ruiz',
      destination: 'Madrid, Gran Vía 25',
      date: '2024-08-10',
      time: '09:00',
      status: 'scheduled'
    },
    {
      id: 'move_2',
      clientName: 'Lucia Fernandez',
      destination: 'Barcelona, Paseo de Gracia 100',
      date: '2024-08-12',
      time: '14:00',
      status: 'in_progress'
    }
  ])

  const analytics = ref<Analytics>({
    totalRequests: 45,
    totalQuotes: 38,
    conversionRate: 0.84,
    totalRevenue: 15600,
    avgRating: 4.7,
    topCities: [
      { city: 'Madrid', count: 18 },
      { city: 'Barcelona', count: 15 },
      { city: 'Valencia', count: 12 }
    ]
  })

  const selectedRequestId = ref<string | null>(null)

  const newRequestsCount = computed(() =>
    incomingRequests.value.filter(r => r.status === 'new').length
  )

  const pendingQuotesCount = computed(() =>
    companyQuotes.value.filter(q => q.status === 'pending').length
  )

  const upcomingMovesCount = computed(() =>
    scheduledMoves.value.filter(m => m.status === 'scheduled').length
  )

  const selectedRequest = computed(() =>
    incomingRequests.value.find(r => r.id === selectedRequestId.value)
  )

  const markRequestAsViewed = async (requestId: string) => {
    const request = incomingRequests.value.find(r => r.id === requestId)
    if (request && request.status === 'new') {
      request.status = 'viewed'
    }
  }

  const submitQuote = async (requestId: string, price: number) => {
    const request = incomingRequests.value.find(r => r.id === requestId)
    if (!request) return

    const newQuote: CompanyQuote = {
      id: 'quote_' + Date.now(),
      requestId,
      clientName: request.clientName,
      price,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    companyQuotes.value.push(newQuote)
    request.status = 'quoted'

    return newQuote
  }

  const rejectRequest = async (requestId: string) => {
    const request = incomingRequests.value.find(r => r.id === requestId)
    if (request) {
      request.status = 'rejected'
    }
  }

  const scheduleMove = async (data: {
    quoteId: string
    clientName: string
    destination: string
    date: string
    time: string
  }) => {
    const newMove: ScheduledMove = {
      id: 'move_' + Date.now(),
      clientName: data.clientName,
      destination: data.destination,
      date: data.date,
      time: data.time,
      status: 'scheduled'
    }

    scheduledMoves.value.push(newMove)
    return newMove
  }

  const updateMoveStatus = async (moveId: string, status: ScheduledMove['status']) => {
    const move = scheduledMoves.value.find(m => m.id === moveId)
    if (move) {
      move.status = status
    }
  }

  const selectRequest = (requestId: string) => {
    selectedRequestId.value = requestId
  }

  return {
    incomingRequests,
    companyQuotes,
    scheduledMoves,
    analytics,
    selectedRequestId,
    newRequestsCount,
    pendingQuotesCount,
    upcomingMovesCount,
    selectedRequest,
    markRequestAsViewed,
    submitQuote,
    rejectRequest,
    scheduleMove,
    updateMoveStatus,
    selectRequest
  }
})
