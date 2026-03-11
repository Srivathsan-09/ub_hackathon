import React from 'react';
import { ShieldAlert, Cpu, Search, Trash2, FileWarning } from 'lucide-react';

const AbandonedDetection = () => {
  const staleApis = [
    { id: 1, name: 'Legacy API', endpoint: '/api/v1/old-auth', source: 'GitHub', risk: 'Critical', last_seen: '45 days ago', vulnerability: 'Broken Authentication' },
    { id: 2, name: 'Dev Debug Tool', endpoint: '/internal/debug', source: 'Kubernetes', risk: 'High', last_seen: '120 days ago', vulnerability: 'Information Exposure' },
    { id: 3, name: 'Test Payment', endpoint: '/pay/test-execute', source: 'NGINX', risk: 'Medium', last_seen: '32 days ago', vulnerability: 'Unencrypted Traffic' },
  ];

  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-700">
      <header>
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <div className="w-12 h-12 bg-zombie/10 rounded-2xl flex items-center justify-center text-zombie border border-zombie/20">
            <FileWarning size={32} />
          </div>
          Abandoned API Discovery
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Enterprise identification of abandoned or exposed endpoints</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsTile label="Abandoned APIs" value="23" color="zombie" />
        <StatsTile label="Stale Endpoints (30d+)" value="42" color="deprecated" />
        <StatsTile label="Total Scan Depth" value="1,240" color="active" />
      </div>

      <div className="space-y-6">
        {staleApis.map((api) => (
          <div key={api.id} className="glass-card p-8 rounded-[2.5rem] group relative overflow-hidden transition-all duration-500">
             <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 relative z-10">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-surface flex items-center justify-center text-zombie border border-border group-hover:border-zombie/50 transition-all duration-500">
                    <ShieldAlert size={36} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-zombie transition-colors">{api.name}</h3>
                    <p className="text-xs font-mono text-gray-500 mt-1 tracking-tight">{api.endpoint}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Tag label={`Risk: ${api.risk}`} color="zombie" />
                      <Tag label={api.source} color="secondary" />
                      <Tag label={`Last seen: ${api.last_seen}`} color="gray" />
                    </div>
                  </div>
                </div>
                <div className="lg:text-right flex flex-col items-start lg:items-end w-full lg:w-auto">
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-3">Threat Profile</p>
                  <p className="text-sm font-bold text-gray-200 bg-white/[0.03] px-5 py-3 rounded-2xl border border-white/5 italic shadow-premium group-hover:border-zombie/30 transition-all">
                    "{api.vulnerability}"
                  </p>
                  <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <button className="px-6 py-2.5 bg-zombie/10 text-zombie border border-zombie/30 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zombie hover:text-white transition-all shadow-premium">
                      Remediate
                    </button>
                    <button className="px-6 py-2.5 bg-white/5 text-gray-400 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                      Ignore
                    </button>
                  </div>
                </div>
             </div>
             {/* Decorative glow */}
             <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-zombie/[0.03] to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsTile = ({ label, value, color }) => {
  const colors = {
    zombie: 'text-zombie border-zombie/20 bg-zombie/5',
    deprecated: 'text-deprecated border-deprecated/20 bg-deprecated/5',
    active: 'text-active border-active/20 bg-active/5',
  };
  return (
    <div className={`glass p-8 rounded-3xl border ${colors[color]} shadow-premium`}>
       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</p>
       <p className={`text-4xl font-black ${colors[color].split(' ')[0]}`}>{value}</p>
    </div>
  );
};

const Tag = ({ label, color }) => {
  const colors = {
    zombie: 'bg-zombie/10 text-zombie border-zombie/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    gray: 'bg-white/5 text-gray-500 border-white/10',
  };
  return (
    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${colors[color]}`}>
      {label}
    </span>
  );
};

export default AbandonedDetection;
