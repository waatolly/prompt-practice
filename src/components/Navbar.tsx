import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full glass-tech border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-tighter flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-brand-accent rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-bg rounded-sm -rotate-45"></div>
              </div>
              <span className="glow-text">MOBI<span className="text-brand-accent">CORE</span></span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
              <a href="#" className="hover:text-brand-accent hover:opacity-100 transition-all">Nexus</a>
              <a href="#" className="hover:text-brand-accent hover:opacity-100 transition-all">Modules</a>
              <a href="#" className="hover:text-brand-accent hover:opacity-100 transition-all">Network</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-brand-accent transition-colors">
              <Search size={18} />
            </button>
            <button className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
              <User size={18} />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 hover:text-brand-accent transition-colors relative"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-brand-bg text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 md:hidden hover:text-brand-accent transition-colors">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
