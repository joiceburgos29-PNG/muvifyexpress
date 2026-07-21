import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

type NavbarProps = {
  onNavigate: (page: string) => void;
  onQuote: () => void;
};

const links = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Cómo funciona', id: 'como-funciona' },
  { label: 'Empresas', id: 'empresas' }
  { label: 'Ayuda', id: 'ayuda' },
];

export default function Navbar({ onNavigate, onQuote }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNav('inicio'); }} className="flex-shrink-0">
            <Logo height={56} className="hidden sm:block" />
            <Logo height={48} className="sm:hidden" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-[#0D1B2A] text-sm font-semibold hover:text-[#FF9A00] transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={onQuote}
              className="bg-[#FF9A00] text-[#0D1B2A] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#E68800] transition-colors duration-150"
            >
              Solicitar presupuesto
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-[#0D1B2A]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left px-3 py-3 rounded-lg text-sm font-semibold text-[#0D1B2A] hover:bg-[#F5F7FA] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onQuote(); }}
              className="mt-2 bg-[#FF9A00] text-[#0D1B2A] font-bold text-sm px-5 py-3 rounded-lg hover:bg-[#E68800] transition-colors"
            >
              Solicitar presupuesto
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
