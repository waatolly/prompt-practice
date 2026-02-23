import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your MobiStore AI assistant. Looking for a new phone? Tell me what you need (e.g., 'I need a phone with a great camera' or 'What's the best phone for gaming?')." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are a helpful phone sales assistant for MobiStore. 
          Here is our current inventory: ${JSON.stringify(PRODUCTS)}.
          
          User asked: ${userMessage}
          
          Recommend specific phones from our inventory based on their needs. Be concise, professional, and helpful. Use markdown for formatting.` }] }
        ],
      });

      const assistantMessage = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-accent text-brand-bg rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-transform z-50 cyber-border"
      >
        <Bot size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-tech rounded-sm shadow-2xl flex flex-col overflow-hidden z-50 cyber-border"
          >
            <div className="p-4 bg-brand-accent/10 border-b border-brand-accent/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent animate-pulse" />
                <span className="font-bold uppercase tracking-widest text-xs glow-text">Neural Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-accent transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] p-3 rounded-sm text-xs tracking-wide leading-relaxed",
                    msg.role === 'user'
                      ? "bg-brand-accent/20 text-brand-accent ml-auto border border-brand-accent/30"
                      : "bg-white/5 text-brand-text mr-auto border border-white/10"
                  )}
                >
                  <div className="prose prose-sm prose-invert max-w-none">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-brand-accent/50 text-[10px] font-bold uppercase tracking-widest italic">
                  <Loader2 size={12} className="animate-spin" />
                  Processing Request...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2 bg-brand-surface">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-xs focus:border-brand-accent outline-none transition-colors font-mono"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="w-10 h-10 bg-brand-accent text-brand-bg rounded-sm flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { cn } from '../lib/utils';
