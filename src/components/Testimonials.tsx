import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana García',
    role: 'Mudanza Madrid → Barcelona',
    text: 'Ahorré más de 200€ comparando con Muvify. El proceso fue clarísimo y recibí los 3 presupuestos el mismo día.',
    avatar: 'A',
  },
  {
    name: 'Carlos Vera',
    role: 'Mudanza Valencia → Sevilla',
    text: 'La empresa que elegí llegó puntual y con todo el material. Sin sorpresas en el precio, tal como prometen.',
    avatar: 'C',
  },
  {
    name: 'Lucía Romero',
    role: 'Mudanza Bilbao → Madrid',
    text: 'Pensaba que contratar una mudanza iba a ser un caos. Con Muvify fue tan fácil como pedir un taxi.',
    avatar: 'L',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#FF9A00]/15 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            Miles de mudanzas felices
          </h2>
          <p className="text-lg text-[#0D1B2A]/60 font-medium">
            Esto es lo que dicen nuestros clientes después de mudarse con Muvify Express.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#F5F7FA] rounded-2xl p-7 hover:bg-white hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] transition-all duration-300">
              <Quote className="text-[#FF9A00] mb-4" size={28} />
              <p className="text-[#0D1B2A]/80 font-medium leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={15} className="fill-[#FF9A00] text-[#FF9A00]" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#FF9A00] flex items-center justify-center text-[#0D1B2A] font-extrabold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">{t.name}</p>
                  <p className="text-xs text-[#0D1B2A]/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
