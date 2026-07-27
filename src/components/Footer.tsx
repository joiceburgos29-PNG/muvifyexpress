import { Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

type FooterProps = {
  onNavigate: (id: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0D1B2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="/" className="inline-block mb-5 bg-white rounded-xl p-3">
              <Logo height={56} />
            </a>
            <p className="text-white/70 font-medium italic leading-relaxed mb-6">
              "Precio claro hoy, mudanza tranquila mañana."
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#FF9A00] hover:text-[#0D1B2A] flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wide">Plataforma</h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', id: 'inicio' },
                { label: 'Cómo funciona', id: 'como-funciona' },
                { label: 'Empresas', id: 'empresas' },
                { label: 'Precios', id: 'precios' },
                { label: 'Ayuda', id: 'ayuda' },
              ].map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="text-white/60 hover:text-[#FF9A00] text-sm font-medium transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3">
              {['Aviso legal', 'Política de privacidad', 'Cookies', 'Contacto'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 hover:text-[#FF9A00] text-sm font-medium transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60 font-medium">
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#FF9A00]" /> hola@muvify.com</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[#FF9A00]" /> 910 000 000</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-[#FF9A00]" /> Madrid, España</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© 2026 Muvify Express. Todos los derechos reservados.</p>
          <p className="text-white/50 text-sm">Hecho con cuidado en Madrid.</p>
        </div>
      </div>
    </footer>
  );
}
