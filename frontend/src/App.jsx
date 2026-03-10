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

      <div className="ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <nav className="h-20 border-b border-gray-800/50 flex items-center justify-between px-10 sticky top-0 glass z-40">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Shield size={16} className="text-primary" />
            <span className="text-gray-500">System Status:</span>
            <span className="text-active flex items-center gap-1.5 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-active animate-pulse" />
              Operational
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-px h-6 bg-gray-800" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">Security Admin</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Standard Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-transparent group-hover:border-primary transition-all flex items-center justify-center p-1 overflow-hidden">
                <User size={24} className="text-gray-400" />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
