import { useState } from 'react';
import {
  LayoutDashboard, FileText, Inbox, MessageSquare, Receipt, Clock, CheckCircle2, XCircle, Euro,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const tabs = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'requests', label: 'Solicitudes', icon: FileText },
  { id: 'quotes', label: 'Presupuestos', icon: Inbox },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'invoices', label: 'Facturas', icon: Receipt },
];

const requests = [
  { id: 'MUV-2401', route: 'Madrid → Barcelona', date: '12 Mar', status: 'Pendiente', quotes: 2 },
  { id: 'MUV-2402', route: 'Valencia → Sevilla', date: '18 Mar', status: 'Aceptada', quotes: 3 },
  { id: 'MUV-2403', route: 'Bilbao → Madrid', date: '22 Mar', status: 'Completada', quotes: 3 },
];

const quotes = [
  { company: 'Mudanzas García', price: 480, time: '1 día', rating: 4.9, status: 'Recibido' },
  { company: 'Express Logistics', price: 520, time: '1-2 días', rating: 4.7, status: 'Recibido' },
  { company: 'Muvify Pro', price: 610, time: '1 día', rating: 4.8, status: 'Recibido' },
];

const invoices = [
  { id: 'FAC-2024-011', company: 'Mudanzas García', amount: 480, date: '12 Mar 2024', status: 'Pagada' },
  { id: 'FAC-2024-010', company: 'Express Logistics', amount: 350, date: '02 Mar 2024', status: 'Pagada' },
  { id: 'FAC-2024-009', company: 'Muvify Pro', amount: 720, date: '18 Feb 2024', status: 'Pendiente' },
];

const statusStyles: Record<string, string> = {
  Pendiente: 'bg-brand-yellow-light/30 text-brand-yellow-dark',
  Aceptada: 'bg-green-100 text-green-700',
  Completada: 'bg-brand-navy/10 text-brand-navy',
  Recibido: 'bg-blue-100 text-blue-700',
  Pagada: 'bg-green-100 text-green-700',
};

type ClientDashboardProps = {
  onBack: () => void;
};

export default function ClientDashboard({ onBack }: ClientDashboardProps) {
  const [active, setActive] = useState('overview');

  return (
    <DashboardLayout
      title="Panel del cliente"
      subtitle="Gestiona tus solicitudes, presupuestos y facturas"
      role="Cliente"
      onBack={onBack}
      active={active}
      onTabChange={setActive}
      tabs={tabs}
    >
      {active === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solicitudes activas', value: '2', icon: FileText, color: 'bg-blue-50 text-blue-600' },
              { label: 'Presupuestos recibidos', value: '5', icon: Inbox, color: 'bg-brand-yellow/15 text-brand-yellow-dark' },
              { label: 'Mudanzas completadas', value: '7', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
              { label: 'Gasto total', value: '4.180 €', icon: Euro, color: 'bg-brand-navy/10 text-brand-navy' },
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
            <h3 className="font-bold text-brand-navy mb-4">Solicitudes recientes</h3>
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-brand-bg">
                  <div>
                    <p className="font-bold text-brand-navy text-sm">{r.route}</p>
                    <p className="text-xs text-brand-navy/50">{r.id} · {r.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-brand-navy/50">{r.quotes} presupuestos</span>
                    <span className={`badge ${statusStyles[r.status]}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === 'requests' && (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-brand-navy">{r.route}</span>
                  <span className={`badge ${statusStyles[r.status]}`}>{r.status}</span>
                </div>
                <p className="text-sm text-brand-navy/50">{r.id} · Fecha: {r.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand-navy/60">{r.quotes} presupuestos</span>
                <button className="btn-secondary text-sm py-2">Ver detalles</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {active === 'quotes' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card-hover transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-brand-navy">{q.company}</h4>
                  <p className="text-sm text-brand-navy/50">★ {q.rating} · {q.time}</p>
                </div>
                <span className={`badge ${statusStyles[q.status]}`}>{q.status}</span>
              </div>
              <p className="text-3xl font-extrabold text-brand-navy mb-4">{q.price} €</p>
              <button className="btn-primary w-full justify-center text-sm">Elegir empresa</button>
            </div>
          ))}
        </div>
      )}

      {active === 'chat' && (
        <div className="bg-white rounded-2xl shadow-soft p-6 h-[500px] flex flex-col">
          <div className="flex-1 space-y-4 overflow-auto">
            <div className="flex justify-start">
              <div className="bg-brand-bg rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%]">
                <p className="text-sm text-brand-navy">Hola, ¿podrían confirmar el horario de llegada para el día 18?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-brand-yellow rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                <p className="text-sm text-brand-navy font-medium">Claro, llegaremos entre las 8:00 y las 9:00. ¿Le va bien?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-brand-bg rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%]">
                <p className="text-sm text-brand-navy">Perfecto, gracias.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <input className="input-field" placeholder="Escribe un mensaje..." />
            <button className="btn-primary px-4">Enviar</button>
          </div>
        </div>
      )}

      {active === 'invoices' && (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Factura</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Empresa</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Importe</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-navy/60 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{inv.id}</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/70">{inv.company}</td>
                  <td className="px-6 py-4 font-bold text-brand-navy text-sm">{inv.amount} €</td>
                  <td className="px-6 py-4 text-sm text-brand-navy/60">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusStyles[inv.status]}`}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
