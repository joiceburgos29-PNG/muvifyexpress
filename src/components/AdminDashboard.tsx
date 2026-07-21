import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Percent, Receipt, BarChart3, FileText, Euro, TrendingUp, Truck,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const tabs = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'companies', label: 'Empresas', icon: Building2 },
  { id: 'commissions', label: 'Comisiones', icon: Percent },
  { id: 'billing', label: 'Facturación', icon: Receipt },
  { id: 'analytics', label: 'Analítica', icon: BarChart3 },
  { id: 'reports', label: 'Reportes', icon: FileText },
];

const users = [
  { name: 'Ana García', email: 'ana@email.com', role: 'Cliente', status: 'Activo', joined: 'Ene 2024' },
  { name: 'Mudanzas García', email: 'info@mudanzasgarcia.es', role: 'Empresa', status: 'Verificada', joined: 'Dic 2023' },
  { name: 'Luis Rodríguez', email: 'luis@email.com', role: 'Cliente', status: 'Activo', joined: 'Feb 2024' },
  { name: 'Express Logistics', email: 'hola@expresslogistics.es', role: 'Empresa', status: 'Pendiente', joined: 'Mar 2024' },
];

const companies = [
  { name: 'Mudanzas García', city: 'Madrid', moves: 312, rating: 4.9, revenue: '24.500 €', status: 'Activa' },
  { name: 'Express Logistics', city: 'Barcelona', moves: 198, rating: 4.7, revenue: '15.200 €', status: 'Activa' },
  { name: 'Muvify Pro', city: 'Valencia', moves: 245, rating: 4.8, revenue: '19.800 €', status: 'Activa' },
  { name: 'Rápido Mudo', city: 'Sevilla', moves: 87, rating: 4.5, revenue: '6.100 €', status: 'Suspendida' },
];

const statusStyles: Record<string, string> = {
  Activo: 'bg-green-100 text-green-700',
  Activa: 'bg-green-100 text-green-700',
  Verificada: 'bg-blue-100 text-blue-700',
  Pendiente: 'bg-brand-yellow-light/30 text-brand-yellow-dark',
  Suspendida: 'bg-red-100 text-red-700',
};

