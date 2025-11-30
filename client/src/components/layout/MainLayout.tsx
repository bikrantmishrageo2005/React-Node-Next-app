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
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarItem = ({ icon: Icon, label, href, active }: any) => (
  <Link href={href}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-r-full cursor-pointer transition-all duration-300 group",
      active 
        ? "bg-neon-cyan/10 border-l-4 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.2)]" 
        : "text-gray-400 hover:bg-white/5 hover:text-white hover:pl-6"
    )}>
      <Icon size={20} className={cn("transition-all", active && "animate-pulse")} />
      <span className="font-rajdhani font-semibold tracking-wider text-lg">{label}</span>
    </div>
  </Link>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex font-sans selection:bg-neon-cyan selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('@assets/generated_images/futuristic_cyber_city_interface_background.png')] bg-cover bg-center opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanline opacity-20" />

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full z-40 bg-black/80 backdrop-blur-xl border-r border-white/10 transition-all duration-500 ease-out w-64 pt-20",
        !sidebarOpen && "-translate-x-64"
      )}>
        <div className="flex flex-col gap-2 pr-4">
          <div className="px-6 mb-4 text-xs text-gray-500 font-bold uppercase tracking-widest">Main Modules</div>
          <SidebarItem icon={LayoutDashboard} label="Control Hub" href="/" active={location === "/"} />
          <SidebarItem icon={Layers} label="Pollution Matrix" href="/pollution-types" active={location === "/pollution-types"} />
          <SidebarItem icon={MapIcon} label="Global Map View" href="/map" active={location === "/map"} />
          
          <div className="px-6 mb-4 mt-6 text-xs text-gray-500 font-bold uppercase tracking-widest">System Core</div>
          <SidebarItem icon={Activity} label="Deep Analysis" href="/analysis" active={location === "/analysis"} />
          <SidebarItem icon={Shield} label="Guardian Grid" href="/guardians" active={location === "/guardians"} />
          <SidebarItem icon={Zap} label="Omega Core" href="/omega" active={location === "/omega"} />
        </div>

        <div className="absolute bottom-8 left-0 w-full px-6">
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
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
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
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search system..." 
                className="bg-transparent border-none outline-none text-sm w-32 text-white placeholder:text-gray-600 font-rajdhani"
              />
            </div>
            <button className="p-2 relative hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-neon-cyan">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-red rounded-full animate-ping" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple border border-white/20" />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
