
"use client";

import { Activity, Cpu, HardDrive, Zap, Thermometer, ShieldCheck } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { time: "00:00", cpu: 40, gpu: 24, ram: 30 },
  { time: "01:00", cpu: 30, gpu: 13, ram: 35 },
  { time: "02:00", cpu: 20, gpu: 98, ram: 40 },
  { time: "03:00", cpu: 27, gpu: 39, ram: 45 },
  { time: "04:00", cpu: 18, gpu: 48, ram: 50 },
  { time: "05:00", cpu: 23, gpu: 38, ram: 55 },
  { time: "06:00", cpu: 34, gpu: 43, ram: 60 },
];

export default function MonitorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">System Health Matrix</h1>
        <p className="text-muted-foreground">Real-time telemetrics from hardware and neural infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Core CPU", value: "32%", icon: Cpu, color: "text-primary", sub: "16 Threads Active" },
          { label: "VRAM Usage", value: "8.2GB", icon: Zap, color: "text-amber-500", sub: "RTX 4090 - 24GB" },
          { label: "Neural Temp", value: "62°C", icon: Thermometer, color: "text-emerald-500", sub: "Optimal Cooling" },
          { label: "Security", value: "100%", icon: ShieldCheck, color: "text-blue-500", sub: "Firewall Active" },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-background/50 border border-white/5`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Neural Activity (LLM)
            </h3>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>CPU Load</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>GPU Inference</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="gpu" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorGpu)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            VRAM Allocation Breakdown
          </h3>
          <div className="space-y-6 py-4">
            {[
              { label: "Qwen 2.5:7b (Primary Chat)", value: 65, color: "bg-primary" },
              { label: "LLaVA:11b (Vision Node)", value: 85, color: "bg-accent" },
              { label: "DeepSeek:7b (Coding Task)", value: 20, color: "bg-emerald-500" },
              { label: "System Cache", value: 12, color: "bg-muted-foreground" },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                  <span className="text-muted-foreground">{node.label}</span>
                  <span>{node.value}%</span>
                </div>
                <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color} transition-all duration-1000`} style={{ width: `${node.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-mono leading-relaxed">
            <span className="font-bold uppercase block mb-1">Optimizer Recommendation:</span>
            Unloading LLaVA:11b will free up 4.2GB VRAM for complex coding operations. Confirm sequence?
          </div>
        </div>
      </div>
    </div>
  );
}
