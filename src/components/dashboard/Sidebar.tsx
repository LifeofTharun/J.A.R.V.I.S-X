
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MessageSquare, 
  Cpu, 
  Database, 
  Files, 
  Activity, 
  Settings, 
  LayoutDashboard,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Terminal", href: "/chat", icon: MessageSquare },
  { name: "Agents", href: "/agents", icon: Cpu },
  { name: "Memory", href: "/memory", icon: Database },
  { name: "Archive", href: "/files", icon: Files },
  { name: "Metrics", href: "/monitor", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-sidebar border-border">
      <div className="flex h-20 items-center px-6 gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xl font-headline font-bold tracking-tighter text-gradient">
          J.A.R.V.I.S X
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-secondary hover:text-foreground",
            pathname === "/settings" && "bg-secondary text-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <div className="mt-4 p-3 rounded-xl glass-panel text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          System Active: Core 1.0.4
        </div>
      </div>
    </div>
  );
}
