import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Activity, Zap } from 'lucide-react';

const mockTrendData = [
  { name: 'Mon', active: 80, zombies: 10 },
  { name: 'Tue', active: 85, zombies: 12 },
  { name: 'Wed', active: 82, zombies: 15 },
  { name: 'Thu', active: 90, zombies: 18 },
  { name: 'Fri', active: 88, zombies: 20 },
  { name: 'Sat', active: 86, zombies: 22 },
  { name: 'Sun', active: 84, zombies: 23 },
];

const riskData = [
  { name: 'Critical', value: 8, color: '#ef4444' },
  { name: 'High', value: 15, color: '#f97316' },
  { name: 'Medium', value: 30, color: '#f59e0b' },
  { name: 'Low', value: 71, color: '#10b981' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-100">Security Overview</h2>
        <p className="text-gray-400 mt-1">Real-time API discovery and threat landscape</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total APIs" value="124" icon={Activity} trend="+12%" />
        <StatCard title="Active" value="86" icon={Zap} trend="+5%" color="active" />
        <StatCard title="Zombie" value="23" icon={AlertTriangle} trend="+8%" color="zombie" />
        <StatCard title="Risk Score" value="6.8" icon={ShieldCheck} trend="+0.2" color="deprecated" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl border border-gray-800/50 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="text-primary" size={20} />
              API Traffic & Zombie Trend
            </h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1 text-active"><span className="w-2 h-2 rounded-full bg-active" /> Active</span>
              <span className="flex items-center gap-1 text-zombie"><span className="w-2 h-2 rounded-full bg-zombie" /> Zombies</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorZombie" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141417', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="active" stroke="#10b981" fillOpacity={1} fill="url(#colorActive)" strokeWidth={2} />
                <Area type="monotone" dataKey="zombies" stroke="#ef4444" fillOpacity={1} fill="url(#colorZombie)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass p-6 rounded-3xl border border-gray-800/50 shadow-xl">
          <h3 className="text-lg font-semibold mb-8">Risk Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: '#141417', border: '1px solid #27272a', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color = 'accent' }) => {
  const colors = {
    active: 'text-active bg-active/10 group-hover:bg-active/20',
    zombie: 'text-zombie bg-zombie/10 group-hover:bg-zombie/20',
    deprecated: 'text-deprecated bg-deprecated/10 group-hover:bg-deprecated/20',
    accent: 'text-accent bg-accent/10 group-hover:bg-accent/20',
  };

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800/50 group hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl transition-colors duration-300 ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <span className="flex items-center text-xs font-medium text-active bg-active/10 px-2 py-1 rounded-lg">
          <ArrowUpRight size={14} className="mr-1" /> {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-100 mt-1">{value}</p>
      </div>
      {/* Decorative background pulse */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
    </div>
  );
};

export default Dashboard;
