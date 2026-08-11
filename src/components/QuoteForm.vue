<template>
  <div data-form class="w-full">
    <h3 class="text-2xl font-bold text-gray-900 mb-8">Solicita tu presupuesto</h3>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Step Indicator -->
      <div class="flex justify-between items-center mb-8">
        <div 
          v-for="step in 3" 
          :key="step"
          class="flex items-center"
        >
          <div 
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold transition',
              currentStep >= step 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ step }}
          </div>
          <div 
            v-if="step < 3"
            :class="[
              'w-12 h-1 mx-2 transition',
              currentStep > step ? 'bg-primary' : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </div>

      <!-- Step 1: Origin & Destination -->
      <div v-if="currentStep === 1" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ¿De dónde te mudas?
          </label>
          <input 
            ref="originInput"
            v-model="form.origin"
            @input="resetOriginPlace"
            type="text"
            autocomplete="street-address"
            placeholder="Empieza a escribir tu dirección"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ¿A dónde te mudas?
          </label>
          <input 
            ref="destinationInput"
            v-model="form.destination"
            @input="resetDestinationPlace"
            type="text"
            autocomplete="street-address"
            placeholder="Empieza a escribir tu dirección"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fecha de mudanza
          </label>
          <label class="flex items-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-xl bg-gradient-to-r from-white to-yellow-50 focus-within:ring-2 focus-within:ring-primary cursor-pointer">
            <span class="text-xl" aria-hidden="true">📅</span>
            <span class="flex-1">
              <span class="block text-xs text-gray-500">Elige el día que mejor te venga</span>
              <input
                v-model="form.date"
                :min="minimumDate"
                type="date"
                class="w-full bg-transparent font-semibold text-gray-800 focus:outline-none"
                required
              />
            </span>
          </label>
        </div>

        <div v-if="distanceKm !== null" class="flex items-center gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-900">
          <span class="text-xl" aria-hidden="true">🚚</span>
          <p><strong>{{ distanceKm }} km</strong> por carretera entre las dos direcciones.</p>
        </div>
        <p v-else-if="mapsReady" class="text-sm text-gray-500">Selecciona una sugerencia para calcular los kilómetros de la ruta.</p>
        <p v-else class="text-sm text-gray-500">Cargando el buscador de direcciones…</p>
      </div>

      <!-- Step 2: Property Details -->
      <div v-if="currentStep === 2" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Tipo de vivienda
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                v-model="form.propertyType"
                type="radio"
                value="piso"
                class="w-4 h-4"
              />
              <span class="ml-3 text-gray-700">Piso/Apartamento</span>
            </label>
            <label class="flex items-center">
              <input 
                v-model="form.propertyType"
                type="radio"
                value="casa"
                class="w-4 h-4"
              />
              <span class="ml-3 text-gray-700">Casa</span>
            </label>
            <label class="flex items-center">
              <input 
                v-model="form.propertyType"
                type="radio"
                value="oficina"
                class="w-4 h-4"
              />
              <span class="ml-3 text-gray-700">Oficina</span>
            </label>
          </div>
        </div>

        <div>
          <label class="flex items-center">
            <input 
              v-model="form.hasElevator"
              type="checkbox"
              class="w-4 h-4"
            />
            <span class="ml-3 text-gray-700">¿Tiene ascensor?</span>
          </label>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Número de pisos
          </label>
          <input 
            v-model.number="form.floors"
            type="number"
            min="1"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Metros cuadrados (aprox.)
          </label>
          <input 
            v-model.number="form.squareMeters"
            type="number"
            min="10"
            placeholder="150"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <!-- Step 3: Additional Services -->
      <div v-if="currentStep === 3" class="space-y-4">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">
          Servicios adicionales
        </h4>

        <label class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition">
          <input 
            v-model="form.needsPacking"
            type="checkbox"
            class="w-4 h-4"
          />
          <div class="ml-3">
            <span class="font-medium text-gray-700">Necesito embalaje</span>
            <p class="text-sm text-gray-500">Protección de objetos frágiles</p>
          </div>
        </label>

        <label class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition">
          <input 
            v-model="form.needsAssembly"
            type="checkbox"
            class="w-4 h-4"
          />
          <div class="ml-3">
            <span class="font-medium text-gray-700">Necesito montaje</span>
            <p class="text-sm text-gray-500">Armado de muebles en destino</p>
          </div>
        </label>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Información adicional (opcional)
          </label>
          <textarea 
            v-model="form.additionalInfo"
            placeholder="Cuéntanos más detalles..."
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tu email
          </label>
          <input 
            v-model="form.email"
            type="email"
            placeholder="tu@email.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de contacto
          </label>
          <input 
            v-model="form.phone"
            type="tel"
            placeholder="+34 600 000 000"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex gap-4 pt-6">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="previousStep"
          class="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Anterior
        </button>

        <button
          v-if="currentStep < 3"
          type="button"
          @click="nextStep"
          class="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Siguiente
        </button>

        <button
          v-if="currentStep === 3"
          type="submit"
          :disabled="isSubmitting"
          class="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
        >
          {{ isSubmitting ? 'Enviando...' : 'Obtener presupuestos' }}
        </button>
      </div>

      <p v-if="formError" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
        {{ formError }}
      </p>

      <!-- Success Message -->
      <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-700 font-semibold">
          ✓ {{ submissionNotice }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'

declare global {
  interface Window {
    google?: any
    __muvifyGoogleMapsLoaded?: () => void
  }
}

const currentStep = ref(1)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const submissionNotice = ref('')
const formError = ref('')
const mapsReady = ref(false)
const distanceKm = ref<number | null>(null)
const originInput = ref<HTMLInputElement | null>(null)
const destinationInput = ref<HTMLInputElement | null>(null)
const originPlaceId = ref('')
const destinationPlaceId = ref('')
const minimumDate = computed(() => new Date().toISOString().split('T')[0])

const form = reactive({
  origin: '',
  destination: '',
  date: '',
  propertyType: 'piso',
  hasElevator: false,
  floors: 1,
  squareMeters: 100,
  needsPacking: false,
  needsAssembly: false,
  additionalInfo: '',
  email: '',
  phone: ''
})

const resetOriginPlace = () => {
  originPlaceId.value = ''
  distanceKm.value = null
}

const resetDestinationPlace = () => {
  destinationPlaceId.value = ''
  distanceKm.value = null
}

const loadGoogleMaps = () => new Promise<void>((resolve, reject) => {
  if (window.google?.maps?.places) {
    resolve()
    return
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    reject(new Error('Google Maps no está configurado.'))
    return
  }

  const finishLoading = () => {
    if (window.google?.maps?.places) {
      resolve()
    } else {
      reject(new Error('Google Maps se cargó sin la biblioteca de direcciones.'))
    }
  }

  const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-maps]')
  if (existingScript) {
    existingScript.addEventListener('load', finishLoading, { once: true })
    existingScript.addEventListener('error', () => reject(new Error('No se pudo cargar Google Maps.')), { once: true })
    return
  }

  const script = document.createElement('script')
  script.dataset.googleMaps = 'true'
  window.__muvifyGoogleMapsLoaded = finishLoading
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es&region=ES&loading=async&callback=__muvifyGoogleMapsLoaded`
  script.async = true
  script.onerror = () => reject(new Error('No se pudo cargar Google Maps.'))
  document.head.appendChild(script)
})

const calculateDistance = () => {
  if (!originPlaceId.value || !destinationPlaceId.value || !window.google) return

  const directionsService = new window.google.maps.DirectionsService()
  directionsService.route(
    {
      origin: { placeId: originPlaceId.value },
      destination: { placeId: destinationPlaceId.value },
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result: any, status: string) => {
      if (status !== 'OK' || !result?.routes?.[0]) {
        distanceKm.value = null
        return
      }

      const meters = result.routes[0].legs.reduce(
        (total: number, leg: { distance?: { value?: number } }) => total + (leg.distance?.value ?? 0),
        0,
      )
      distanceKm.value = Math.round((meters / 1000) * 10) / 10
    },
  )
}

const initialiseAutocomplete = () => {
  if (!originInput.value || !destinationInput.value || !window.google) return

  const options = {
    types: ['address'],
    componentRestrictions: { country: 'es' },
    fields: ['formatted_address', 'place_id'],
  }
  const originAutocomplete = new window.google.maps.places.Autocomplete(originInput.value, options)
  const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInput.value, options)

  originAutocomplete.addListener('place_changed', () => {
    const place = originAutocomplete.getPlace()
    form.origin = place.formatted_address ?? originInput.value?.value ?? ''
    originPlaceId.value = place.place_id ?? ''
    distanceKm.value = null
    calculateDistance()
  })
  destinationAutocomplete.addListener('place_changed', () => {
    const place = destinationAutocomplete.getPlace()
    form.destination = place.formatted_address ?? destinationInput.value?.value ?? ''
    destinationPlaceId.value = place.place_id ?? ''
    distanceKm.value = null
    calculateDistance()
  })
}

onMounted(async () => {
  try {
    await loadGoogleMaps()
    await nextTick()
    initialiseAutocomplete()
    mapsReady.value = true
  } catch (error) {
    console.error('Google Maps setup error:', error)
    formError.value = 'El buscador de direcciones no está disponible ahora. Puedes escribir tu dirección manualmente.'
  }
})

const validateCurrentStep = () => {
  formError.value = ''
  if (currentStep.value === 1) {
    if (!form.origin || !form.destination || !form.date) {
      formError.value = 'Indica origen, destino y fecha para continuar.'
      return false
    }
    if (mapsReady.value && (!originPlaceId.value || !destinationPlaceId.value)) {
      formError.value = 'Elige una dirección de las sugerencias de Google para calcular la ruta.'
      return false
    }
  }
  if (currentStep.value === 3 && (!form.email || !form.phone)) {
    formError.value = 'Necesitamos tu email y teléfono para enviarte los presupuestos.'
    return false
  }
  return true
}

const nextStep = () => {
  if (currentStep.value < 3 && validateCurrentStep()) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const quoteSummary = () => [
  'Hola Muvify Express, acabo de solicitar un presupuesto:',
  `Origen: ${form.origin}`,
  `Destino: ${form.destination}`,
  `Distancia: ${distanceKm.value === null ? 'Pendiente de cálculo' : `${distanceKm.value} km`}`,
  `Fecha: ${form.date}`,
  `Vivienda: ${form.propertyType}`,
  `Ascensor: ${form.hasElevator ? 'Sí' : 'No'}`,
  `Pisos: ${form.floors}`,
  `Metros cuadrados: ${form.squareMeters} m²`,
  `Embalaje: ${form.needsPacking ? 'Sí' : 'No'}`,
  `Montaje: ${form.needsAssembly ? 'Sí' : 'No'}`,
  `Información adicional: ${form.additionalInfo || 'No indicada'}`,
  `Cliente: ${form.email} · ${form.phone}`,
].join('\n')

const openWhatsApp = (whatsappTab: Window | null) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '34667527326'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteSummary())}`
  if (whatsappTab) {
    whatsappTab.location.href = whatsappUrl
  } else {
    window.location.assign(whatsappUrl)
  }
}

const submitForm = async () => {
  if (!validateCurrentStep()) return
  isSubmitting.value = true
  formError.value = ''
  const whatsappTab = window.open('', '_blank')

  try {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, distanceKm: distanceKm.value }),
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload.error || 'No se pudo enviar la solicitud.')

    openWhatsApp(whatsappTab)
    submissionNotice.value = 'Solicitud enviada. Se ha abierto WhatsApp con el resumen listo para que lo envíes. Te llamaremos en breve.'
    showSuccess.value = true
  } catch (error) {
    console.error('Quote submission error:', error)
    openWhatsApp(whatsappTab)
    submissionNotice.value = 'Se ha abierto WhatsApp con tu solicitud. El email no se pudo confirmar todavía, pero al enviar el WhatsApp recibiremos todos tus datos.'
    showSuccess.value = true
    formError.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>
