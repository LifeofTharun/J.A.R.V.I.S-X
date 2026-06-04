
"use client";

import { 
  Settings, 
  User, 
  Shield, 
  Zap, 
  Mic, 
  Database, 
  Bell, 
  Globe,
  Check
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground">Adjust J.A.R.V.I.S X core parameters and neural routing.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          {saveStatus ? <Check className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          {saveStatus ? "Synchronized" : "Apply Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          {[
            { label: "Profile", icon: User },
            { label: "Neural Models", icon: Zap },
            { label: "Voice & Audio", icon: Mic },
            { label: "Privacy", icon: Shield },
            { label: "Knowledge Base", icon: Database },
            { label: "Notifications", icon: Bell },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-secondary transition-colors group text-left">
              <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-panel p-8 rounded-2xl space-y-8">
            <section className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Neural Inference</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium">Use Local DeepSeek for Coding</p>
                    <p className="text-xs text-muted-foreground">Increases privacy but requires 12GB+ VRAM.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium">Cloud Fallback (Gemini Pro)</p>
                    <p className="text-xs text-muted-foreground">Use cloud if local latency exceeds 5s.</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Inference Speed Limit</label>
                  <input type="range" className="w-full h-1.5 bg-secondary rounded-full appearance-none accent-primary" />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Low Power</span>
                    <span>Unrestricted</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Voice Interaction</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium">Continuous Wake Word Detection</p>
                    <p className="text-xs text-muted-foreground">Listening for "Hey Jarvis" in background.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium">Holographic Orb Visualization</p>
                    <p className="text-xs text-muted-foreground">Show animated UI feedback when speaking.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">System Integration</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium">Browser Automation Bridge</p>
                    <p className="text-xs text-muted-foreground">Allow J.A.R.V.I.S to manage browser sessions.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