type AdminDashboardProps = {
  onBack: () => void;
};

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [active, setActive] = useState('overview');

  return (
    <DashboardLayout
      title="Panel de administración"
      subtitle="Supervisión global de la plataforma Muvify Express"
      role="Admin"
      onBack={onBack}
      active={active}
      onTabChange={setActive}
      tabs={tabs}
    >
      {active === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Usuarios totales', value: '12.480', icon: Users, color: 'bg-blue-50 text-blue-600' },
              { label: 'Empresas activas', value: '342', icon: Building2, color: 'bg-brand-yellow/15 text-brand-yellow-dark' },
              { label: 'Comisión mensual', value: '48.200 €', icon: Percent, color: 'bg-brand-navy/10 text-brand-navy' },
              { label: 'Mudanzas / mes', value: '1.840', icon: Truck, color: 'bg-green-50 text-green-600' },
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

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-bold text-brand-navy mb-6">Crecimiento mensual</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {[50, 65, 55, 80, 70, 90, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-brand-navy to-brand-navy-light"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-xs text-brand-navy/40 font-semibold">
                      {['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-bold text-brand-navy mb-6">Distribución por ciudad</h3>
              <div className="space-y-4">
                {[
                  { city: 'Madrid', pct: 38 },
                  { city: 'Barcelona', pct: 28 },
                  { city: 'Valencia', pct: 18 },
                  { city: 'Sevilla', pct: 10 },
                  { city: 'Otros', pct: 6 },
                ].map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-brand-navy">{c.city}</span>
                      <span className="text-brand-navy/50">{c.pct}%</span>
                    </div>
                    <div className="h-2 bg-brand-bg rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-yellow to-brand-yellow-light rounded-full"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {active === 'users' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Nombre</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Rol</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{u.email}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{u.role}</td>
                  <td className="px-6 py-4"><span className={`badge ${statusStyles[u.status]}`}>{u.status}</span></td>
                  <td className="px-6 py-4 text-sm text-brand-navy/60">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'companies' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Empresa</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Ciudad</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Mudanzas</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Valoración</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Ingresos</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((c, i) => (
                <tr key={i} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{c.city}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{c.moves}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">★ {c.rating}</td>
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{c.revenue}</td>
                  <td className="px-6 py-4"><span className={`badge ${statusStyles[c.status]}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'commissions' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Comisión total', value: '48.200 €', icon: Euro },
              { label: 'Tasa media', value: '8.5%', icon: Percent },
              { label: 'Cobro pendiente', value: '6.340 €', icon: TrendingUp },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="w-11 h-11 rounded-xl bg-brand-yellow/15 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-yellow-dark" />
                  </div>
                  <p className="text-3xl font-extrabold text-brand-navy">{s.value}</p>
                  <p className="text-sm text-brand-navy/60 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-bold text-brand-navy mb-4">Comisiones por empresa (top 5)</h3>
            <div className="space-y-3">
              {[
                { name: 'Mudanzas García', amount: 1960 },
                { name: 'Muvify Pro', amount: 1584 },
                { name: 'Express Logistics', amount: 1216 },
                { name: 'Rápido Mudo', amount: 488 },
                { name: 'Mudanzas León', amount: 412 },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-brand-bg">
                  <span className="font-semibold text-brand-navy text-sm">{c.name}</span>
                  <span className="font-bold text-brand-navy">{c.amount} €</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'billing' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Factura</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Concepto</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Importe</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: 'FAC-001', concept: 'Comisión Mudanzas García', amount: 1960, date: 'Mar 2024', status: 'Pagada' },
                { id: 'FAC-002', concept: 'Comisión Muvify Pro', amount: 1584, date: 'Mar 2024', status: 'Pagada' },
                { id: 'FAC-003', concept: 'Comisión Express Logistics', amount: 1216, date: 'Mar 2024', status: 'Pendiente' },
                { id: 'FAC-004', concept: 'Comisión Rápido Mudo', amount: 488, date: 'Feb 2024', status: 'Pagada' },
              ].map((f) => (
                <tr key={f.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{f.id}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{f.concept}</td>
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{f.amount} €</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/60">{f.date}</td>
                  <td className="px-6 py-4"><span className={`badge ${statusStyles[f.status] || 'bg-gray-100 text-gray-700'}`}>{f.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === 'analytics' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Mudanzas totales', value: '18.420', change: '+24%' },
              { label: 'Valor medio', value: '540 €', change: '+8%' },
              { label: 'Tiempo respuesta', value: '14h', change: '-22%' },
              { label: 'Satisfacción', value: '4.8/5', change: '+0.3' },
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
            <h3 className="font-bold text-brand-navy mb-6">Volumen de mudanzas (12 meses)</h3>
            <div className="flex items-end justify-between gap-2 h-56">
              {[45, 52, 60, 48, 70, 82, 75, 90, 85, 95, 88, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-yellow/40 to-brand-yellow hover:from-brand-yellow hover:to-brand-yellow-light transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-brand-navy/40 font-semibold">
                    {['A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'E', 'F', 'M'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'reports' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Reporte mensual', desc: 'Resumen de actividad de la plataforma', date: 'Mar 2024' },
            { title: 'Reporte financiero', desc: 'Ingresos, comisiones y facturación', date: 'Mar 2024' },
            { title: 'Reporte de empresas', desc: 'Rendimiento y valoraciones', date: 'Mar 2024' },
            { title: 'Reporte de usuarios', desc: 'Crecimiento y retención', date: 'Mar 2024' },
            { title: 'Reporte operativo', desc: 'Tiempos y eficiencia', date: 'Mar 2024' },
            { title: 'Reporte anual', desc: 'Balance completo 2024', date: '2024' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card-hover transition-all">
              <div className="w-11 h-11 rounded-xl bg-brand-navy/10 flex items-center justify-center mb-4">
                <FileText size={20} className="text-brand-navy" />
              </div>
              <h4 className="font-bold text-brand-navy mb-1">{r.title}</h4>
              <p className="text-sm text-brand-navy/60 mb-4">{r.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-navy/50 font-semibold">{r.date}</span>
                <button className="text-sm font-bold text-brand-yellow-dark hover:text-brand-navy transition-colors">
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
