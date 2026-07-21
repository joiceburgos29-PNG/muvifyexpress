import { useState } from 'react';
import { MapPin, Package, Calendar, Truck, ArrowRight, ArrowLeft, Check, Home, Box, Clock } from 'lucide-react';

type QuoteFormProps = {
  onSubmit: () => void;
};

const stepLabels = ['Origen', 'Destino', 'Detalles', 'Confirmar'];

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    setDone(true);
    setTimeout(onSubmit, 1800);
  };

  return (
    <section id="solicitar" className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#FF9A00]/15 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
            Solicitar presupuesto
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] mb-3">
            Cuéntanos tu mudanza
          </h2>
          <p className="text-lg text-[#0D1B2A]/60 font-medium">
            Recibe hasta 3 presupuestos en menos de 24 horas. Gratis y sin compromiso.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    i <= step
                      ? 'bg-[#FF9A00] text-[#0D1B2A]'
                      : 'bg-white text-[#0D1B2A]/40 border-2 border-gray-200'
                  }`}
                >
                  {i < step ? <Check size={16} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold mt-2 ${i <= step ? 'text-[#0D1B2A]' : 'text-[#0D1B2A]/40'}`}>
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 -mt-5 ${i < step ? 'bg-[#FF9A00]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {done ? (
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,27,42,0.10)] p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF9A00] flex items-center justify-center mx-auto mb-5">
              <Check size={32} className="text-[#0D1B2A]" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0D1B2A] mb-2">¡Solicitud enviada!</h3>
            <p className="text-[#0D1B2A]/60 font-medium">
              Recibirás hasta 3 presupuestos en menos de 24 horas en tu email.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,27,42,0.10)] p-6 sm:p-10">
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Dirección de origen</label>
                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                    <input className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="Calle, número, ciudad" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Piso de origen</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] focus:outline-none focus:border-[#FF9A00] transition-colors appearance-none bg-white">
                    <option>Bajo</option>
                    <option>1º</option>
                    <option>2º</option>
                    <option>3º o superior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">¿Hay ascensor?</label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="elevator-o" className="sr-only peer" defaultChecked />
                      <div className="text-center py-3 rounded-xl border-2 border-gray-200 peer-checked:border-[#FF9A00] peer-checked:bg-[#FF9A00]/10 font-semibold text-sm text-[#0D1B2A] transition-all">Sí</div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="elevator-o" className="sr-only peer" />
                      <div className="text-center py-3 rounded-xl border-2 border-gray-200 peer-checked:border-[#FF9A00] peer-checked:bg-[#FF9A00]/10 font-semibold text-sm text-[#0D1B2A] transition-all">No</div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Dirección de destino</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                    <input className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="Calle, número, ciudad" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Piso de destino</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] focus:outline-none focus:border-[#FF9A00] transition-colors appearance-none bg-white">
                    <option>Bajo</option>
                    <option>1º</option>
                    <option>2º</option>
                    <option>3º o superior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Distancia aproximada</label>
                  <input className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="Ej. 350 km" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Volumen estimado</label>
                  <div className="relative">
                    <Box className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                    <select className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] focus:outline-none focus:border-[#FF9A00] transition-colors appearance-none bg-white">
                      <option>Estudio (10-15 m³)</option>
                      <option>Piso pequeño (20-30 m³)</option>
                      <option>Piso mediano (30-45 m³)</option>
                      <option>Casa completa (50+ m³)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Fecha preferida</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                    <input type="date" className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] focus:outline-none focus:border-[#FF9A00] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Servicios extra</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Embalaje', icon: Package },
                      { label: 'Montaje', icon: Box },
                      { label: 'Traslado piano', icon: Package },
                      { label: 'Traslado nocturno', icon: Clock },
                    ].map((s, i) => (
                      <label key={i} className="flex items-center gap-2 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-[#FF9A00] transition-colors">
                        <input type="checkbox" className="w-4 h-4 accent-[#FF9A00]" />
                        <s.icon size={16} className="text-[#0D1B2A]/60" />
                        <span className="text-sm font-semibold text-[#0D1B2A]/70">{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Nombre completo</label>
                  <input className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Teléfono</label>
                  <input type="tel" className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors" placeholder="+34 600 000 000" />
                </div>
                <div className="p-4 rounded-xl bg-[#FF9A00]/10 flex items-start gap-3">
                  <Truck size={20} className="text-[#E68800] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#0D1B2A]/70 font-medium">
                    Recibirás hasta 3 presupuestos de empresas verificadas en menos de 24 horas. Sin compromiso ni coste.
                  </p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 0 ? (
                <button onClick={back} className="flex items-center gap-2 text-[#0D1B2A]/60 hover:text-[#0D1B2A] font-bold text-sm transition-colors">
                  <ArrowLeft size={18} />
                  Atrás
                </button>
              ) : <span />}

              {step < 3 ? (
                <button onClick={next} className="flex items-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-6 py-3 rounded-xl hover:bg-[#E68800] transition-colors">
                  Continuar
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button onClick={handleSubmit} className="flex items-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-6 py-3 rounded-xl hover:bg-[#E68800] transition-colors">
                  Enviar solicitud
                  <Check size={18} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
