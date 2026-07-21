import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CompanyCards from './components/CompanyCards';
import Pricing from './components/Pricing';
import Help from './components/Help';
import QuoteForm from './components/QuoteForm';
import CTA from './components/CTA';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import ClientDashboard from './components/ClientDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import AdminDashboard from './components/AdminDashboard';

type Page = 'home' | 'login' | 'client' | 'company' | 'admin';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [loginTarget, setLoginTarget] = useState<Page>('client');

  const scrollTo = (id: string) => {
    setPage('home');
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const goQuote = () => scrollTo('solicitar');

  const goLogin = (target: Page) => {
    setLoginTarget(target);
    setPage('login');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (page === 'login') {
    return (
      <Login
        onBack={() => setPage('home')}
        onLogin={() => setPage(loginTarget)}
      />
    );
  }
  if (page === 'client') return <ClientDashboard onBack={() => setPage('home')} />;
  if (page === 'company') return <CompanyDashboard onBack={() => setPage('home')} />;
  if (page === 'admin') return <AdminDashboard onBack={() => setPage('home')} />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={scrollTo} onQuote={goQuote} />
      <Hero onQuote={goQuote} onLearn={() => scrollTo('como-funciona')} />
      <HowItWorks />
      <CompanyCards />
      <Testimonials />

      <section className="py-12 bg-[#F5F7FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#0D1B2A] mb-2">Accede a los paneles</h2>
            <p className="text-[#0D1B2A]/60 font-medium">Inicia sesión para entrar en cada rol de la plataforma</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Panel Cliente', desc: 'Gestiona tus solicitudes y presupuestos', page: 'client' as Page },
              { label: 'Panel Empresas', desc: 'Recibe solicitudes y gestiona tu agenda', page: 'company' as Page },
              { label: 'Panel Admin', desc: 'Supervisión global de la plataforma', page: 'admin' as Page },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => goLogin(p.page)}
                className="bg-white rounded-2xl p-6 text-left shadow-[0_2px_20px_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF9A00]/15 flex items-center justify-center mb-4 group-hover:bg-[#FF9A00] transition-colors">
                  <span className="font-extrabold text-[#E68800] group-hover:text-[#0D1B2A]">{i + 1}</span>
                </div>
                <h3 className="font-bold text-[#0D1B2A] mb-1">{p.label}</h3>
                <p className="text-sm text-[#0D1B2A]/60">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <QuoteForm onSubmit={() => scrollTo('empresas')} />
      <CTA onQuote={goQuote} />
      <Help />
      <Footer onNavigate={scrollTo} />
    </div>
  );
}
