import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-tech z-50 flex flex-col border-l border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-accent/5">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-brand-accent" />
                <h2 className="text-xl font-bold uppercase tracking-widest glow-text">Inventory</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:text-brand-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingCart size={64} className="mb-4" />
                  <p className="text-lg font-bold uppercase tracking-widest">Buffer Empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-sm border border-white/10 cyber-border">
                    <div className="w-20 h-20 bg-black/40 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-lighten" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold uppercase tracking-wider text-sm">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-red-500/50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[9px] text-brand-accent uppercase tracking-widest mb-2 opacity-50">{item.brand}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-sm px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="hover:text-brand-accent"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="hover:text-brand-accent"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-mono font-bold text-brand-accent">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-brand-surface border-t border-white/10 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold">Total Credit</span>
                  <span className="text-2xl font-mono font-bold text-brand-accent glow-text">${total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-accent text-brand-bg py-4 rounded-sm font-bold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Execute Transaction
                </button>
                <div className="flex justify-center gap-4 opacity-30">
                   <div className="w-1 h-1 bg-brand-accent rounded-full animate-ping"></div>
                   <div className="w-1 h-1 bg-brand-accent rounded-full animate-ping delay-75"></div>
                   <div className="w-1 h-1 bg-brand-accent rounded-full animate-ping delay-150"></div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
