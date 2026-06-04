
"use client";

import { Database, Search, History, Brain, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const memories = [
  { id: "1", type: "Preference", content: "User prefers Dark Mode and high-density UI layouts.", date: "2 hours ago", importance: "High" },
  { id: "2", type: "Context", content: "Working on J.A.R.V.I.S X project documentation.", date: "5 hours ago", importance: "Medium" },
  { id: "3", type: "Fact", content: "The current system version is 1.0.4 neural core.", date: "Yesterday", importance: "Low" },
  { id: "4", type: "Interaction", content: "Discussed quantum computing simulation requirements.", date: "2 days ago", importance: "Medium" },
  { id: "5", type: "Preference", content: "User prefers Python for all automation scripts.", date: "3 days ago", importance: "High" },
];

export default function MemoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recursive Memory Core</h1>
          <p className="text-muted-foreground">Managing semantic associations and long-term knowledge retention.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search recollections..." 
              className="bg-secondary/50 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50 w-64"
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
            Consolidate Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Semantic Updates
            </h3>
            <div className="space-y-4">
              {memories.map((mem) => (
                <div key={mem.id} className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-start justify-between group hover:border-primary/30 transition-all">
                  <div className="flex gap-4">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      mem.importance === "High" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    )}>
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-primary/80">{mem.type}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {mem.date}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{mem.content}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Vault Statistics
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-secondary/30 border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total Vector Entries</p>
                <p className="text-2xl font-bold font-mono">12,482</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Database Size</p>
                <p className="text-2xl font-bold font-mono">1.2 GB</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Consistency Score</p>
                <p className="text-2xl font-bold font-mono text-emerald-500">99.2%</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="text-lg font-bold mb-2">Neural Optimization</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Background semantic consolidation will begin in 14 minutes to improve recall speed for the "Research" node.
            </p>
            <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-[progress_30s_linear_infinite]" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
