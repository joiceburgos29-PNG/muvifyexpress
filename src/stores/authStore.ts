import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  fullName: string
  role: 'client' | 'company' | 'admin'
  avatar?: string
  phone?: string
  createdAt: string
}

export interface CompanyProfile {
  id: string
  companyName: string
  description: string
  phone: string
  address: string
  verified: boolean
  avgRating: number
  totalReviews: number
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const companyProfile = ref<CompanyProfile | null>(null)
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isClient = computed(() => user.value?.role === 'client')
  const isCompany = computed(() => user.value?.role === 'company')
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    try {
      // Mock login - En producción llamaría a Supabase
      console.log('[v0] Logging in with:', email)
      
      // Simulamos respuesta
      const mockToken = 'mock_token_' + Date.now()
      const mockUser: User = {
        id: 'user_123',
        email,
        fullName: email.split('@')[0],
        role: email.includes('company') ? 'company' : 'client',
        createdAt: new Date().toISOString()
      }

      token.value = mockToken
      user.value = mockUser
      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      return mockUser
    } catch (e) {
      error.value = 'Error al iniciar sesión'
      console.error('[v0] Login error:', e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: {
    email: string
    password: string
    fullName: string
    role: 'client' | 'company'
    companyName?: string
  }) => {
    isLoading.value = true
    error.value = null
    try {
      console.log('[v0] Registering with:', data)

      const mockToken = 'mock_token_' + Date.now()
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        createdAt: new Date().toISOString()
      }

      token.value = mockToken
      user.value = mockUser
      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      if (data.role === 'company' && data.companyName) {
        companyProfile.value = {
          id: 'company_' + Date.now(),
          companyName: data.companyName,
          description: '',
          phone: '',
          address: '',
          verified: false,
          avgRating: 0,
          totalReviews: 0
        }
        localStorage.setItem('companyProfile', JSON.stringify(companyProfile.value))
      }

      return mockUser
    } catch (e) {
      error.value = 'Error al registrarse'
      console.error('[v0] Register error:', e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    companyProfile.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('companyProfile')
  }

  const restoreSession = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('authToken')
    const savedCompanyProfile = localStorage.getItem('companyProfile')

    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }

    if (savedCompanyProfile) {
      companyProfile.value = JSON.parse(savedCompanyProfile)
    }
  }

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user.value) return
    user.value = { ...user.value, ...data }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const updateCompanyProfile = async (data: Partial<CompanyProfile>) => {
    if (!companyProfile.value) return
    companyProfile.value = { ...companyProfile.value, ...data }
    localStorage.setItem('companyProfile', JSON.stringify(companyProfile.value))
  }

  return {
    user,
    companyProfile,
    token,
    isLoading,
    error,
    isAuthenticated,
    isClient,
    isCompany,
    isAdmin,
    login,
    register,
    logout,
    restoreSession,
    updateUserProfile,
    updateCompanyProfile
  }
})
