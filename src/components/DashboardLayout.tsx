import { ReactNode } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import Logo from './Logo';

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  role: string;
  onBack: () => void;
  active: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; icon: typeof ArrowLeft }[];
  children: ReactNode;
};

export default function DashboardLayout({
  title,
  subtitle,
  role,
  onBack,
  active,
  onTabChange,
  tabs,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-navy/60 hover:text-brand-navy font-semibold text-sm transition-colors"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </button>
          <div className="flex items-center gap-3">
            <span className="badge bg-brand-navy text-white">{role}</span>
            <button className="text-brand-navy/60 hover:text-brand-navy transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-soft p-5">
              <a href="/" className="block mb-6 pb-5 border-b border-gray-100">
                <Logo height={56} className="hidden sm:block" />
                <Logo height={48} className="sm:hidden" />
              </a>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        active === tab.id
                          ? 'bg-brand-yellow text-brand-navy shadow-soft'
                          : 'text-brand-navy/60 hover:bg-brand-bg'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-brand-navy">{title}</h1>
              <p className="text-brand-navy/60 font-medium mt-1">{subtitle}</p>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
