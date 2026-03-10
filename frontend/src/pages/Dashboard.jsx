import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Activity, Zap, ShieldCheck } from 'lucide-react';

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
  { name: 'Critical', value: 8, color: '#f43f5e' },
  { name: 'High', value: 15, color: '#f97316' },
  { name: 'Medium', value: 30, color: '#f59e0b' },
  { name: 'Low', value: 71, color: '#10b981' },
];

const Dashboard = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight">Security Center</h2>
          <p className="text-gray-500 mt-2 font-medium">Real-time API intelligence across infrastructure</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-border text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            Last Scan: <span className="text-gray-300">2 mins ago</span>
          </div>
        </div>
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
        <div className="lg:col-span-2 glass-card p-8 rounded-[2rem]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Activity size={20} />
              </div>
              Traffic intelligence
            </h3>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-2 text-active"><span className="w-2.5 h-2.5 rounded-full bg-active shadow-[0_0_8px_#10b981]" /> Active</span>
              <span className="flex items-center gap-2 text-zombie"><span className="w-2.5 h-2.5 rounded-full bg-zombie shadow-[0_0_8px_#f43f5e]" /> Zombies</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorZombie" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} fontWeight="700" tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#52525b" fontSize={11} fontWeight="700" tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0d0f', border: '1px solid #ffffff10', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ fontSize: '11px', fontWeight: '700' }}
                />
                <Area type="monotone" dataKey="active" stroke="#10b981" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
                <Area type="monotone" dataKey="zombies" stroke="#f43f5e" fillOpacity={1} fill="url(#colorZombie)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-10 text-white">Risk Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" barSize={12} margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} fontWeight="700" tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: '#ffffff05'}}
                   contentStyle={{ backgroundColor: '#0c0d0f', border: '1px solid #ffffff10', borderRadius: '16px' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>Critical threats detected:</span>
            <span className="text-zombie font-black">08</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color = 'accent' }) => {
  const colors = {
    active: 'text-active bg-active/10 group-hover:bg-active/20 border-active/20',
    zombie: 'text-zombie bg-zombie/10 group-hover:bg-zombie/20 border-zombie/20',
    deprecated: 'text-deprecated bg-deprecated/10 group-hover:bg-deprecated/20 border-deprecated/20',
    accent: 'text-secondary bg-secondary/10 group-hover:bg-secondary/20 border-secondary/20',
  };

  return (
    <div className="glass-card p-7 rounded-[2rem] group relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl transition-all duration-300 border ${colors[color]} group-hover:scale-110 shadow-premium`}>
          <Icon size={24} />
        </div>
        <span className={`flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-opacity-10 ${trend.startsWith('+') ? 'text-active bg-active' : 'text-zombie bg-zombie'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-4xl font-black text-white mt-2 tracking-tight group-hover:text-glow-primary transition-all duration-500">{value}</p>
      </div>
      {/* Dynamic background element */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
    </div>
  );
};

export default Dashboard;
