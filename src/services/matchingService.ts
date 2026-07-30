/**
 * Servicio de Matching Inteligente
 * 
 * Algoritmo para emparejar solicitudes de clientes con empresas de mudanzas
 * basado en:
 * - Ubicación geográfica
 * - Tipo de servicio requerido
 * - Disponibilidad
 * - Rating y experiencia
 * - Carga de trabajo actual
 */

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
  serviceArea: number // km
  rating: number
  yearsExperience: number
  services: string[]
  currentLoad: number // 0-100
  availability: Date[]
  maxVolume: number
  pricePerKm: number
  pricePerHour: number
}

interface MatchScore {
  company: Company
  score: number
  breakdown: {
    location: number
    services: number
    availability: number
    rating: number
    load: number
  }
}

/**
 * Calcula la distancia entre dos puntos geográficos (Haversine)
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radio de la tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Calcula si la empresa está en el área de servicio
 */
function isInServiceArea(company: Company, request: QuoteRequest): number {
  // Distancia origen
  const distOrigin = calculateDistance(
    company.location.lat,
    company.location.lng,
    request.origin.lat,
    request.origin.lng
  )

  // Distancia destino
  const distDestination = calculateDistance(
    company.location.lat,
    company.location.lng,
    request.destination.lat,
    request.destination.lng
  )

  const maxDist = Math.max(distOrigin, distDestination)

  if (maxDist > company.serviceArea) {
    return 0 // Fuera de área
  }

  // Puntuación: más cercana = mejor
  return Math.max(0, 100 - (maxDist / company.serviceArea) * 100)
}

/**
 * Calcula coincidencia de servicios
 */
function getServicesMatch(company: Company, request: QuoteRequest): number {
  const companyServices = new Set(company.services)
  const requestServices = new Set(request.services)

  const intersection = new Set([...requestServices].filter((x) => companyServices.has(x)))

  if (requestServices.size === 0) return 100

  return (intersection.size / requestServices.size) * 100
}

/**
 * Calcula disponibilidad
 */
function getAvailabilityMatch(company: Company, request: QuoteRequest): number {
  const requestDate = new Date(request.date)
  requestDate.setHours(0, 0, 0, 0)

  const isAvailable = company.availability.some((date) => {
    const availDate = new Date(date)
    availDate.setHours(0, 0, 0, 0)
    return availDate.getTime() === requestDate.getTime()
  })

  return isAvailable ? 100 : 20 // Si no está disponible, puntuación baja pero no 0
}

/**
 * Algoritmo principal de matching
 */
export function findBestMatches(
  request: QuoteRequest,
  companies: Company[],
  topN: number = 3
): MatchScore[] {
  const matches: MatchScore[] = companies
    .map((company) => {
      // Calcular puntuaciones parciales (0-100)
      const locationScore = isInServiceArea(company, request)
      const servicesScore = getServicesMatch(company, request)
      const availabilityScore = getAvailabilityMatch(company, request)
      
      // Puntuación de rating (normalizada a 0-100)
      const ratingScore = (company.rating / 5) * 100
      
      // Puntuación de carga (menos carga = mejor)
      const loadScore = Math.max(0, 100 - company.currentLoad)

      // Ponderación final
      const weights = {
        location: 0.25, // Ubicación importante
        services: 0.25, // Servicios requeridos
        availability: 0.2, // Disponibilidad
        rating: 0.2, // Reputación
        load: 0.1, // Carga de trabajo
      }

      const totalScore =
        locationScore * weights.location +
        servicesScore * weights.services +
        availabilityScore * weights.availability +
        ratingScore * weights.rating +
        loadScore * weights.load

      return {
        company,
        score: Math.round(totalScore),
        breakdown: {
          location: Math.round(locationScore),
          services: Math.round(servicesScore),
          availability: Math.round(availabilityScore),
          rating: Math.round(ratingScore),
          load: Math.round(loadScore),
        },
      }
    })
    .filter((match) => match.score > 40) // Filtrar matches muy bajos
    .sort((a, b) => b.score - a.score) // Ordenar por puntuación
    .slice(0, topN) // Tomar top N

  return matches
}

/**
 * Calcula presupuesto estimado
 */
export function estimatePrice(
  company: Company,
  request: QuoteRequest,
  distanceKm: number,
  estimatedHours: number
): number {
  const distancePrice = company.pricePerKm * distanceKm
  const hourlyPrice = company.pricePerHour * estimatedHours
  const basePrice = distancePrice + hourlyPrice

  // Ajustes por servicios especiales
  let serviceMultiplier = 1
  if (request.services.includes('embalaje')) serviceMultiplier += 0.15
  if (request.services.includes('montaje')) serviceMultiplier += 0.1
  if (request.services.includes('seguro')) serviceMultiplier += 0.05

  return Math.round(basePrice * serviceMultiplier)
}

/**
 * Obtiene empresas disponibles para una ubicación
 */
export function getCompaniesInArea(
  companies: Company[],
  location: Location,
  radiusKm: number = 50
): Company[] {
  return companies.filter((company) => {
    const distance = calculateDistance(
      company.location.lat,
      company.location.lng,
      location.lat,
      location.lng
    )
    return distance <= radiusKm
  })
}

export default {
  findBestMatches,
  estimatePrice,
  getCompaniesInArea,
  calculateDistance,
}
