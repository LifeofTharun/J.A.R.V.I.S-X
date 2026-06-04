
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VoiceOrb } from "@/components/voice/VoiceOrb";
import { Bell, Search, ShieldCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border px-8 glass-panel z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Query core database..." 
                className="w-full bg-secondary/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider">Secured</span>
            </div>
            
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            </button>
            
            <div className="h-8 w-px bg-border mx-2" />
            
            <VoiceOrb />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sidebar via-background to-background">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
