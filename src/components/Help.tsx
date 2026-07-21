import { Mail, Phone, MapPin, MessageCircle, LifeBuoy } from 'lucide-react';

const faqs = [
  {
    q: '¿Cuánto tardan en llegar los presupuestos?',
    a: 'En menos de 24 horas recibirás presupuestos de empresas verificadas disponibles para tu ruta.',

  {
    q: '¿Las empresas están verificadas?',
    a: 'Sí. Todas pasan un proceso de validación documental, seguros y referencias antes de formar parte de Muvify Express.',
  },
  {
    q: '¿Tengo que pagar comisión a Muvify?',
    a: 'No. Como cliente, comparar y recibir presupuestos es 100% gratis. Solo pagas el servicio de la empresa que elijas.',
  },
  {
    q: '¿Puedo cancelar o cambiar la fecha?',
    a: 'Sí. Puedes modificar o cancelar tu solicitud desde el panel de cliente en cualquier momento antes de confirmar la empresa.',
  },
];
{ q: '¿Cuánto cuesta usar Movify Express?', a: 'Comparar y recibir presupuestos es 100% gratis. Solo pagas el servicio de la empresa que elijas.' },
{ q: '¿Incluye seguro?', a: 'Nuestros colaboradores trabajan con seguro de responsabilidad civil; confírmalo en cada oferta.' },
{ q: '¿Puedo pedir guardamuebles?', a: 'Sí. Indica el tiempo estimado de almacenamiento en el formulario.' },
{ q: '¿Hacéis mudanzas especiales (piano, obra de arte)?', a: 'Sí, indícalo en el formulario para asignar la empresa adecuada.' },

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
              Si tienes cualquier duda, nuestro equipo te responde en minutos.
            </p>

            <div className="space-y-4">
              <a href="mailto:hola@muvify.com" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-[0_2px_20px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#FF9A00]/15 flex items-center justify-center">
                  <Mail className="text-[#E68800]" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">Email</p>
                  <p className="text-sm text-[#0D1B2A]/60">hola@muvify.com</p>
                </div>
              </a>
              <a href="tel:+34910000000" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-[0_2px_20px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#FF9A00]/15 flex items-center justify-center">
                  <Phone className="text-[#E68800]" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">Teléfono</p>
                  <p className="text-sm text-[#0D1B2A]/60">910 000 000</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-[0_2px_20px_rgba(13,27,42,0.06)]">
                <div className="w-11 h-11 rounded-xl bg-[#FF9A00]/15 flex items-center justify-center">
                  <MapPin className="text-[#E68800]" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">Oficina</p>
                  <p className="text-sm text-[#0D1B2A]/60">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <LifeBuoy className="text-[#E68800]" size={22} />
              <h3 className="font-bold text-[#0D1B2A] text-xl">Preguntas frecuentes</h3>
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
            <div className="mt-6 p-5 rounded-xl bg-[#0D1B2A] text-white flex items-center gap-3">
              <MessageCircle size={20} className="text-[#FF9A00]" />
              <p className="text-sm font-medium">
                ¿No encuentras tu respuesta? Escríbenos al chat en vivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
