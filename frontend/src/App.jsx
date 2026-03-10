import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import ZombieDetection from './pages/ZombieDetection';
import Remediation from './pages/Remediation';
import { Shield, Bell, User } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'inventory': return <Inventory />;
      case 'zombies': return <ZombieDetection />;
      case 'remediation': return <Remediation />;
      case 'infrastructure': return <div className="text-center py-20 text-gray-500">Infrastructure Sources Loading...</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-primary/30">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="ml-72 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <nav className="h-24 border-b border-border flex items-center justify-between px-12 sticky top-0 glass z-40">
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-active animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">System Status:</span>
            <span className="text-active font-bold">Operational</span>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative text-gray-400 hover:text-white transition-all hover:scale-110">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold group-hover:text-primary transition-colors">Security Admin</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Level 4 Access</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border group-hover:border-primary/50 transition-all flex items-center justify-center overflow-hidden">
                <User size={28} className="text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
