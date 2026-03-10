import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ExternalLink, RefreshCw, Trash2, ShieldAlert } from 'lucide-react';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-active text-active';
      case 'Zombie': return 'bg-zombie text-zombie';
      case 'Deprecated': return 'bg-deprecated text-deprecated';
      default: return 'bg-gray-500 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-100">API Inventory</h2>
          <p className="text-gray-400 mt-1">Full registry of discovered endpoints across all sources</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-red-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-neon font-semibold text-sm">
          <RefreshCw size={18} /> Run New Scan
        </button>
      </header>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-900/30 p-4 rounded-2xl border border-gray-800">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search endpoint or name..." 
            className="w-full bg-background border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <FilterButton label="All Sources" active />
          <FilterButton label="GitHub" />
          <FilterButton label="K8s" />
          <FilterButton label="Logs" />
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">API Endpoint</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Traffic</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Risk</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredApis.map((api) => (
              <tr key={api.id} className="hover:bg-gray-800/20 transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-semibold text-gray-200">{api.name}</div>
                  <div className="text-xs font-mono text-gray-500 mt-1">{api.endpoint}</div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-sm text-gray-400 flex items-center gap-1.5">
                    <Database size={14} className="text-accent" /> {api.source}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-opacity-10 border border-opacity-20 ${getStatusColor(api.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getStatusColor(api.status)}`} />
                    {api.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap font-mono text-sm text-gray-300">
                  {api.request_count.toLocaleString()}
                </td>
                <td className="px-6 py-5 text-center whitespace-nowrap">
                   <div className="flex items-center justify-center gap-2">
                     <div className="w-full max-w-[60px] h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${api.risk_score > 7 ? 'bg-zombie' : api.risk_score > 3 ? 'bg-deprecated' : 'bg-active'}`} 
                          style={{ width: `${api.risk_score * 10}%` }}
                        />
                     </div>
                     <span className="text-xs font-bold text-gray-400">{api.risk_score}</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconButton icon={ExternalLink} color="accent" />
                      <IconButton icon={ShieldAlert} color="deprecated" />
                      <IconButton icon={Trash2} color="zombie" />
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FilterButton = ({ label, active }) => (
  <button className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${active ? 'bg-accent/10 border-accent/30 text-accent' : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'}`}>
    {label}
  </button>
);

const IconButton = ({ icon: Icon, color }) => {
  const colors = {
    accent: 'hover:text-accent hover:bg-accent/10',
    deprecated: 'hover:text-deprecated hover:bg-deprecated/10',
    zombie: 'hover:text-zombie hover:bg-zombie/10',
  };
  return (
    <button className={`p-2 rounded-lg text-gray-500 transition-colors ${colors[color]}`}>
      <Icon size={18} />
    </button>
  );
};

export default Inventory;
