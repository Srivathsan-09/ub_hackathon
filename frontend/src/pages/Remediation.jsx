import React from 'react';
import { ShieldCheck, Send, Bell, Trash2, Clock, CheckCircle2 } from 'lucide-react';

const Remediation = () => {
  const actions = [
    { id: 1, api: '/api/v1/old-auth', action: 'Decommission', status: 'Pending Approval', timestamp: '2h ago', assigned: 'Security Team' },
    { id: 2, api: '/internal/debug', action: 'Disable via Gateway', status: 'Scheduled', timestamp: '5h ago', assigned: 'DevOps' },
    { id: 3, api: '/pay/test-execute', action: 'Rotate Secrets', status: 'Completed', timestamp: '1d ago', assigned: 'System' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
          <ShieldCheck className="text-active" size={32} />
          Remediation Engine
        </h2>
        <p className="text-gray-400 mt-1">Automated and manual actions to secure discovered risks</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Tasks */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Remediation Queue
          </h3>
          <div className="space-y-4">
            {actions.map((item) => (
              <div key={item.id} className="glass p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold">{item.api}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === 'Completed' ? 'bg-active/10 text-active' : 'bg-deprecated/10 text-deprecated'}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-4">
                    <span>Action: <b className="text-gray-300">{item.action}</b></span>
                    <span>Assigned: <b className="text-gray-300">{item.assigned}</b></span>
                    <span>{item.timestamp}</span>
                  </p>
                </div>
                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                  <CheckCircle2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Center */}
        <div className="glass p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-transparent">
          <h3 className="text-lg font-semibold mb-6">Create Global Policy</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Automated Discovery Interval</label>
              <select className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50">
                <option>Every 6 Hours</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Default Action for Zombie APIs</label>
              <select className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50">
                <option>Notify Security Team</option>
                <option>Disable Immediately</option>
                <option>Wait for Manual Review</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="w-full bg-primary hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-all shadow-neon flex items-center justify-center gap-2">
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
