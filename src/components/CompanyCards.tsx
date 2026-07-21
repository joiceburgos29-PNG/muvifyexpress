import { Star, MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

const companies = [
  {
    name: 'Mudanzas García',
    rating: 4.9,
    reviews: 312
    time: '1 día',
    location: 'Madrid',
    badge: 'Top valorada',
    features: ['Seguro incluido', 'Embalaje gratuito', 'Equipo de 3 personas'],
  },
  {
    name: 'Express Logistics',
    rating: 4.7,
    reviews: 198,
    time: '1-2 días',
    location: 'Barcelona',
    badge: 'Respuesta rápida',
    features: ['Vehículo grande', 'Montaje de muebles', 'Traslado nocturno'],
  },
  {
    name: 'Muvify Pro',
    rating: 4.8,
    reviews: 245,
    time: '1 día',
    location: 'Valencia',
    badge: 'Premium',
    features: ['Servicio premium', 'Embalaje premium', 'Coordinador dedicado'],
  },
];

export default function CompanyCards() {
  return (
    <section id="empresas" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#FF9A00]/15 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
            Empresas verificadas
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            Compara empresas de confianza
          </h2>
          <p className="text-lg text-[#0D1B2A]/60 font-medium">
            Todas nuestras empresas pasan un proceso de verificación. Valoraciones reales de clientes como tú.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#0D1B2A] text-lg">{c.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={15} className="fill-[#FF9A00] text-[#FF9A00]" />
                    <span className="font-bold text-sm text-[#0D1B2A]">{c.rating}</span>
                    <span className="text-xs text-[#0D1B2A]/50">({c.reviews} reseñas)</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#FF9A00]/15 text-[#E68800]">
                  {c.badge}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#0D1B2A]/60 mb-5">
                <MapPin size={14} />
                <span>{c.location}</span>
                <span className="mx-1">·</span>
                <Clock size={14} />
                <span>{c.time}</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {c.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[#0D1B2A]/70">
                    <CheckCircle2 size={16} className="text-[#FF9A00] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 border-t border-gray-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#0D1B2A]/50 font-semibold">Presupuesto</p>
                    <p className="text-lg font-extrabold text-[#0D1B2A]">A medida en 24h</p>
                 </div>

                  <ShieldCheck size={20} className="text-[#FF9A00]" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-6 py-3 rounded-xl hover:bg-[#E68800] transition-colors">
                  Solicitar Presupuesto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
