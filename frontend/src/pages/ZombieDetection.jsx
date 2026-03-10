import React from 'react';
import { Ghost, ShieldAlert, Cpu, Search, Trash2 } from 'lucide-react';

const ZombieDetection = () => {
  const zombies = [
    { id: 1, name: 'Legacy API', endpoint: '/api/v1/old-auth', source: 'GitHub', risk: 'Critical', last_seen: '45 days ago', vulnerability: 'Broken Authentication' },
    { id: 2, name: 'Dev Debug Tool', endpoint: '/internal/debug', source: 'Kubernetes', risk: 'High', last_seen: '120 days ago', vulnerability: 'Information Exposure' },
    { id: 3, name: 'Test Payment', endpoint: '/pay/test-execute', source: 'NGINX', risk: 'Medium', last_seen: '32 days ago', vulnerability: 'Unencrypted Traffic' },
  ];

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
          <Ghost className="text-primary" size={32} />
          Zombie API Detection
        </h2>
        <p className="text-gray-400 mt-1">AI-powered identification of abandoned or exposed endpoints</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border border-zombie/20 bg-zombie/[0.02]">
           <p className="text-sm text-gray-400">Identified Zombies</p>
           <p className="text-3xl font-bold text-zombie">23</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-deprecated/20">
           <p className="text-sm text-gray-400">Stale APIs (30d+)</p>
           <p className="text-3xl font-bold text-deprecated">42</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-active/20">
           <p className="text-sm text-gray-400">Total Scan Depth</p>
           <p className="text-3xl font-bold text-active">1,240</p>
        </div>
      </div>

      <div className="space-y-4">
        {zombies.map((zombie) => (
          <div key={zombie.id} className="glass p-6 rounded-3xl border border-gray-800/50 hover:border-zombie/40 transition-all group relative overflow-hidden">
             <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-zombie border border-zombie/20">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-200">{zombie.name}</h3>
                    <p className="text-xs font-mono text-gray-500">{zombie.endpoint}</p>
                    <div className="flex gap-4 mt-3">
                      <Tag label={`Risk: ${zombie.risk}`} color="zombie" />
                      <Tag label={zombie.source} color="accent" />
                      <Tag label={`Last seen: ${zombie.last_seen}`} color="gray" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Detected Issue</p>
                  <p className="text-sm font-semibold text-gray-300 bg-gray-900 px-3 py-1 rounded-lg border border-gray-800 italic">
                    "{zombie.vulnerability}"
                  </p>
                  <div className="mt-4 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 bg-zombie/10 text-zombie border border-zombie/20 rounded-xl text-xs font-bold hover:bg-zombie/20 transition-colors">
                      Remediate Now
                    </button>
                    <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs font-bold hover:text-white transition-colors">
                      Ignore
                    </button>
                  </div>
                </div>
             </div>
             {/* Background glow */}
             <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zombie/5 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Tag = ({ label, color }) => {
  const colors = {
    zombie: 'bg-zombie/10 text-zombie border-zombie/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    gray: 'bg-gray-800 text-gray-400 border-gray-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] uppercase font-bold border ${colors[color]}`}>
      {label}
    </span>
  );
};

export default ZombieDetection;
