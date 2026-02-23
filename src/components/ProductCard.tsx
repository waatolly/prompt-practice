import React from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-brand-surface rounded-sm overflow-hidden cyber-border glow-border transition-all duration-300"
    >
      {product.isNew && (
        <div className="absolute top-4 left-4 z-10 bg-brand-accent text-brand-bg text-[9px] font-bold uppercase tracking-widest px-2 py-1 flex items-center gap-1">
          <div className="w-1 h-1 bg-brand-bg rounded-full animate-pulse"></div>
          Live Signal
        </div>
      )}
      
      <div 
        className="aspect-square overflow-hidden bg-black/40 cursor-pointer relative"
        onClick={() => onViewDetails(product)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-60"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-lighten opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <div className="font-mono text-[10px] text-brand-accent opacity-50">ID: {product.id.padStart(4, '0')}</div>
           <div className="w-8 h-8 border border-brand-accent/30 flex items-center justify-center">
              <div className="w-1 h-1 bg-brand-accent"></div>
           </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-brand-accent font-bold mb-1 opacity-70">{product.brand}</p>
            <h3 className="text-xl font-bold tracking-tight glow-text">
              {product.name}
            </h3>
          </div>
          <p className="font-mono font-bold text-xl text-brand-accent">${product.price}</p>
        </div>

        <p className="text-xs text-brand-text/50 line-clamp-2 mb-6 h-8 font-light">
          {product.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-brand-accent text-brand-bg py-3 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <Plus size={14} />
            Initialize
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
