import { useState, useRef, useEffect } from "react";
import { Bot, Send, Mic, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AetherAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'AetherVision AI Online. Ready for query.' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");

    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: `Analyzing request: "${input}"... \nCalculating optimal urban intervention vectors based on current pollution telemetry. Suggest prioritizing localized smog tower deployment in Sector 7.` 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-110 transition-transform group"
      >
        <Bot className="text-white w-8 h-8 group-hover:animate-bounce" />
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-96 h-[500px] glass-panel border-neon-purple/30 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-neon-purple/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <h3 className="font-orbitron text-white text-sm tracking-wider">AETHER<span className="text-neon-purple">AI</span> ASSISTANT</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/40">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm font-rajdhani leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neon-purple/20 border border-neon-purple/30 text-white rounded-br-none' 
                      : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-none'
                  }`}>
                    {msg.role === 'system' && <Sparkles size={12} className="text-neon-cyan mb-1" />}
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
              <button type="button" className="p-2 text-gray-400 hover:text-neon-cyan transition-colors">
                <Mic size={18} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pollution protocols..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white font-rajdhani"
              />
              <button type="submit" className="p-2 text-neon-purple hover:text-white transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
