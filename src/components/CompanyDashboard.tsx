import { useState } from 'react';
import {
  LayoutDashboard, Inbox, Send, Calendar, Users, BarChart3, TrendingUp, Euro, Clock, MapPin,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const tabs = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'new', label: 'Nuevas solicitudes', icon: Inbox },
  { id: 'sent', label: 'Presupuestos enviados', icon: Send },
  { id: 'calendar', label: 'Calendario', icon: Calendar },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
];

const newRequests = [
  { id: 'MUV-2410', route: 'Madrid → Barcelona', date: '15 Mar', volume: '30 m³', client: 'Ana G.' },
  { id: 'MUV-2411', route: 'Sevilla → Málaga', date: '17 Mar', volume: '20 m³', client: 'Luis R.' },
  { id: 'MUV-2412', route: 'Valencia → Madrid', date: '20 Mar', volume: '45 m³', client: 'Marta P.' },
];

const sentQuotes = [
  { id: 'PRES-001', client: 'Carlos V.', route: 'Madrid → Bilbao', price: 540, status: 'Pendiente' },
  { id: 'PRES-002', client: 'Elena F.', route: 'Madrid → Toledo', price: 280, status: 'Aceptada' },
  { id: 'PRES-003', client: 'Javier M.', route: 'Madrid → Alicante', price: 620, status: 'Rechazada' },
];

const statusStyles: Record<string, string> = {
  Pendiente: 'bg-brand-yellow-light/30 text-brand-yellow-dark',
  Aceptada: 'bg-green-100 text-green-700',
  Rechazada: 'bg-red-100 text-red-700',
  Confirmada: 'bg-blue-100 text-blue-700',
};

const calendarDays = [
  { day: 15, event: 'Madrid → Bilbao', type: 'bg-brand-yellow' },
  { day: 18, event: 'Carga Toledo', type: 'bg-blue-500' },
  { day: 22, event: 'Madrid → Alicante', type: 'bg-brand-yellow' },
  { day: 25, event: 'Devolución furgón', type: 'bg-brand-navy' },
];

type CompanyDashboardProps = {
  onBack: () => void;
};

export default function CompanyDashboard({ onBack }: CompanyDashboardProps) {
  const [active, setActive] = useState('overview');

  return (
    <DashboardLayout
      title="Panel de empresa"
      subtitle="Gestiona solicitudes, presupuestos y calendario"
      role="Empresa"
      onBack={onBack}
      active={active}
      onTabChange={setActive}
      tabs={tabs}
    >
      {active === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Nuevas solicitudes', value: '3', icon: Inbox, color: 'bg-brand-yellow/15 text-brand-yellow-dark' },
              { label: 'Presupuestos enviados', value: '12', icon: Send, color: 'bg-blue-50 text-blue-600' },
              { label: 'Tasa de aceptación', value: '68%', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
              { label: 'Ingresos del mes', value: '8.450 €', icon: Euro, color: 'bg-brand-navy/10 text-brand-navy' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-soft p-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-extrabold text-brand-navy">{s.value}</p>
                  <p className="text-sm text-brand-navy/60 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-bold text-brand-navy mb-4">Próximas mudanzas</h3>
            <div className="space-y-3">
              {calendarDays.map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-brand-bg">
                  <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-brand-navy/50 font-semibold">MAR</span>
                    <span className="font-extrabold text-brand-navy">{c.day}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <span className={`w-2 h-2 rounded-full ${c.type}`} />
                    <span className="text-sm font-semibold text-brand-navy">{c.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'new' && (
        <div className="space-y-4">
          {newRequests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-brand-navy">{r.route}</span>
                  <span className="badge bg-brand-yellow/15 text-brand-yellow-dark">Nueva</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-brand-navy/50">
                  <span>{r.id}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {r.volume}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {r.date}</span>
                  <span>·</span>
                  <span>{r.client}</span>
                </div>
              </div>
              <button className="btn-primary text-sm">Enviar presupuesto</button>
            </div>
          ))}
        </div>
      )}

      {active === 'sent' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Ruta</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Precio</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sentQuotes.map((q) => (
                <tr key={q.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{q.id}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{q.client}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{q.route}</td>
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{q.price} €</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusStyles[q.status]}`}>{q.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'calendar' && (
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
              <div key={d} className="text-center text-xs font-bold text-brand-navy/40 py-2">{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const event = calendarDays.find((c) => c.day === day);
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl p-2 flex flex-col text-sm font-semibold ${
                    event ? 'bg-brand-bg' : 'bg-gray-50'
                  }`}
                >
                  <span className={event ? 'text-brand-navy' : 'text-brand-navy/40'}>{day}</span>
                  {event && (
                    <div className="mt-auto">
                      <span className={`block w-1.5 h-1.5 rounded-full ${event.type}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {active === 'clients' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Mudanzas</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Valoración</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Ingresos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Carlos V.', moves: 3, rating: 5.0, rev: 1620 },
                { name: 'Elena F.', moves: 1, rating: 4.5, rev: 280 },
                { name: 'Javier M.', moves: 2, rating: 4.0, rev: 940 },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{c.moves}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">★ {c.rating}</td>
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{c.rev} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'stats' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Mudanzas este mes', value: '24', change: '+12%' },
              { label: 'Ticket medio', value: '520 €', change: '+5%' },
              { label: 'Valoración media', value: '4.8', change: '+0.2' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-soft p-6">
                <p className="text-sm text-brand-navy/60 font-medium mb-2">{s.label}</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-extrabold text-brand-navy">{s.value}</p>
                  <span className="text-sm font-bold text-green-600 pb-1">{s.change}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-bold text-brand-navy mb-6">Mudanzas por mes</h3>
            <div className="flex items-end justify-between gap-2 h-48">
              {[40, 55, 35, 70, 60, 85, 75, 90, 65, 80, 95, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-yellow/40 to-brand-yellow transition-all duration-300 hover:from-brand-yellow hover:to-brand-yellow-light"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-brand-navy/40 font-semibold">
                    {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
