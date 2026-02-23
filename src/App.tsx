/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ProductDetails } from './components/ProductDetails';
import { AIAssistant } from './components/AIAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Smartphone, Filter, ChevronDown } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterBrand, setFilterBrand] = useState<string>('All');

  const brands = useMemo(() => ['All', ...new Set(PRODUCTS.map(p => p.brand))], []);

  const filteredProducts = useMemo(() => {
    if (filterBrand === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.brand === filterBrand);
  }, [filterBrand]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Guest User', // In a real app, this would come from a form or auth
          items: cartItems,
          total: total
        })
      });
      
      if (response.ok) {
        alert('Transaction Executed Successfully! Your order has been logged in the neural network.');
        setCartItems([]);
        setIsCartOpen(false);
      } else {
        alert('Transaction Failed. Please check your connection to the core.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Critical System Error during transaction.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <div className="scanline"></div>
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-brand-accent/20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg z-10"></div>
            <img 
              src="https://picsum.photos/seed/cyber/1920/1080?blur=5" 
              className="w-full h-full object-cover opacity-40 scale-110"
              alt="Background"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-accent/30 rounded-full mb-8 bg-brand-accent/5 backdrop-blur-sm">
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">System Online // v4.0.2</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter leading-none glow-text">
                NEURAL<br />
                <span className="text-brand-accent italic">INTERFACE.</span>
              </h1>
              
              <p className="text-sm md:text-base text-brand-text/60 mb-12 max-w-xl mx-auto font-light tracking-[0.1em] uppercase">
                Synchronize your life with the next generation of mobile computing. Pure performance. Zero latency.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <button className="relative group px-10 py-4 bg-brand-accent text-brand-bg font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                  <span className="relative z-10">Access Catalog</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
                  Core Specs
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-bg to-transparent"></div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-brand-accent"></div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Available Modules</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tight">Hardware Stack</h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setFilterBrand(brand)}
                  className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    filterBrand === brand 
                      ? 'bg-brand-accent border-brand-accent text-brand-bg shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                      : 'bg-transparent border-white/10 text-white/50 hover:border-brand-accent/50 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        </section>

        {/* Tech Specs / Bento Section */}
        <section className="py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-accent/5 opacity-20 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="group">
                <div className="w-12 h-12 border border-brand-accent/30 flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-all">
                  <Smartphone className="text-brand-accent group-hover:text-brand-bg" size={24} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 glow-text">Quantum Core</h3>
                <p className="text-brand-text/40 text-xs leading-relaxed uppercase tracking-wider">
                  Next-gen processing units optimized for real-time neural processing and heavy multitasking.
                </p>
              </div>
              <div className="group">
                <div className="w-12 h-12 border border-brand-accent/30 flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-all">
                  <Smartphone className="text-brand-accent group-hover:text-brand-bg" size={24} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 glow-text">Optic Array</h3>
                <p className="text-brand-text/40 text-xs leading-relaxed uppercase tracking-wider">
                  Multi-spectrum sensor arrays capturing light beyond the visible range with extreme precision.
                </p>
              </div>
              <div className="group">
                <div className="w-12 h-12 border border-brand-accent/30 flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-all">
                  <Smartphone className="text-brand-accent group-hover:text-brand-bg" size={24} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 glow-text">Power Cell</h3>
                <p className="text-brand-text/40 text-xs leading-relaxed uppercase tracking-wider">
                  High-density solid-state energy storage providing days of operation on a single charge cycle.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-surface border-t border-white/5 py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold tracking-tighter mb-8 glow-text">
                MOBI<span className="text-brand-accent">CORE</span>
              </div>
              <p className="text-brand-text/40 text-xs uppercase tracking-widest leading-loose max-w-sm mb-10">
                The definitive hardware interface for the digital frontier. Engineered for those who demand absolute performance.
              </p>
              <div className="flex gap-6">
                {['LN', 'GH', 'DS', 'IG'].map(s => (
                  <div key={s} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent cursor-pointer transition-all text-[10px] font-bold">
                    {s}
                  </div>
                ))}
              </div>
            </div>
            
            {['Protocol', 'System'].map((title, i) => (
              <div key={title}>
                <h4 className="font-bold mb-8 uppercase tracking-[0.3em] text-[10px] text-brand-accent">{title}</h4>
                <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-brand-text/40">
                  {i === 0 ? (
                    <>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Hardware</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Firmware</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Modules</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Access</a></li>
                    </>
                  ) : (
                    <>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Network</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Security</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Terms</a></li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-brand-text/30 font-bold">
            <p>© 2024 MOBICORE SYSTEMS // ALL RIGHTS RESERVED.</p>
            <div className="flex gap-12">
              <span>Encrypted Connection</span>
              <span>Secure Terminal</span>
            </div>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ProductDetails 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <AIAssistant />
    </div>
  );
}
