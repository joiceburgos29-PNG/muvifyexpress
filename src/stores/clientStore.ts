import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface QuoteRequest {
  id: string
  origin: string
  destination: string
  date: string
  propertyType: 'apartment' | 'house' | 'office'
  squareMeters: number
  needsPacking: boolean
  needsAssembly: boolean
  status: 'pending' | 'quoted' | 'booked' | 'completed'
  createdAt: string
}

export interface Quote {
  id: string
  requestId: string
  companyId: string
  companyName: string
  price: number
  estimatedHours: number
  services: string[]
  rating: number
  reviews: number
  status: 'pending' | 'accepted' | 'rejected'
}

export interface Booking {
  id: string
  quoteId: string
  companyName: string
  date: string
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  amount: number
}

export interface Message {
  id: string
  requestId: string
  senderId: string
  senderName: string
  senderRole: 'client' | 'company'
  message: string
  timestamp: string
  read: boolean
}

export const useClientStore = defineStore('client', () => {
  const requests = ref<QuoteRequest[]>([
    {
      id: 'req_1',
      origin: 'Madrid, Calle Principal 10',
      destination: 'Madrid, Avenida del Prado 5',
      date: '2024-08-15',
      propertyType: 'apartment',
      squareMeters: 85,
      needsPacking: true,
      needsAssembly: false,
      status: 'quoted',
      createdAt: '2024-07-30'
    },
    {
      id: 'req_2',
      origin: 'Barcelona, Paseo de Gracia 20',
      destination: 'Barcelona, Diagonal 100',
      date: '2024-09-10',
      propertyType: 'house',
      squareMeters: 120,
      needsPacking: false,
      needsAssembly: true,
      status: 'pending',
      createdAt: '2024-07-28'
    }
  ])

  const quotes = ref<Quote[]>([
    {
      id: 'quote_1',
      requestId: 'req_1',
      companyId: 'comp_1',
      companyName: 'Mudanzas Profesionales',
      price: 450,
      estimatedHours: 4,
      services: ['embalaje', 'descarga'],
      rating: 4.8,
      reviews: 24,
      status: 'pending'
    },
    {
      id: 'quote_2',
      requestId: 'req_1',
      companyId: 'comp_2',
      companyName: 'Express Mudanzas',
      price: 380,
      estimatedHours: 5,
      services: ['descarga'],
      rating: 4.5,
      reviews: 18,
      status: 'pending'
    },
    {
      id: 'quote_3',
      requestId: 'req_1',
      companyId: 'comp_3',
      companyName: 'Transportes Rapidos',
      price: 520,
      estimatedHours: 3,
      services: ['embalaje', 'descarga', 'montaje'],
      rating: 4.9,
      reviews: 42,
      status: 'pending'
    }
  ])

  const bookings = ref<Booking[]>([
    {
      id: 'book_1',
      quoteId: 'quote_1',
      companyName: 'Mudanzas Profesionales',
      date: '2024-06-20',
      status: 'completed',
      amount: 450
    }
  ])

  const messages = ref<Message[]>([])

  const selectedRequestId = ref<string | null>(null)

  const requestsCount = computed(() => requests.value.length)
  const pendingCount = computed(() => requests.value.filter(r => r.status === 'pending').length)
  const quotedCount = computed(() => requests.value.filter(r => r.status === 'quoted').length)
  const bookedCount = computed(() => bookings.value.length)

  const selectedRequest = computed(() =>
    requests.value.find(r => r.id === selectedRequestId.value)
  )

  const selectedRequestQuotes = computed(() =>
    quotes.value.filter(q => q.requestId === selectedRequestId.value)
  )

  const unreadMessagesCount = computed(() =>
    messages.value.filter(m => !m.read).length
  )

  const createRequest = async (data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: QuoteRequest = {
      ...data,
      id: 'req_' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    requests.value.push(newRequest)
    return newRequest
  }

  const selectRequest = (requestId: string) => {
    selectedRequestId.value = requestId
  }

  const acceptQuote = async (quoteId: string) => {
    const quote = quotes.value.find(q => q.id === quoteId)
    if (!quote) return

    quote.status = 'accepted'

    const booking: Booking = {
      id: 'book_' + Date.now(),
      quoteId,
      companyName: quote.companyName,
      date: new Date().toISOString(),
      status: 'confirmed',
      amount: quote.price
    }
    bookings.value.push(booking)

    // Actualizar status de la solicitud
    const request = requests.value.find(r => r.id === quote.requestId)
    if (request) {
      request.status = 'booked'
    }

    return booking
  }

  const rejectQuote = async (quoteId: string) => {
    const quote = quotes.value.find(q => q.id === quoteId)
    if (quote) {
      quote.status = 'rejected'
    }
  }

  const sendMessage = async (requestId: string, message: string) => {
    const newMessage: Message = {
      id: 'msg_' + Date.now(),
      requestId,
      senderId: 'client_1',
      senderName: 'Tú',
      senderRole: 'client',
      message,
      timestamp: new Date().toISOString(),
      read: true
    }
    messages.value.push(newMessage)
    return newMessage
  }

  const getMessages = (requestId: string) => {
    return messages.value.filter(m => m.requestId === requestId)
  }

  const markMessagesAsRead = (requestId: string) => {
    messages.value
      .filter(m => m.requestId === requestId && !m.read)
      .forEach(m => (m.read = true))
  }

  return {
    requests,
    quotes,
    bookings,
    messages,
    selectedRequestId,
    requestsCount,
    pendingCount,
    quotedCount,
    bookedCount,
    selectedRequest,
    selectedRequestQuotes,
    unreadMessagesCount,
    createRequest,
    selectRequest,
    acceptQuote,
    rejectQuote,
    sendMessage,
    getMessages,
    markMessagesAsRead
  }
})
