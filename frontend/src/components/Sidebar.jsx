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
    <aside className="w-64 border-r border-gray-800 p-6 flex flex-col h-screen fixed left-0 top-0 glass z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-900 rounded-xl flex items-center justify-center text-white shadow-neon">
          <ShieldCheck size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          Zombie API
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activePage === item.id
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-neon'
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-100 transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
