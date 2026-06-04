
"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceOrb() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="relative flex items-center justify-center group">
      {/* Glow Rings */}
      <div className={cn(
        "absolute h-12 w-12 rounded-full border border-primary/40 animate-ping",
        !isListening && "hidden"
      )} />
      <div className={cn(
        "absolute h-10 w-10 rounded-full border border-primary/60 animate-pulse",
        !isListening && "hidden"
      )} />
      
      {/* Main Orb */}
      <button
        onClick={() => setIsListening(!isListening)}
        className={cn(
          "relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden",
          isListening 
            ? "bg-primary shadow-[0_0_20px_rgba(130,130,242,0.6)]" 
            : "bg-secondary hover:bg-secondary/80 border border-white/5"
        )}
      >
        <Mic className={cn(
          "h-5 w-5 transition-colors",
          isListening ? "text-primary-foreground animate-pulse" : "text-muted-foreground"
        )} />
        
        {/* Animated Internal Waves */}
        {isListening && (
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-white/50 to-transparent animate-[scroll_3s_linear_infinite]" />
          </div>
        )}
      </button>

      <div className="absolute top-full mt-2 hidden group-hover:block bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded border border-border whitespace-nowrap uppercase tracking-widest font-mono">
        {isListening ? "Listening..." : "Initialize Voice"}
      </div>
    </div>
  );
}
