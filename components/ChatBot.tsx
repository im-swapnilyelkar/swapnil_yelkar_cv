
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { agentService } from '../services/geminiService';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Summarize Swapnil's architectural impact",
  "Explain his Micro-frontend approach",
  "How does he handle legacy migrations?",
  "Draft a cover letter for a Lead UI role",
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: "Neural links established. I am Swapnil's Career Proxy. What data do you require?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-career-agent', handleOpen);
    return () => window.removeEventListener('open-career-agent', handleOpen);
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setMessages(prev => [...prev, { role: 'agent', content: '' }]);

    let fullResponse = '';
    try {
      const stream = agentService.askAgentStream(text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: 'agent', content: fullResponse };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="chat-container" className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="glass w-[350px] sm:w-[650px] h-[700px] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-cyan-500/20 flex flex-col animate-in fade-in zoom-in duration-500">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/40 backdrop-blur-3xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-[1px]">
                 <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                 </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">Career Proxy AI</h3>
                <p className="text-[9px] text-cyan-400 uppercase tracking-[0.2em] font-bold">Synchronized // 2.5.0</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[95%] p-2 rounded-3xl text-[14px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/10 text-cyan-100 border border-cyan-500/20 px-6 py-4' 
                      : 'text-slate-200 markdown-content'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ReactMarkdown>{msg.content || (isTyping && i === messages.length - 1 ? "..." : "")}</ReactMarkdown>
                  )}
                  {isTyping && i === messages.length - 1 && !msg.content && (
                    <div className="flex items-center gap-2 py-1">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/5 bg-slate-900/40 backdrop-blur-2xl space-y-4">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-[10px] px-3 py-2 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/20 border border-cyan-500/10 text-cyan-400/80 hover:text-cyan-400 transition-all text-left truncate"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query Architect Intelligence..."
                className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-5 py-5 text-sm focus:outline-none focus:border-cyan-500/50 pr-12 text-slate-200 transition-all shadow-inner backdrop-blur-md"
              />
              <button 
                onClick={() => handleSend()}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-400 transition-colors"
                disabled={isTyping}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-20 h-20 rounded-[2rem] bg-cyan-600 p-[1px] shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-all"
        >
          <div className="w-full h-full rounded-[2rem] bg-slate-950 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="absolute -top-14 right-0 glass px-4 py-2 rounded-2xl text-[10px] text-cyan-400 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase shadow-xl">Proxy Online</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
