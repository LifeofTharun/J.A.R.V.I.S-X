
"use client";

import { useState, useEffect } from "react";
import { 
  Zap, 
  Activity, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal,
  ArrowUpRight,
  Brain
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Reusing the dashboard layout structure manually for the landing if needed, 
          but usually, we just use the (dashboard) layout. 
          Actually, since it's in the root, it doesn't have the layout. 
          Let's move this to a proper dashboard-style layout if it was meant to be the home.
      */}
      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sidebar via-background to-background p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tighter text-gradient">J.A.R.V.I.S X</h1>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">Neural Operating System • Core v1.0.4</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Local Neural Link Active</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-panel p-8 rounded-3xl space-y-6 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Brain className="h-6 w-6 text-primary" />
                    Neural Core Status
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                    Local inference engine is synchronized with Ollama. Llama3 and Llava models are initialized and ready for multi-modal processing.
                  </p>
                </div>
                <Link href="/chat" className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-background/40 border border-white/5 space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                    <span>Llama3 Availability</span>
                    <span className="text-emerald-500">Online</span>
                  </div>
                  <Progress value={100} className="h-1 bg-secondary" />
                </div>
                <div className="p-4 rounded-2xl bg-background/40 border border-white/5 space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                    <span>Llava (Vision) Link</span>
                    <span className="text-emerald-500">Online</span>
                  </div>
                  <Progress value={100} className="h-1 bg-secondary" />
                </div>
              </div>

              <div className="pt-6">
                <Link href="/chat" className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group">
                  <Terminal className="h-5 w-5 group-hover:animate-pulse" />
                  Access Neural Terminal
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Security Matrix
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Neural Firewall", status: "Enabled" },
                    { label: "Data Isolation", status: "Active" },
                    { label: "Local Cryptography", status: "Secured" },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-mono text-emerald-500">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-4 bg-accent/5 border-accent/20">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" />
                  System Telemetry
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>VRAM ALLOCATION</span>
                      <span>8.2 GB</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>INFERENCE LATENCY</span>
                      <span>124ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Agents", icon: Cpu, href: "/agents", desc: "Specialist Nodes" },
              { label: "Memory", icon: Database, href: "/memory", desc: "Semantic Vault" },
              { label: "Archives", icon: Terminal, href: "/files", desc: "Knowledge Base" },
              { label: "Metrics", icon: Activity, href: "/monitor", desc: "Health Data" },
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-all group"
              >
                <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                <h4 className="font-bold text-sm">{item.label}</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
