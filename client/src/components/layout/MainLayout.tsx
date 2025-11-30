import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Shield, 
  Zap, 
  Activity,
  Menu,
  X,
  Search,
  Bell,
  Layers,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import AetherBot from "@/components/ai/AetherBot";

const SidebarItem = ({ icon: Icon, label, href, active }: any) => (
  <Link href={href}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-r-full cursor-pointer transition-all duration-300 group",
      active 
        ? "bg-neon-cyan/10 border-l-4 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.2)]" 
        : "text-gray-400 hover:bg-white/5 hover:text-white hover:pl-6"
    )}>
      <Icon size={20} className={cn("transition-all", active && "animate-pulse")} />
      <span className="font-rajdhani font-semibold tracking-wider text-base">{label}</span>
    </div>
  </Link>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex font-sans selection:bg-neon-cyan selection:text-black">
      {/* Global Robot Assistant */}
      <AetherBot />

      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('@assets/generated_images/futuristic_cyber_city_interface_background.png')] bg-cover bg-center opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanline opacity-20" />

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full z-40 bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-500 ease-out w-72 pt-20 flex flex-col",
        !sidebarOpen && "-translate-x-72"
      )}>
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-2 scrollbar-hide">
          
          {/* City Hub Section */}
          <div>
            <div className="px-6 mb-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Local Operations</div>
            <SidebarItem icon={LayoutDashboard} label="City Control Hub" href="/" active={location === "/"} />
          </div>

          {/* National Hub Section */}
          <div>
            <div className="px-6 mb-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">National Operations</div>
            <SidebarItem icon={Globe} label="National Control Hub" href="/national" active={location === "/national"} />
          </div>

          {/* Modules Section */}
          <div>
            <div className="px-6 mb-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">System Modules</div>
            <SidebarItem icon={Layers} label="Pollution Matrix" href="/pollution-types" active={location === "/pollution-types"} />
            <SidebarItem icon={Activity} label="Deep Analysis" href="/analysis" active={location === "/analysis"} />
            <SidebarItem icon={Shield} label="Guardian Grid" href="/guardians" active={location === "/guardians"} />
            <SidebarItem icon={Zap} label="Omega Core" href="/omega" active={location === "/omega"} />
          </div>
        </div>

        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
            <h4 className="text-neon-cyan font-orbitron text-xs mb-2">SYSTEM STATUS</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs text-gray-400 font-rajdhani">System Online - Stable</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 relative z-10 transition-all duration-500 ease-out flex flex-col h-screen overflow-hidden",
        sidebarOpen ? "ml-72" : "ml-0"
      )}>
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg text-neon-cyan transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="font-orbitron text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Aether<span className="text-neon-cyan">Vision</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-neon-cyan/50 transition-colors">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="bg-transparent border-none outline-none text-sm w-32 text-white placeholder:text-gray-600 font-rajdhani focus:w-48 transition-all"
              />
            </div>
            <button className="p-2 relative hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-neon-cyan">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-red rounded-full animate-ping" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple border border-white/20 shadow-[0_0_10px_rgba(0,243,255,0.3)]" />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
          <div className="max-w-[1600px] mx-auto pb-20">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
