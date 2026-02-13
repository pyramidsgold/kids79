
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useContent } from '../App';

const AnisBot: React.FC = () => {
  const { t } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: t.anis.systemInstruction,
          temperature: 0.7,
        },
      });

      const botText = response.text || "عذراً، أواجه صعوبة في الاتصال بالمرصد حالياً.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "أواجه ضغطاً في الطلبات حالياً، يرجى المحاولة لاحقاً." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 left-10 z-[500] font-cairo text-right">
      {isOpen ? (
        <div className="w-[400px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-[3rem] shadow-4xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          <header className="p-8 bg-red-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-black text-xl">أنيس</h4>
                <p className="text-[10px] opacity-70">رفيقك التشريعي الذكي</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
              <X size={24} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800 text-zinc-400 text-sm leading-relaxed">
              {t.anis.welcome}
            </div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-red-600/20 text-red-600'}`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-zinc-800 text-zinc-200 rounded-tr-none' : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-600 flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="p-5 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-[2rem] rounded-tl-none text-xs animate-pulse">
                  {t.anis.thinking}
                </div>
              </div>
            )}
          </div>

          <footer className="p-6 bg-zinc-900 border-t border-zinc-800 flex gap-4">
            <button onClick={handleSend} className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center hover:bg-red-700 transition-all shadow-xl">
              <Send size={24} className="rotate-180" />
            </button>
            <input 
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-white text-sm focus:border-red-600 outline-none transition-all"
              placeholder={t.anis.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </footer>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-red-600 text-white rounded-3xl shadow-4xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all group relative"
        >
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-zinc-950 rounded-full animate-ping"></div>
          <Bot size={36} className="group-hover:animate-pulse" />
          <div className="absolute right-24 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-3xl">
            تحدث مع أنيس الآن <Sparkles size={14} className="inline mr-2 text-amber-500" />
          </div>
        </button>
      )}
    </div>
  );
};

export default AnisBot;
