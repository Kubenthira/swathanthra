import { useState, useEffect } from 'react';
import Header from './components/Header';
import Storefront from './components/Storefront';
import BusinessProfile from './components/BusinessProfile';
import CartPage from './components/CartPage';
import logoImg from './assets/images/logo.png';
import { CartItem, Product } from './types';
import { ShoppingCart, Check, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'store' | 'document' | 'cart'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Load initial cart state from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<{ id: string; message: string; product?: Product }[]>([]);

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('sw_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToast = (message: string, product?: Product) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, product }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        addToast(`Increased quantity of ${product.name} in cart!`, product);
        return updated;
      } else {
        addToast(`Added ${product.name} to your cart!`, product);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        const itemToRemove = prevItems.find((item) => item.product.id === productId);
        if (itemToRemove) {
          addToast(`Removed ${itemToRemove.product.name} from cart.`);
        }
        return prevItems.filter((item) => item.product.id !== productId);
      }
      return prevItems.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    const itemToRemove = cartItems.find((item) => item.product.id === productId);
    if (itemToRemove) {
      addToast(`Removed ${itemToRemove.product.name} from cart.`);
    }
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-transparent">
      {/* Dynamic Header */}
      <Header 
        view={view} 
        setView={setView} 
        cartCount={cartCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {view === 'store' ? (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Storefront 
                onAddToCart={handleAddToCart} 
                searchQuery={searchQuery} 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </motion.div>
          ) : view === 'cart' ? (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <CartPage 
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                setView={setView}
              />
            </motion.div>
          ) : (
            <motion.div
              key="document"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BusinessProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Toast Notification System */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-2xl border-2 border-temple-gold pointer-events-auto overflow-hidden flex flex-col"
            >
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <Check className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Shopping Cart</p>
                  <p className="text-sm font-semibold text-deep-maroon font-serif mt-0.5">{toast.message}</p>
                </div>

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {view !== 'cart' && (
                <button
                  onClick={() => {
                    setView('cart');
                    removeToast(toast.id);
                  }}
                  className="bg-orange-50 border-t border-temple-gold/20 py-2.5 px-4 text-xs font-bold text-saffron flex items-center justify-between hover:bg-orange-100 transition-colors w-full"
                >
                  <span className="flex items-center gap-1.5 font-serif">
                    <ShoppingCart className="w-3.5 h-3.5 text-deep-maroon" />
                    Open Shopping Cart
                  </span>
                  <span className="flex items-center gap-1">
                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer styled to Temple Theme */}
      <footer className="bg-deep-maroon py-16 text-center text-temple-gold border-t-[8px] border-saffron relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-temple-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <img src={logoImg} alt="Swathanthra Logo" className="h-24 mb-6 drop-shadow-sm opacity-90" />
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-serif">
            <button onClick={() => setView('store')} className="hover:text-white transition-colors">Store Home</button>
            <span className="text-saffron">•</span>
            <button onClick={() => setView('document')} className="hover:text-white transition-colors">Business Profile</button>
            <span className="text-saffron">•</span>
            <button onClick={() => setView('cart')} className="hover:text-white transition-colors">Your Cart ({cartCount})</button>
          </div>

          <p className="text-xs text-white/50 max-w-md mx-auto mb-6">
            Swathanthra offers genuine pooja materials, nursery saplings, home decor, and infrastructure solutions with premium delivery service across Trichy and adjacent districts.
          </p>

          <p className="text-sm border-t border-temple-gold/30 pt-6 px-12 opacity-80">
            Thiruchirappalli, Tamil Nadu • © {new Date().getFullYear()} Swathanthra
          </p>
        </div>
      </footer>
    </div>
  );
}
