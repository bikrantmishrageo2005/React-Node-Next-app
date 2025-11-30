import { Search, MapPin, Cpu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CityInputProps {
  onSearch: (city: string) => void;
  className?: string;
}

export default function CityInput({ onSearch, className }: CityInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl mx-auto group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative flex items-center bg-black rounded-lg p-4 border border-white/10">
        <MapPin className="text-neon-cyan mr-4 animate-pulse" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ENTER TARGET CITY COORDINATES OR NAME..."
          className="flex-1 bg-transparent border-none outline-none text-white font-orbitron placeholder:text-gray-600 text-lg uppercase tracking-widest"
        />
        <button 
          type="submit"
          className="ml-4 px-6 py-2 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan rounded hover:bg-neon-cyan hover:text-black transition-all font-rajdhani font-bold tracking-wider flex items-center gap-2"
        >
          <Cpu size={16} />
          INITIALIZE
        </button>
      </div>
    </form>
  );
}
