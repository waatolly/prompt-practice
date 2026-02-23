import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Truck, RotateCcw, Cpu, Smartphone, Battery, Camera } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-brand-surface w-full max-w-5xl max-h-[90vh] rounded-sm overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,240,255,0.1)] border border-white/10 cyber-border"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/5 backdrop-blur-md rounded-sm flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg transition-all border border-white/10"
          >
            <X size={20} />
          </button>

          <div className="w-full md:w-1/2 bg-black/40 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10"></div>
            <motion.img
              layoutId={`img-${product.id}`}
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[400px] object-contain relative z-10 mix-blend-lighten"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-brand-surface">
            <div className="mb-8">
              <p className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-2 opacity-70">{product.brand}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight glow-text">{product.name}</h2>
              <p className="text-3xl font-mono font-bold text-brand-accent">${product.price}</p>
            </div>

            <p className="text-brand-text/50 leading-relaxed mb-10 text-sm font-light uppercase tracking-wider">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 p-4 rounded-sm border border-white/5 flex items-center gap-3">
                <Smartphone className="text-brand-accent" size={18} />
                <div>
                  <p className="text-[9px] uppercase opacity-40 font-bold tracking-widest">Display</p>
                  <p className="text-[10px] font-bold uppercase">{product.specs.screen}</p>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-sm border border-white/5 flex items-center gap-3">
                <Cpu className="text-brand-accent" size={18} />
                <div>
                  <p className="text-[9px] uppercase opacity-40 font-bold tracking-widest">Processor</p>
                  <p className="text-[10px] font-bold uppercase">{product.specs.processor}</p>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-sm border border-white/5 flex items-center gap-3">
                <Camera className="text-brand-accent" size={18} />
                <div>
                  <p className="text-[9px] uppercase opacity-40 font-bold tracking-widest">Camera</p>
                  <p className="text-[10px] font-bold uppercase">{product.specs.camera}</p>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-sm border border-white/5 flex items-center gap-3">
                <Battery className="text-brand-accent" size={18} />
                <div>
                  <p className="text-[9px] uppercase opacity-40 font-bold tracking-widest">Battery</p>
                  <p className="text-[10px] font-bold uppercase">{product.specs.battery}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-brand-accent text-brand-bg py-5 rounded-sm font-bold text-sm uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-[0.98]"
              >
                Initialize Module
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-10">
              <div className="flex flex-col items-center text-center gap-3">
                <Truck size={16} className="text-brand-accent/50" />
                <span className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40">Sub-Light Express</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <ShieldCheck size={16} className="text-brand-accent/50" />
                <span className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40">Encryption Shield</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <RotateCcw size={16} className="text-brand-accent/50" />
                <span className="text-[8px] uppercase font-bold tracking-[0.2em] opacity-40">Rollback Protocol</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
