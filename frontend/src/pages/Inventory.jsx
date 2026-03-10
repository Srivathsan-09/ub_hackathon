import React, { useState } from 'react';
import { Search, Filter, ExternalLink, RefreshCw, Trash2, ShieldAlert, Database } from 'lucide-react';

const Inventory = () => {
  const [apis, setApis] = useState([
    { id: 1, name: 'User Authentication', endpoint: '/api/v1/auth/login', source: 'GitHub', status: 'Active', request_count: 1240, risk_score: 1.2 },
    { id: 2, name: 'Old Payment Gateway', endpoint: '/api/v1/payments/legacy', source: 'Kubernetes', status: 'Zombie', request_count: 0, risk_score: 8.5 },
    { id: 3, name: 'User Profile Sync', endpoint: '/api/v2/user/sync', source: 'NGINX', status: 'Active', request_count: 450, risk_score: 2.1 },
    { id: 4, name: 'Beta Features', endpoint: '/api/beta/features', source: 'Gateway', status: 'Deprecated', request_count: 5, risk_score: 4.8 },
    { id: 5, name: 'Admin Debug Tool', endpoint: '/admin/debug/logs', source: 'NGINX', status: 'Zombie', request_count: 0, risk_score: 9.2 },
  ]);

  const [search, setSearch] = useState('');

  const filteredApis = apis.filter(api => 
    api.name.toLowerCase().includes(search.toLowerCase()) || 
    api.endpoint.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'text-active bg-active/10 border-active/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'Zombie': return 'text-zombie bg-zombie/10 border-zombie/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
      case 'Deprecated': return 'text-deprecated bg-deprecated/10 border-deprecated/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight">API Inventory</h2>
          <p className="text-gray-500 mt-2 font-medium">Full registry of discovered endpoints across all sources</p>
        </div>
        <button className="flex items-center gap-2.5 bg-primary hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl transition-all shadow-neon font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95">
          <RefreshCw size={18} /> Run New Scan
        </button>
      </header>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center glass p-5 rounded-[2rem]">
        <div className="relative flex-1 min-w-[350px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Filter by endpoint or resource name..." 
            className="w-full bg-background border border-border rounded-2xl py-3.5 pl-14 pr-4 focus:outline-none focus:border-primary/50 transition-all font-medium text-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 p-1.5 bg-background/50 rounded-2xl border border-border">
          <FilterButton label="All" active />
          <FilterButton label="GitHub" />
          <FilterButton label="K8s" />
          <FilterButton label="NGINX" />
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-border">
                <th className="pl-8 pr-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">API Endpoint</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Source</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-right">Traffic</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Security Risk</th>
                <th className="pl-6 pr-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredApis.map((api) => (
                <tr key={api.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="pl-8 pr-6 py-7">
                    <div className="font-bold text-white text-base group-hover:text-primary transition-colors">{api.name}</div>
                    <div className="text-xs font-mono text-gray-500 mt-1.5 tracking-tight">{api.endpoint}</div>
                  </td>
                  <td className="px-6 py-7 whitespace-nowrap">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> {api.source}
                    </span>
                  </td>
                  <td className="px-6 py-7 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(api.status)}`}>
                      {api.status}
                    </span>
                  </td>
                  <td className="px-6 py-7 text-right whitespace-nowrap font-mono text-sm font-bold text-gray-300">
                    {api.request_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-7 text-center whitespace-nowrap">
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full transition-all duration-1000 ${api.risk_score > 7 ? 'bg-zombie shadow-[0_0_8px_#f43f5e]' : api.risk_score > 3 ? 'bg-deprecated shadow-[0_0_8px_#f59e0b]' : 'bg-active shadow-[0_0_8px_#10b981]'}`} 
                            style={{ width: `${api.risk_score * 10}%` }}
                          />
                       </div>
                       <span className="text-[11px] font-black text-gray-500 tracking-tighter uppercase">{api.risk_score} / 10</span>
                     </div>
                  </td>
                  <td className="pl-6 pr-8 py-7 text-right whitespace-nowrap">
                     <div className="flex justify-end gap-2.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                        <IconButton icon={ExternalLink} color="secondary" />
                        <IconButton icon={ShieldAlert} color="deprecated" />
                        <IconButton icon={Trash2} color="primary" />
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ label, active }) => (
  <button className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${active ? 'bg-primary/20 border-primary/30 text-white shadow-neon' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'}`}>
    {label}
  </button>
);

const IconButton = ({ icon: Icon, color }) => {
  const colors = {
    secondary: 'text-secondary hover:bg-secondary/10 border-secondary/20',
    deprecated: 'text-deprecated hover:bg-deprecated/10 border-deprecated/20',
    primary: 'text-primary hover:bg-primary/10 border-primary/20',
  };
  return (
    <button className={`p-2.5 rounded-xl border transition-all duration-300 ${colors[color]} hover:scale-110 active:scale-90 shadow-premium`}>
      <Icon size={18} />
    </button>
  );
};

export default Inventory;
