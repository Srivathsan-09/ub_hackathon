import React from 'react';
import { LayoutDashboard, Database, Ghost, ShieldCheck, Settings, Activity } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'API Inventory', icon: Database },
    { id: 'zombies', label: 'Zombie Detection', icon: Ghost },
    { id: 'remediation', label: 'Remediation', icon: ShieldCheck },
    { id: 'infrastructure', label: 'Infrastructure', icon: Activity },
  ];

  return (
    <aside className="w-72 border-r border-border p-8 flex flex-col h-screen fixed left-0 top-0 glass z-50 shadow-premium">
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-950 rounded-2xl flex items-center justify-center text-white shadow-neon border border-white/10">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">
            Antigravity
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mt-1.5">
            Security Ops
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              activePage === item.id
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-neon'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <item.icon size={22} className={`transition-transform duration-300 ${activePage === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-border">
        <button className="w-full flex items-center gap-4 px-5 py-4 text-gray-400 hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all duration-300 group">
          <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-semibold tracking-wide">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
