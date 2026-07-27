import { ArrowRight, Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

type HeroProps = {
  onQuote: () => void;
  onLearn: () => void;
};

export default function Hero({ onQuote, onLearn }: HeroProps) {
  return (
    <section
      id="inicio"
      className="pt-[72px] bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-72px)] items-center gap-8 py-12 lg:py-0">

          {/* LEFT */}
          <div className="flex flex-col items-start order-2 lg:order-1 pb-12 lg:pb-0">
            <div className="inline-flex items-center gap-2 bg-[#FF9A00]/10 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-6">
              <ShieldCheck size={14} />
              Empresas 100% verificadas
            </div>

            <h1 className="text-[2.6rem] lg:text-[3.2rem] font-extrabold text-[#0D1B2A] leading-[1.1] mb-5">
              Compara, elige y<br />
              <span className="text-[#FF9A00]">múdate sin</span> complicaciones.
            </h1>

            <p className="text-lg text-[#0D1B2A]/60 font-medium leading-relaxed mb-8 max-w-md">
              Recibe hasta 3 presupuestos de empresas verificadas en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
              <button
                onClick={onQuote}
                className="flex items-center justify-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-7 py-3.5 rounded-xl hover:bg-[#E68800] transition-colors text-base"
              >
                Solicitar presupuesto
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onLearn}
                className="flex items-center justify-center gap-2 bg-white text-[#0D1B2A] font-bold px-7 py-3.5 rounded-xl border-2 border-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white transition-all text-base"
              >
                Cómo funciona
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-7 border-t border-gray-100 w-full">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {['C', 'M', 'L', 'A'].map((l, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white bg-[#FF9A00] flex items-center justify-center text-[#0D1B2A] font-extrabold text-xs"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={13} className="fill-[#FF9A00] text-[#FF9A00]" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-[#0D1B2A]/50 mt-0.5">+2.500 mudanzas realizadas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#FF9A00]" />
                <span className="text-sm font-semibold text-[#0D1B2A]/60">Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#FF9A00]" />
                <span className="text-sm font-semibold text-[#0D1B2A]/60">Sin compromiso</span>
              </div>
            </div>
          </div>

          {/* RIGHT — illustration */}
          <div className="relative order-1 lg:order-2 flex items-end justify-center lg:justify-end pt-8 lg:pt-0">
            <div className="absolute top-8 right-0 w-[420px] h-[420px] bg-[#FF9A00]/15 rounded-full -z-0" />
            <div className="absolute bottom-0 right-16 w-[240px] h-[240px] bg-[#FFC107]/20 rounded-full -z-0" />

            <div className="relative z-10 w-full max-w-[480px]">
              <img
                src="https://images.pexels.com/photos/7464491/pexels-photo-7464491.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Profesional de mudanzas"
                className="w-full h-[460px] lg:h-[580px] object-cover object-top rounded-3xl shadow-2xl"
              />

              {/* Floating card */}
              <div className="absolute -left-6 bottom-12 bg-white rounded-2xl shadow-[0_8px_32px_rgba(13,27,42,0.15)] p-4 flex items-center gap-3 min-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-[#FF9A00] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-[#0D1B2A] text-sm">Precio garantizado</p>
                  <p className="text-xs text-[#0D1B2A]/50">Sin costes ocultos</p>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -right-4 top-10 bg-white rounded-2xl shadow-[0_8px_32px_rgba(13,27,42,0.15)] p-4 min-w-[160px]">
                <p className="text-xs font-bold text-[#0D1B2A]/50 mb-1">Presupuestos</p>
                <p className="text-2xl font-extrabold text-[#0D1B2A]">3</p>
                <p className="text-xs text-[#0D1B2A]/50">en menos de 24h</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
