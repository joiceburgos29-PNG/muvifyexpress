import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/client',
    redirect: '/client/dashboard',
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/dashboard',
    name: 'ClientDashboard',
    component: () => import('../views/client/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/requests',
    name: 'ClientRequests',
    component: () => import('../views/client/Requests.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/requests/:id',
    name: 'ClientRequestDetail',
    component: () => import('../views/client/RequestDetail.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/quotes/:requestId',
    name: 'ClientQuotesComparison',
    component: () => import('../views/client/QuotesComparison.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/messages/:requestId',
    name: 'ClientMessages',
    component: () => import('../views/client/Messages.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/client/bookings',
    name: 'ClientBookings',
    component: () => import('../views/client/Bookings.vue'),
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/company',
    redirect: '/company/dashboard',
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/dashboard',
    name: 'CompanyDashboard',
    component: () => import('../views/company/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/requests',
    name: 'CompanyRequests',
    component: () => import('../views/company/Requests.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/requests/:id',
    name: 'CompanyRequestDetail',
    component: () => import('../views/company/RequestDetail.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/quotes',
    name: 'CompanyQuotes',
    component: () => import('../views/company/Quotes.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/calendar',
    name: 'CompanyCalendar',
    component: () => import('../views/company/Calendar.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/company/analytics',
    name: 'CompanyAnalytics',
    component: () => import('../views/company/Analytics.vue'),
    meta: { requiresAuth: true, role: 'company' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }

    const requiredRole = to.meta.role as string
    if (requiredRole && authStore.user?.role !== requiredRole) {
      next('/')
      return
    }
  }

  next()
})

export default router
