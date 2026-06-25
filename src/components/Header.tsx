import { useState } from 'react';
import { 
  ShoppingCart, Search, FileText, Store, Menu, X, HelpCircle,
  ChevronDown, Layers, Leaf, Gift, ShoppingBag, Sparkles, Wrench, Home
} from 'lucide-react';
import toplogosImg from '../assets/images/toplogos.png';
import { categories } from '../data';

interface HeaderProps {
  view: 'store' | 'document' | 'cart';
  setView: (view: 'store' | 'document' | 'cart') => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
}

export default function Header({ 
  view, 
  setView, 
  cartCount, 
  searchQuery, 
  setSearchQuery,
  activeCategory,
  setActiveCategory
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'landscaping': return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'gifts': return <Gift className="w-4 h-4 text-indigo-600" />;
      case 'food': return <ShoppingBag className="w-4 h-4 text-amber-600" />;
      case 'pooja': return <Sparkles className="w-4 h-4 text-saffron" />;
      case 'industrial': return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'home': return <Home className="w-4 h-4 text-rose-600" />;
      default: return <Layers className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategorySubtitle = (id: string) => {
    switch (id) {
      case 'landscaping': return 'Plants, saplings & garden setups';
      case 'gifts': return 'Handcrafted toys & return gifts';
      case 'food': return 'Cold-pressed oils & native foods';
      case 'pooja': return 'Genuine camphor, sambrani cups';
      case 'industrial': return 'Asian paints & hardware supplies';
      case 'home': return 'Beautiful ceramics & housewares';
      default: return 'Browse all available categories';
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (view !== 'store' && val.trim() !== '') {
      setView('store');
    }
  };

  const navigateTo = (destination: 'store' | 'document' | 'cart') => {
    setView(destination);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#e32924] text-white shadow-md border-b-2 border-[#facc15] transition-all">
      <div className="absolute inset-0 opacity-10 bg-temple-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => navigateTo('store')}
          >
            <img 
              src={toplogosImg} 
              alt="Swathanthra Logo" 
              className="h-8 sm:h-9 object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
            />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search equipment, nursery, paints..."
              className="w-full pl-10 pr-10 py-1.5 rounded-full bg-black/20 border border-temple-gold/30 text-white placeholder-temple-gold/60 focus:outline-none focus:border-temple-gold focus:bg-black/40 transition-colors text-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-temple-gold/60" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-temple-gold hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Links */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Category Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-serif tracking-wide font-bold text-sm transition-all cursor-pointer ${
                    dropdownOpen 
                      ? 'bg-saffron text-deep-maroon shadow-md' 
                      : 'hover:bg-white/10 text-temple-gold'
                  }`}
                  id="category-menu-button"
                >
                  <Menu className="w-4 h-4" />
                  <span>Categories</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <>
                    {/* Click backdrop to close */}
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-2xl border-2 border-temple-gold/40 p-2 z-50 text-gray-800 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs font-bold text-deep-maroon uppercase tracking-wider font-serif">Explore Departments</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setView('store');
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                              activeCategory === cat.id
                                ? 'bg-orange-50 text-deep-maroon font-bold border border-saffron/30'
                                : 'hover:bg-orange-50/40 text-gray-700 border border-transparent'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-orange-50 border border-orange-100 flex-shrink-0">
                              {getCategoryIcon(cat.id)}
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-tight">{cat.name}</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">{getCategorySubtitle(cat.id)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  setActiveCategory('all');
                  navigateTo('store');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-serif tracking-wide font-bold text-sm transition-all ${
                  view === 'store' && activeCategory === 'all'
                    ? 'bg-saffron text-deep-maroon shadow-md' 
                    : 'hover:bg-white/10 text-temple-gold'
                }`}
              >
                <Store className="w-4 h-4" />
                Store
              </button>

              <button
                onClick={() => navigateTo('document')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-serif tracking-wide font-bold text-sm transition-all ${
                  view === 'document' 
                    ? 'bg-saffron text-deep-maroon shadow-md' 
                    : 'hover:bg-white/10 text-temple-gold'
                }`}
              >
                <FileText className="w-4 h-4" />
                Business Profile
              </button>
            </div>

            {/* Shopping Cart button - Clickable to open cart */}
            <button 
              onClick={() => navigateTo('cart')}
              className={`relative p-2.5 rounded-full transition-all flex items-center justify-center hover:bg-white/10 border-2 ${
                view === 'cart' ? 'bg-saffron/10 border-saffron' : 'border-transparent'
              }`}
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-temple-gold hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-deep-maroon bg-saffron rounded-full border-2 border-deep-maroon shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-temple-gold hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slider/Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-saffron bg-[#c8221d] py-4 px-4 space-y-4 shadow-inner relative z-25">
          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-black/30 border border-temple-gold/30 text-white placeholder-temple-gold/60 focus:outline-none focus:border-temple-gold text-xs"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-temple-gold/60" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-2 text-xs text-temple-gold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveCategory('all');
                navigateTo('store');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold text-sm transition-all ${
                view === 'store' && activeCategory === 'all'
                  ? 'bg-saffron text-deep-maroon' 
                  : 'hover:bg-white/10 text-temple-gold'
              }`}
            >
              <Store className="w-4 h-4" />
              Store (All Products)
            </button>

            {/* Mobile Categories accordion style */}
            <div className="px-2 py-1.5 bg-black/10 rounded-2xl border border-white/5 space-y-1">
              <p className="text-[10px] font-bold text-white/50 px-2 py-1 uppercase tracking-widest font-serif">Browse Categories</p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    navigateTo('store');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-serif font-medium transition-all ${
                    view === 'store' && activeCategory === cat.id
                      ? 'bg-saffron text-deep-maroon font-bold'
                      : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div className="p-1 rounded bg-white/10 flex-shrink-0">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => navigateTo('cart')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-serif font-bold text-sm transition-all ${
                view === 'cart' 
                  ? 'bg-saffron text-deep-maroon' 
                  : 'hover:bg-white/10 text-temple-gold'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4" />
                Shopping Cart
              </div>
              {cartCount > 0 && (
                <span className="bg-saffron text-deep-maroon px-2 py-0.5 rounded-full text-xs font-black">
                  {cartCount} Items
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('document')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold text-sm transition-all ${
                view === 'document' 
                  ? 'bg-saffron text-deep-maroon' 
                  : 'hover:bg-white/10 text-temple-gold'
              }`}
            >
              <FileText className="w-4 h-4" />
              Business Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
