
"use client";

import { useState, useEffect } from "react";
import { 
  Cpu, 
  Search, 
  Code, 
  Globe, 
  Database, 
  Eye, 
  FileText,
  Play,
  Pause,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const agents = [
  { 
    name: "Master Router", 
    type: "Orchestration", 
    status: "active", 
    load: 12, 
    icon: Cpu,
    log: "Processing incoming requests... Routed to Vision Agent"
  },
  { 
    name: "Researcher", 
    type: "Intelligence", 
    status: "active", 
    load: 45, 
    icon: Search,
    log: "Synthesizing quantum physics data from 12 sources"
  },
  { 
    name: "Developer", 
    type: "Coding", 
    status: "idle", 
    load: 0, 
    icon: Code,
    log: "Unit testing suite completed successfully"
  },
  { 
    name: "Automator", 
    type: "Execution", 
    status: "active", 
    load: 88, 
    icon: Globe,
    log: "Executing multi-stage browser automation for analytics"
  },
  { 
    name: "Memory Controller", 
    type: "Knowledge", 
    status: "active", 
    load: 5, 
    icon: Database,
    log: "Optimizing vector store indices"
  },
  { 
    name: "Visual Cortex", 
    type: "Perception", 
    status: "active", 
    load: 32, 
    icon: Eye,
    log: "Analyzing primary monitor workspace for context"
  },
];

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false);
  const [randomIds, setRandomIds] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate random IDs only on client to avoid hydration mismatch
    setRandomIds([...Array(5)].map(() => (Math.random() * 1000).toFixed(0)));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Neural Agent Mesh</h1>
          <p className="text-muted-foreground">Monitoring active cognitive processes across 7 specialist nodes.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-white/5 transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm font-medium">Re-sync All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.name} className="glass-panel p-6 rounded-2xl space-y-4 hover:border-primary/50 transition-all group">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <agent.icon className="h-6 w-6 text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                agent.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
              )}>
                <div className={cn("h-1.5 w-1.5 rounded-full", agent.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground")} />
                {agent.status}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">{agent.name}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{agent.type}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Neural Load</span>
                <span className="text-primary">{agent.load}%</span>
              </div>
              <Progress value={agent.load} className="h-1.5" />
            </div>

            <div className="p-3 rounded-lg bg-background/50 border border-white/5 font-mono text-[10px] text-muted-foreground line-clamp-1 italic">
              {agent.log}
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-white/5 text-xs font-medium flex items-center justify-center gap-2 transition-colors">
                <Play className="h-3 w-3" />
                Resume
              </button>
              <button className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 border border-white/5 transition-colors">
                <Pause className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Master Execution Log
        </h3>
        <div className="space-y-3 font-mono text-[11px] max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {mounted && randomIds.map((id, i) => (
            <div key={i} className="flex gap-4 p-2 rounded border border-white/5 hover:bg-secondary/30 transition-colors">
              <span className="text-primary/50 shrink-0">[14:32:4{i}]</span>
              <span className="text-emerald-500/80 uppercase shrink-0">info</span>
              <span className="text-foreground/80">Task execution complete for request #{id}. Cognitive state reset to IDLE.</span>
            </div>
          ))}
          {!mounted && <div className="p-2 text-muted-foreground opacity-50">Initializing log sequence...</div>}
        </div>
      </div>
    </div>
  );
}
