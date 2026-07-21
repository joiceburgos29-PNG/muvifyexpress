import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '0',
    period: 'Gratis',
    desc: 'Para clientes que quieren comparar sin compromiso.',
    features: [
      'Hasta 3 presupuestos',
      'Empresas verificadas',
      'Chat con empresas',
      'Sin comisión',
    ],
    cta: 'Empezar gratis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '19',
    period: '/ mes',
    desc: 'Para empresas que quieren crecer con Muvify Express.',
    features: [
      'Solicitudes ilimitadas',
      'Calendario inteligente',
      'Estadísticas avanzadas',
      'Prioridad en búsquedas',
      'Soporte dedicado',
    ],
    cta: 'Probar Pro',
    highlight: true,
  },
  {
    name: 'Empresa',
    price: 'Custom',
    period: '',
    desc: 'Para grandes operadores con flotas y múltiples sedes.',
    features: [
      'Multi-sede',
      'API de integración',
      'Gestor de cuenta',
      'Facturación personalizada',
      'SLA garantizado',
    ],
    cta: 'Contactar ventas',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge bg-brand-yellow/15 text-brand-yellow-dark mb-4">
            Precios
          </span>
          <h2 className="section-title mb-4">
            Precios claros, sin sorpresas
          </h2>
          <p className="section-subtitle">
            Como nuestra mudanza. Elige el plan que mejor se adapta a ti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? 'bg-brand-navy text-white shadow-card-hover scale-105'
                  : 'bg-white shadow-card hover:shadow-card-hover'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge bg-brand-yellow text-brand-navy shadow-soft">
                    Más popular
                  </span>
                </div>
              )}
              <h3 className={`font-bold text-xl mb-2 ${plan.highlight ? 'text-white' : 'text-brand-navy'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/70' : 'text-brand-navy/60'}`}>
                {plan.desc}
              </p>
              <div className="flex items-end gap-1 mb-6">
                {plan.price !== 'Custom' && (
                  <span className={`text-lg font-semibold ${plan.highlight ? 'text-white/70' : 'text-brand-navy/60'}`}>€</span>
                )}
                <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-brand-navy'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm font-medium pb-1.5 ${plan.highlight ? 'text-white/70' : 'text-brand-navy/60'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-white/90' : 'text-brand-navy/70'}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-brand-yellow text-brand-navy' : 'bg-brand-yellow/20 text-brand-yellow-dark'}`}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full justify-center ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
