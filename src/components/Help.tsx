import { Mail, Phone, MapPin, MessageCircle, LifeBuoy } from 'lucide-react';

const faqs = [
  { q: '¿Cuánto cuesta usar Movify Express?', a: 'Comparar y recibir presupuestos es 100% gratis. Solo pagas el servicio de la empresa que elijas.' },
  { q: '¿En cuánto tiempo recibo ofertas?', a: 'En menos de 24 horas recibirás presupuestos de empresas verificadas disponibles para tu ruta.' },
  { q: '¿Las empresas están verificadas?', a: 'Sí. Todas pasan un proceso de validación documental, seguros y referencias antes de formar parte de Movify Express.' },
  { q: '¿Incluye seguro?', a: 'Nuestros colaboradores trabajan con seguro de responsabilidad civil; confírmalo en cada oferta.' },
  { q: '¿Puedo pedir guardamuebles?', a: 'Sí. Indica el tiempo estimado de almacenamiento en el formulario.' },
  { q: '¿Estoy obligado a contratar?', a: 'No. Puedes comparar y decidir sin compromiso. Si ninguna oferta te encaja, no pagas nada.' },
  { q: '¿Puedo cancelar o cambiar la fecha?', a: 'Sí. Puedes modificar o cancelar tu solicitud en cualquier momento antes de confirmar la empresa.' },
  { q: '¿Hacéis mudanzas especiales (piano, obra de arte)?', a: 'Sí, indícalo en el formulario para asignar la empresa adecuada.' },
];

export default function Help() {
  return (
    <section id="ayuda" className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="inline-block bg-[#FF9A00]/15 text-[#E68800] font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
              Ayuda
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] mb-4">
              Estamos aquí para ayudarte
            </h2>
            <p className="text-lg text-[#0D1B2A]/60 font-medium mb-8">
              Resolvemos las dudas más frecuentes sobre cómo funciona Movify Express.
            </p>
            <div className="mt-6 p-5 rounded-xl bg-[#0D1B2A] text-white flex items-center gap-3">
              <MessageCircle size={20} className="text-[#FF9A00]" />
              <p className="text-sm font-medium">
                ¿No encuentras tu respuesta? Escríbenos al chat en vivo.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl shadow-[0_2px_20px_rgba(13,27,42,0.06)] p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-[#0D1B2A] text-sm list-none">
                  {f.q}
                  <span className="text-[#E68800] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#0D1B2A]/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
