
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Terminal as TerminalIcon } from "lucide-react";
import { jarvisIntelligentConversation } from "@/ai/flows/jarvis-intelligent-conversation-flow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date | null;
};

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "J.A.R.V.I.S X initialized. System check complete. All neural pathways online. How can I assist your operations today?",
      timestamp: null, // Initialize with null to avoid hydration mismatch
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Set initial message timestamp on mount
    setMessages(prev => prev.map(m => m.id === "1" ? { ...m, timestamp: new Date() } : m));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await jarvisIntelligentConversation({ message: input });
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TerminalIcon className="h-8 w-8 text-primary" />
            Neural Terminal
          </h1>
          <p className="text-muted-foreground font-mono text-sm">SECURE_CHANNEL_ID: 82-X-99</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-white/5">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-primary">Quantum Link Established</span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-4 max-w-[85%] group animate-in fade-in slide-in-from-bottom-2",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
                msg.role === "user" 
                  ? "bg-primary/20 border-primary/40" 
                  : "bg-secondary border-white/10"
              )}>
                {msg.role === "assistant" ? (
                  <Bot className="h-5 w-5 text-primary" />
                ) : (
                  <User className="h-5 w-5 text-foreground" />
                )}
              </div>
              
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary/40 backdrop-blur-sm border border-white/5 text-foreground"
              )}>
                {msg.content}
                <div className={cn(
                  "text-[10px] mt-1 font-mono opacity-50",
                  msg.role === "user" ? "text-right" : "text-left"
                )}>
                  {mounted && msg.timestamp ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%] mr-auto animate-pulse">
              <div className="h-8 w-8 rounded-lg bg-secondary border border-white/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-secondary/40 border border-white/5 flex gap-1 items-center">
                <div className="h-1 w-1 bg-primary rounded-full animate-bounce" />
                <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-background/50">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Inject command or query..."
              className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-1 focus:ring-primary/50 outline-none transition-all min-h-[50px] max-h-[200px] resize-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 h-8 w-8 p-0 rounded-lg bg-primary hover:bg-primary/90 transition-all active:scale-95"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-2 px-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1"><kbd className="bg-secondary px-1 rounded">ENTER</kbd> TO SEND</span>
            <span className="flex items-center gap-1"><kbd className="bg-secondary px-1 rounded">SHIFT+ENTER</kbd> FOR NEW LINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
