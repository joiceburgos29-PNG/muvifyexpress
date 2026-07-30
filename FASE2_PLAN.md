# Muvify Express 2.0 - Fase 2: Área Cliente y Dashboard de Empresas

## 📋 Descripción General

La Fase 2 construye el sistema de gestión de usuarios para clientes y empresas. Este es el corazón del negocio donde ocurren las transacciones, comunicaciones y relaciones.

---

## 🎯 Objetivos Principales

### Para Clientes
1. Ver historial de todas sus solicitudes de presupuestos
2. Recibir y comparar presupuestos de empresas
3. Comunicarse directamente con empresas
4. Reservar y gestionar mudanzas
5. Acceder a facturas y comprobantes

### Para Empresas
1. Recibir solicitudes de nuevos clientes potenciales
2. Enviar presupuestos competitivos
3. Gestionar calendario de mudanzas
4. Comunicarse con clientes
5. Ver estadísticas y valoraciones

---

## 🗄️ Schema de Base de Datos

### Tablas Necesarias

```sql
-- Users (Clientes)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  phone VARCHAR,
  avatar_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  role ENUM ('client', 'company', 'admin') DEFAULT 'client'
);

-- Companies (Empresas de mudanzas)
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  company_name VARCHAR NOT NULL,
  description TEXT,
  logo_url VARCHAR,
  website VARCHAR,
  phone VARCHAR NOT NULL,
  address VARCHAR,
  city VARCHAR,
  postal_code VARCHAR,
  verified BOOLEAN DEFAULT FALSE,
  insurance_number VARCHAR,
  avg_rating FLOAT DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quote Requests (Solicitudes de presupuesto)
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  origin_address VARCHAR NOT NULL,
  destination_address VARCHAR NOT NULL,
  origin_city VARCHAR,
  destination_city VARCHAR,
  moving_date DATE NOT NULL,
  property_type ENUM ('apartment', 'house', 'office') NOT NULL,
  has_elevator BOOLEAN,
  floors INTEGER,
  square_meters INTEGER,
  needs_packing BOOLEAN,
  needs_assembly BOOLEAN,
  additional_info TEXT,
  status ENUM ('pending', 'quoted', 'booked', 'completed', 'cancelled') DEFAULT 'pending',
  estimated_volume FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotes (Presupuestos)
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  request_id UUID REFERENCES quote_requests(id),
  company_id UUID REFERENCES companies(id),
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR DEFAULT 'EUR',
  estimated_duration_hours INTEGER,
  included_services TEXT[],
  additional_services TEXT[],
  notes TEXT,
  expires_at TIMESTAMP,
  status ENUM ('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages (Conversaciones)
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  request_id UUID REFERENCES quote_requests(id),
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  attachment_url VARCHAR,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews (Opiniones)
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  client_id UUID REFERENCES users(id),
  quote_id UUID REFERENCES quotes(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR,
  comment TEXT,
  verified_booking BOOLEAN DEFAULT TRUE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings (Reservas)
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id),
  client_id UUID REFERENCES users(id),
  company_id UUID REFERENCES companies(id),
  status ENUM ('confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'confirmed',
  paid BOOLEAN DEFAULT FALSE,
  payment_method VARCHAR,
  total_amount DECIMAL(10, 2),
  final_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Autenticación

### Stack Recomendado
- **Supabase Auth** con JWT
- Row Level Security (RLS) en Pinia store

### Flow de Login

```
1. Usuario completa email y contraseña
2. Envía a endpoint /auth/login
3. Supabase retorna JWT token
4. Token se guarda en localStorage + Pinia store
5. Se establece Authorization header en Axios
6. Redirect a dashboard según rol (client/company)
```

### Protected Routes

```typescript
// router/middleware.ts
- /client/* → Solo clientes autenticados
- /company/* → Solo empresas autenticadas
- /admin/* → Solo administradores
```

---

## 📱 Interfaces (Vistas)

### Client Area

#### `/client/dashboard`
- **Componentes:**
  - StatisticsCards (solicitudes, presupuestos, ahorrados)
  - RecentRequestsTable
  - ActiveQuotesCard
  - NextMoveCard
- **Estado Pinia:** `clientStore`

#### `/client/requests`
- **Componentes:**
  - RequestsTable (historial completo)
  - FilterBar (estado, fecha, ciudad)
  - RequestDetail modal
- **Acciones:** Ver detalles, crear nueva solicitud

#### `/client/quotes/:requestId`
- **Componentes:**
  - QuotesComparator (tabla comparativa)
  - QuoteCard (detalle individual)
  - AcceptButton / RejectButton
- **Funcionalidad:** Comparar hasta 3 presupuestos lado a lado

#### `/client/messages/:requestId`
- **Componentes:**
  - MessageThread
  - MessageInput
  - CompanyCard
- **Funcionalidad:** Chat en tiempo real con empresa

#### `/client/bookings`
- **Componentes:**
  - BookingsTimeline
  - BookingDetail modal
  - DownloadInvoice button
- **Funcionalidad:** Seguimiento de mudanzas confirmadas

---

### Company Area

#### `/company/dashboard`
- **Componentes:**
  - StatisticsCards (solicitudes, presupuestos, conversión)
  - IncomingRequests
  - RecentQuotes
  - ReviewsWidget
- **Estado Pinia:** `companyStore`

#### `/company/requests`
- **Componentes:**
  - RequestsTable (filtrable)
  - RequestDetail drawer
  - ActionButtons (aceptar, rechazar, enviar presupuesto)
- **Funcionalidad:** Gestionar nuevas oportunidades

#### `/company/quotes`
- **Componentes:**
  - QuotesHistory
  - QuoteEditor (crear/editar presupuesto)
  - StatusFilter
- **Funcionalidad:** Gestionar todos los presupuestos

#### `/company/calendar`
- **Componentes:**
  - CalendarView (mes/semana/día)
  - EventDetail modal
  - ScheduleForm
- **Funcionalidad:** Gestionar mudanzas confirmadas

#### `/company/analytics`
- **Componentes:**
  - ConversionChart (solicitudes → quotes → bookings)
  - RevenueChart
  - TopCitiesChart
  - AvgRatingWidget
- **Funcionalidad:** Analytics completos

#### `/company/reviews`
- **Componentes:**
  - ReviewsList
  - ReviewDetail modal
  - ResponseForm
- **Funcionalidad:** Gestionar opiniones

---

## 🎮 Componentes Reutilizables

```
src/components/
├── Common/
│   ├── Navbar.vue (actualizado con user menu)
│   ├── Sidebar.vue (para dashboards)
│   ├── Card.vue
│   ├── Modal.vue
│   ├── Button.vue
│   ├── Input.vue
│   ├── Table.vue
│   └── Avatar.vue
├── Client/
│   ├── ClientLayout.vue
│   ├── RequestCard.vue
│   ├── QuoteComparator.vue
│   └── MessageThread.vue
├── Company/
│   ├── CompanyLayout.vue
│   ├── RequestCard.vue
│   ├── QuoteEditor.vue
│   └── Calendar.vue
└── Admin/
    └── (placeholder)
```

---

## 🛣️ Rutas Nuevas

```typescript
// Client Routes
/client/dashboard
/client/requests
/client/requests/:id
/client/quotes/:requestId
/client/messages/:requestId
/client/bookings
/client/invoices
/client/profile
/client/settings

// Company Routes
/company/dashboard
/company/requests
/company/requests/:id
/company/quotes
/company/calendar
/company/analytics
/company/reviews
/company/profile
/company/settings

// Shared Routes
/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password/:token
/auth/logout

// Admin Routes (future)
/admin/dashboard
/admin/users
/admin/companies
/admin/disputes
```

---

## 🔄 Flujo de Datos Principales

### Flujo 1: Cliente solicita presupuesto
```
1. Cliente completa QuoteForm (Fase 1)
2. Se guarda en BD: quote_requests
3. Se notifica a empresas relevantes
4. Empresas reciben en dashboard
5. Empresas envían quotes
6. Cliente recibe notificaciones
7. Cliente compara presupuestos
8. Cliente elige empresa
9. Se crea booking
10. Se confirma y inicia mudanza
```

### Flujo 2: Empresa gestiona su negocio
```
1. Empresa ve solicitudes entrantes
2. Evalúa y decide participar
3. Envía presupuesto competitivo
4. Espera respuesta de cliente
5. Si es aceptada, marca como booking
6. Gestiona en calendario
7. Completa mudanza
8. Cliente deja review
9. Empresa responde
```

---

## 🚀 Implementación por Etapas

### Etapa 1: Autenticación y Setup (1-2 semanas)
- Supabase Auth setup
- Login/Register flow
- Protected routes
- User store (Pinia)

### Etapa 2: Client Dashboard (2-3 semanas)
- Dashboard principal
- Requests lista
- Quotes comparador
- Messages básico

### Etapa 3: Company Dashboard (2-3 semanas)
- Dashboard principal
- Requests lista
- Quotes editor
- Calendar básico

### Etapa 4: Comunicaciones (1-2 semanas)
- Chat en tiempo real (Socket.io o Supabase Realtime)
- Notificaciones
- Emails

### Etapa 5: Polish (1 semana)
- Reviews y ratings
- Analytics
- Bug fixes
- Optimizaciones

**Tiempo total estimado:** 4-5 semanas

---

## 📊 Pinia Stores Necesarios

```typescript
// stores/authStore.ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    login(email, password),
    register(data),
    logout(),
  }
});

// stores/clientStore.ts
export const useClientStore = defineStore('client', {
  state: () => ({
    requests: [],
    quotes: [],
    bookings: [],
    messages: [],
  }),
  actions: {
    fetchRequests(),
    createRequest(data),
    fetchQuotes(requestId),
    acceptQuote(quoteId),
  }
});

// stores/companyStore.ts
export const useCompanyStore = defineStore('company', {
  state: () => ({
    incomingRequests: [],
    quotes: [],
    bookings: [],
    analytics: {},
  }),
  actions: {
    fetchIncomingRequests(),
    submitQuote(requestId, data),
    fetchAnalytics(),
  }
});
```

---

## 🔗 API Endpoints (Backend)

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
POST   /api/auth/refresh

GET    /api/client/dashboard
GET    /api/client/requests
GET    /api/client/requests/:id
GET    /api/client/quotes/:requestId
POST   /api/client/quotes/:quoteId/accept
POST   /api/client/quotes/:quoteId/reject

GET    /api/company/dashboard
GET    /api/company/requests
GET    /api/company/requests/:id/claim
POST   /api/company/quotes
PUT    /api/company/quotes/:id
GET    /api/company/calendar
GET    /api/company/analytics
GET    /api/company/reviews

GET    /api/messages/:threadId
POST   /api/messages/:threadId
```

---

## 🎨 Design Considerations

- **Mobile responsiveness:** Critical para clientes en mudanza
- **Accessibility:** WCAG 2.1 AA
- **Performance:** Lazy load dashboards grandes
- **Real-time:** Notificaciones instantáneas

---

## ✅ Checklist de Inicio Fase 2

- [ ] Supabase project setup + RLS policies
- [ ] Database schema implementado
- [ ] API backend básico (Node.js/Express)
- [ ] Auth flow funcional
- [ ] Client store (Pinia)
- [ ] Company store (Pinia)
- [ ] Client dashboard layout
- [ ] Company dashboard layout
- [ ] Requests list component
- [ ] Quotes comparador
- [ ] Unit tests básicos
- [ ] Deployment preview

---

**Próximo paso:** Empezar con Supabase Auth setup + Database schema

---

Versión: 2.0.0 | Fecha: 30/07/2024
