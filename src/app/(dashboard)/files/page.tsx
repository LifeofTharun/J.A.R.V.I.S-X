
"use client";

import { Files, Upload, Search, FileText, Image as ImageIcon, MoreVertical, Database } from "lucide-react";

const documents = [
  { name: "system_architecture_v2.pdf", size: "2.4 MB", type: "PDF", date: "2 hours ago" },
  { name: "neural_network_specs.doc", size: "840 KB", type: "DOC", date: "5 hours ago" },
  { name: "workspace_screenshot.png", size: "4.1 MB", type: "IMG", date: "Yesterday" },
  { name: "automation_routines.py", size: "12 KB", type: "PY", date: "2 days ago" },
];

export default function FilesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Document Archive</h1>
          <p className="text-muted-foreground">Manage files and RAG training data for cognitive augmentation.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Upload className="h-5 w-5" />
          Ingest Knowledge
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass-panel rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-secondary/20 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">All Files</button>
              <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors pb-1">RAG Data</button>
              <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors pb-1">System Backups</button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Find in vault..." 
                className="bg-background/50 border border-white/5 rounded-lg pl-10 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary/50 w-48"
              />
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-background/50 border border-white/5 text-primary">
                    {doc.type === "IMG" ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{doc.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-muted-foreground font-mono">{doc.date}</span>
                  <button className="p-1 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-primary" />
              <h3 className="font-bold">RAG Pipeline</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Neural augmentation is currently indexed at 450MB of local documents. Query responses are 40% more accurate with current context.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-mono uppercase">
                <span>Indexing Progress</span>
                <span>100%</span>
              </div>
              <div className="h-1 w-full bg-secondary/50 rounded-full">
                <div className="h-full bg-emerald-500 w-full" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Storage Matrix</h4>
            <div className="relative h-48 flex items-center justify-center">
              {/* Simple CSS radial chart placeholder */}
              <div className="absolute inset-0 border-[12px] border-secondary/50 rounded-full" />
              <div className="absolute inset-0 border-[12px] border-primary border-t-transparent border-l-transparent rounded-full rotate-45" />
              <div className="text-center">
                <p className="text-2xl font-bold font-mono">82%</p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-tighter">Capacity Used</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Media: 4.2GB</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary" />
                <span>System: 1.1GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
