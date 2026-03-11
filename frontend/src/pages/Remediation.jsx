import React from 'react';
import { ShieldCheck, Send, Bell, Trash2, Clock, CheckCircle2 } from 'lucide-react';

const Remediation = () => {
  const actions = [
    { id: 1, api: '/api/v1/old-auth', action: 'Decommission', status: 'Pending Approval', timestamp: '2h ago', assigned: 'Security Team' },
    { id: 2, api: '/internal/debug', action: 'Disable via Gateway', status: 'Scheduled', timestamp: '5h ago', assigned: 'DevOps' },
    { id: 3, api: '/pay/test-execute', action: 'Rotate Secrets', status: 'Completed', timestamp: '1d ago', assigned: 'System' },
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
      <header>
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <div className="w-12 h-12 bg-active/10 rounded-2xl flex items-center justify-center text-active border border-active/20">
            <ShieldCheck size={32} />
          </div>
          Remediation Engine
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Automated and manual actions to secure discovered risks</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Active Tasks */}
        <div className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
            <Clock size={16} className="text-primary" />
            Remediation Queue
          </h3>
          <div className="space-y-4">
            {actions.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-[2rem] flex items-center justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gray-200 group-hover:text-primary transition-colors">{item.api}</span>
                    <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest border ${item.status === 'Completed' ? 'bg-active/10 text-active border-active/20' : 'bg-deprecated/10 text-deprecated border-deprecated/20'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-500">
                    <span>Action: <b className="text-gray-300 ml-1">{item.action}</b></span>
                    <span>Assigned: <b className="text-gray-300 ml-1">{item.assigned}</b></span>
                    <span className="flex items-center gap-1.5"><Clock size={10} /> {item.timestamp}</span>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-active hover:border-active/30 hover:scale-110 active:scale-90 transition-all shadow-premium">
                  <CheckCircle2 size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Center */}
        <div className="glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-surface to-[#050506]">
          <h3 className="text-xl font-bold mb-8 text-white">Global Security Policy</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Discovery Interval</label>
              <select className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm font-bold text-gray-300 focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer hover:border-white/10">
                <option>Every 6 Hours</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Default Remediation</label>
              <select className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm font-bold text-gray-300 focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer hover:border-white/10">
                <option>Notify Security Team</option>
                <option>Disable Abandoned APIs</option>
                <option>Wait for Manual Review</option>
              </select>
            </div>
            <div className="pt-6">
              <button className="w-full bg-primary hover:bg-red-700 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-[1.5rem] transition-all shadow-neon hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                 <ShieldCheck size={20} /> Update Security Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remediation;
