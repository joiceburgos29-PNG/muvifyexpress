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
            v-model="form.origin"
            type="text"
            placeholder="Dirección de origen"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ¿A dónde te mudas?
          </label>
          <input 
            v-model="form.destination"
            type="text"
            placeholder="Dirección de destino"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fecha de mudanza
          </label>
          <input 
            v-model="form.date"
            type="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
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

      <!-- Success Message -->
      <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-700 font-semibold">
          ✓ Presupuesto solicitado correctamente. Te contactaremos en breve.
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'

const currentStep = ref(1)
const isSubmitting = ref(false)
const showSuccess = ref(false)

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

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    // Here you would send the form data to your backend
    console.log('[v0] Form data:', form)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      currentStep.value = 1
      Object.keys(form).forEach(key => {
        if (typeof form[key as keyof typeof form] === 'string') {
          form[key as keyof typeof form] = ''
        } else if (typeof form[key as keyof typeof form] === 'boolean') {
          form[key as keyof typeof form] = false
        }
      })
    }, 3000)
  } catch (error) {
    console.error('[v0] Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>
