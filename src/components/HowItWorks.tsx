import { FileText, Send, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Describe tu mudanza',
    desc: 'Indica origen, destino y volumen. Toma menos de 2 minutos.',
  },
  {
    icon: Send,
    title: 'Recibe presupuestos',
    desc: 'Hasta 3 empresas verificadas te envían su oferta en menos de 24h.',
  },
  {
    icon: Truck,
    title: 'Compara y elige',
    desc: 'Revisa valoraciones, precios y plazos. Tú decides, sin presión.',
  },
  {
    icon: CheckCircle2,
    title: 'Múdate tranquilo',
    desc: 'Tu empresa confirmada se encarga de todo. Precio cerrado, sin sorpresas.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#FF9A00]/15 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
            Cómo funciona
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            Tu mudanza en 4 pasos simples
          </h2>
          <p className="text-lg text-[#0D1B2A]/60 font-medium">
            Sin llamadas interminables ni sorpresas en el precio. Muvify Express conecta clientes y empresas en un proceso transparente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative bg-white rounded-2xl p-7 shadow-[0_2px_20px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-4 left-7 w-9 h-9 rounded-full bg-[#0D1B2A] text-white text-sm font-extrabold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#FF9A00]/15 flex items-center justify-center mb-5">
                  <Icon className="text-[#E68800]" size={26} />
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#0D1B2A]/60 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
