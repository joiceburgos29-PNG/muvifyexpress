import { useState } from 'react';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

type LoginProps = {
  onBack: () => void;
  onLogin: () => void;
};

export default function Login({ onBack, onLogin }: LoginProps) {
  const [role, setRole] = useState<'client' | 'company' | 'admin'>('client');

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <a href="/" className="flex-shrink-0">
            <Logo height={56} className="hidden sm:block" />
            <Logo height={48} className="sm:hidden" />
          </a>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0D1B2A]/60 hover:text-[#0D1B2A] font-semibold text-sm transition-colors"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <Logo height={56} className="hidden sm:block mx-auto" />
              <Logo height={48} className="sm:hidden mx-auto" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0D1B2A] mb-2">Bienvenido de nuevo</h1>
            <p className="text-[#0D1B2A]/60 font-medium">Inicia sesión para acceder a tu panel</p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,27,42,0.10)] p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-[#F5F7FA] rounded-xl">
              {[
                { id: 'client', label: 'Cliente' },
                { id: 'company', label: 'Empresa' },
                { id: 'admin', label: 'Admin' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as typeof role)}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                    role === r.id
                      ? 'bg-[#FF9A00] text-[#0D1B2A] shadow-sm'
                      : 'text-[#0D1B2A]/50 hover:text-[#0D1B2A]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); onLogin(); }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                  <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0D1B2A] mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/40" size={18} />
                  <input
                    type="password"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 font-medium text-[#0D1B2A] placeholder-gray-400 focus:outline-none focus:border-[#FF9A00] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#FF9A00]" />
                  <span className="text-[#0D1B2A]/60 font-medium">Recordarme</span>
                </label>
                <a href="#" className="text-[#E68800] font-bold hover:underline">¿Olvidaste tu contraseña?</a>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#FF9A00] text-[#0D1B2A] font-bold px-6 py-3.5 rounded-xl hover:bg-[#E68800] transition-colors"
              >
                Iniciar sesión
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-sm text-[#0D1B2A]/60 font-medium mt-6">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-[#E68800] font-bold hover:underline">Regístrate gratis</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
