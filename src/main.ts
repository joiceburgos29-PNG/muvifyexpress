import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import './index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// Restore session
const authStore = useAuthStore()
authStore.restoreSession()

app.use(router)

app.mount('#app')
