import { ArrowRight } from 'lucide-react';

type CTAProps = {
  onQuote: () => void;
};

export default function CTA({ onQuote }: CTAProps) {
  return (
    <section className="py-20 lg:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#0D1B2A] rounded-3xl p-10 lg:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9A00]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF9A00]/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              ¿Listo para tu próxima mudanza?
            </h2>
             <p className="text-white/70 text-lg font-medium max-w-xl mx-auto mb-8">
             Comparar es gratis y sin compromiso. Recibe ofertas de empresas verificadas en menos de 24h.
            </p>

            </p>
            <button
              onClick={onQuote}
              className="inline-flex items-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-8 py-4 rounded-xl hover:bg-[#E68800] transition-colors text-base"
            >
              Solicitar presupuesto gratis
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
<button onClick={() => window.open('[wa.me](https://wa.me/34664071404?text=Hola%2C%20quiero%20un%20presupuesto%20de%20mudanza%20con%20Movify%20Express)', '_blank')}
  className="ml-3 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1da851] transition-colors text-base">
  Hablar por WhatsApp
</button>
