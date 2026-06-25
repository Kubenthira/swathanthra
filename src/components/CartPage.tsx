import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { 
  Trash2, Plus, Minus, ArrowLeft, CheckCircle, 
  MapPin, Phone, Mail, User, CreditCard, Sparkles, ShoppingBag, Truck
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  setView: (view: 'store' | 'document' | 'cart') => void;
}

export default function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  setView 
}: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout form states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formPostalCode, setFormPostalCode] = useState('');
  const [formDelivery, setFormDelivery] = useState('home'); // home | pickup
  const [formPayment, setFormPayment] = useState('cod'); // cod | upi | card
  
  // Order completed success state
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const promoDiscountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const deliveryCharge = formDelivery === 'pickup' ? 0 : subtotal > 1500 ? 0 : 150;
  const gstTax = Math.round((subtotal - promoDiscountAmount) * 0.18); // 18% standard GST
  const grandTotal = subtotal - promoDiscountAmount + deliveryCharge + gstTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const cleaned = promoCode.trim().toUpperCase();
    if (cleaned === 'FESTIVAL10') {
      setAppliedDiscount(10);
      setPromoSuccess('Promo applied! 10% discount credited.');
    } else if (cleaned === 'SWATHANTHRA') {
      setAppliedDiscount(15);
      setPromoSuccess('Welcome Promo! 15% discount credited.');
    } else if (cleaned === '') {
      setPromoError('Please enter a code.');
    } else {
      setPromoError('Invalid promo code. Try FESTIVAL10 or SWATHANTHRA');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail || (formDelivery === 'home' && !formAddress)) {
      alert('Please fill out all required fields.');
      return;
    }

    // Simulate placing order
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `SW-${new Date().getFullYear()}-${randomNum}`;
    setGeneratedOrderNumber(orderId);
    setOrderCompleted(true);
    onClearCart();
  };

  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-temple-gold/40 relative overflow-hidden bg-temple-pattern-card"
        >
          {/* Saffron accent header */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-saffron via-temple-gold to-saffron"></div>
          
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-temple-gold flex items-center justify-center text-saffron shadow-lg animate-pulse">
              <CheckCircle className="w-14 h-14" />
            </div>
          </div>

          <h2 className="font-serif font-bold text-deep-maroon text-3xl sm:text-4xl mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-600 font-medium mb-6">Dhanyavadah! Thank you for purchasing from Swathanthra.</p>
          
          {/* Receipt Card */}
          <div className="bg-orange-50/50 rounded-2xl border border-temple-gold/30 p-6 mb-8 text-left max-w-md mx-auto">
            <div className="flex justify-between items-center pb-4 border-b border-temple-gold/20 mb-4">
              <img src={logoImg} alt="Logo" className="h-8" />
              <span className="font-mono text-xs text-deep-maroon font-bold bg-saffron/20 px-2 py-1 rounded">OFFICIAL RECEIPT</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-deep-maroon">{generatedOrderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name:</span>
                <span className="font-semibold text-gray-800">{formName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contact Number:</span>
                <span className="font-semibold text-gray-800">{formPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Mode:</span>
                <span className="font-semibold capitalize text-gray-800">{formDelivery === 'pickup' ? 'Store Pickup (Trichy)' : 'Home Delivery'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span className="font-mono text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                  {formPayment === 'cod' ? 'COD - Pending' : 'Paid Via UPI/Card'}
                </span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-temple-gold/40 mt-4 pt-4 space-y-2">
              <p className="text-xs text-center text-gray-500">
                A confirmation email has been sent to <span className="font-semibold">{formEmail}</span>
              </p>
              <p className="text-xs text-center text-saffron font-semibold font-serif">
                Estimated Delivery/Ready time: 24 to 48 Hours.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setView('store')}
              className="px-8 py-3 bg-deep-maroon hover:bg-saffron text-temple-gold hover:text-white rounded-full font-bold font-serif shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
            <button
              onClick={() => setView('document')}
              className="px-8 py-3 bg-white hover:bg-orange-50 text-deep-maroon border-2 border-temple-gold rounded-full font-bold shadow-md transition-all"
            >
              View Store Profile
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button link */}
      <button 
        onClick={() => setView('store')}
        className="flex items-center gap-2 text-deep-maroon hover:text-saffron font-serif font-bold mb-8 group transition-colors"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Divine Storefront
      </button>

      <div className="flex items-center gap-4 mb-10">
        <h1 className="font-serif text-4xl font-bold text-deep-maroon">Your Shopping Cart</h1>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-temple-gold to-transparent"></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-temple-gold/20 shadow-md p-8 bg-temple-pattern-card">
          <div className="w-20 h-20 mx-auto bg-orange-50 rounded-full flex items-center justify-center border-2 border-temple-gold/40 text-temple-gold/80 mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-deep-maroon mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Add beautiful and pure spiritual items, traditional garments, landscaping services, and home decor to your cart from our storefront.
          </p>
          <button
            onClick={() => setView('store')}
            className="bg-deep-maroon hover:bg-saffron text-temple-gold hover:text-white px-8 py-3 rounded-full font-serif font-bold shadow-md transition-all hover:scale-105"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list - 8/12 on large screens */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border-2 border-temple-gold/20 shadow-md overflow-hidden bg-temple-pattern-card">
              <div className="p-6 bg-deep-maroon text-temple-gold border-b-2 border-saffron flex justify-between items-center">
                <span className="font-serif font-bold text-lg">Items List ({cartItems.length})</span>
                <button 
                  onClick={onClearCart}
                  className="text-xs text-temple-gold/80 hover:text-white underline font-semibold tracking-wider uppercase"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-temple-gold/20 p-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 first:pt-0 last:pb-0">
                    {/* Image */}
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-orange-50 border border-temple-gold/30 flex-shrink-0 shadow-sm">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-deep-maroon text-base truncate">{item.product.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.product.description}</p>
                      <span className="text-saffron font-bold text-sm block mt-1">₹{item.product.price} each</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-orange-50/50 border border-temple-gold/30 rounded-full px-2 py-1 shadow-inner">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-deep-maroon hover:bg-temple-gold/20 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-bold text-deep-maroon text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-deep-maroon hover:bg-temple-gold/20 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total cost for this line-item */}
                      <div className="text-right min-w-[70px]">
                        <span className="font-bold text-deep-maroon text-base block">₹{item.product.price * item.quantity}</span>
                      </div>

                      {/* Delete icon */}
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Promo Box */}
            <div className="bg-white rounded-3xl border-2 border-temple-gold/20 p-6 shadow-md bg-temple-pattern-card">
              <h3 className="font-serif font-bold text-deep-maroon text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-saffron" />
                Available Offers & Coupons
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Enter code <span className="font-bold text-deep-maroon">FESTIVAL10</span> to get 10% off your spiritual essentials, or <span className="font-bold text-deep-maroon">SWATHANTHRA</span> for 15% off!
              </p>
              
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 rounded-full border border-temple-gold/40 text-deep-maroon placeholder-gray-400 focus:outline-none focus:border-saffron text-sm"
                />
                <button
                  type="submit"
                  className="bg-temple-gold hover:bg-saffron text-deep-maroon hover:text-white px-6 py-2.5 rounded-full font-serif font-bold shadow transition-all active:scale-95 text-sm"
                >
                  Apply
                </button>
              </form>
              
              {promoError && <p className="text-red-600 text-xs mt-2 font-medium">{promoError}</p>}
              {promoSuccess && <p className="text-emerald-700 text-xs mt-2 font-semibold flex items-center gap-1">✓ {promoSuccess}</p>}
            </div>
          </div>

          {/* Checkout & Summary Card - 5/12 */}
          <div className="lg:col-span-5 space-y-6">
            {!isCheckingOut ? (
              <div className="bg-white rounded-3xl border-2 border-temple-gold/20 shadow-lg overflow-hidden bg-temple-pattern-card p-6">
                <h3 className="font-serif font-bold text-deep-maroon text-xl mb-6 pb-3 border-b border-temple-gold/20">
                  Order Summary
                </h3>

                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal:</span>
                    <span className="font-medium text-gray-900">₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({appliedDiscount}%):</span>
                      <span>-₹{promoDiscountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18% inclusive/applied):</span>
                    <span className="font-medium text-gray-900">₹{gstTax}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Trichy Local Delivery:</span>
                    <span className="font-medium text-gray-900">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-[10px] text-gray-400 -mt-2">
                      💡 Free delivery on orders above ₹1,500
                    </p>
                  )}
                </div>

                <div className="border-t-2 border-dashed border-temple-gold/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-lg text-deep-maroon">Grand Total:</span>
                    <span className="font-bold text-2xl text-saffron">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[#e32924] hover:bg-saffron text-white py-4 rounded-full font-serif font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-[#facc15]/60 shadow-xl overflow-hidden bg-temple-pattern-card">
                <div className="bg-deep-maroon text-temple-gold p-6 border-b-2 border-saffron">
                  <h3 className="font-serif font-bold text-xl">Divine Order Checkout</h3>
                  <p className="text-xs text-white/80 mt-1">Please provide details to complete your order.</p>
                </div>

                <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-saffron" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-temple-gold/40 text-sm focus:outline-none focus:border-saffron bg-orange-50/20"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-saffron" /> Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="10-digit mobile number"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-temple-gold/40 text-sm focus:outline-none focus:border-saffron bg-orange-50/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-saffron" /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. anand@gmail.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-temple-gold/40 text-sm focus:outline-none focus:border-saffron bg-orange-50/20"
                    />
                  </div>

                  {/* Delivery Mode Selector */}
                  <div>
                    <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-2">
                      Fulfillment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormDelivery('home')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          formDelivery === 'home' 
                            ? 'border-saffron bg-orange-50/50 text-deep-maroon' 
                            : 'border-gray-200 text-gray-500 hover:bg-orange-50/20'
                        }`}
                      >
                        <Truck className="w-4 h-4 mb-0.5" />
                        Home Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormDelivery('pickup')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          formDelivery === 'pickup' 
                            ? 'border-saffron bg-orange-50/50 text-deep-maroon' 
                            : 'border-gray-200 text-gray-500 hover:bg-orange-50/20'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4 mb-0.5" />
                        Store Pickup
                      </button>
                    </div>
                  </div>

                  {/* Shipping Address - only if Home Delivery */}
                  {formDelivery === 'home' && (
                    <div>
                      <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-saffron" /> Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        required
                        rows={2}
                        placeholder="Street, Landmark, City (e.g. Uyyakondan Thirumalai, Trichy)"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-temple-gold/40 text-sm focus:outline-none focus:border-saffron bg-orange-50/20"
                      />
                      <div className="mt-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Postal Pin Code
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. 620003"
                          value={formPostalCode}
                          onChange={(e) => setFormPostalCode(e.target.value)}
                          className="w-full px-4 py-1.5 rounded-xl border border-temple-gold/40 text-xs focus:outline-none focus:border-saffron bg-orange-50/20"
                        />
                      </div>
                    </div>
                  )}

                  {/* Payment Mode Selector */}
                  <div>
                    <label className="block text-xs font-bold text-deep-maroon uppercase tracking-wider mb-2">
                      Payment Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormPayment('cod')}
                        className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                          formPayment === 'cod' 
                            ? 'border-saffron bg-saffron/10 text-deep-maroon font-extrabold' 
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormPayment('upi')}
                        className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                          formPayment === 'upi' 
                            ? 'border-saffron bg-saffron/10 text-deep-maroon font-extrabold' 
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        BHIM / UPI App
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormPayment('card')}
                        className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                          formPayment === 'card' 
                            ? 'border-saffron bg-saffron/10 text-deep-maroon font-extrabold' 
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        Credit/Debit Card
                      </button>
                    </div>
                  </div>

                  {/* Grand total showing dynamically inside the checkout */}
                  <div className="bg-orange-50 rounded-2xl p-4 border border-temple-gold/30 flex justify-between items-center mt-6">
                    <span className="font-serif font-bold text-sm text-deep-maroon">Amount Due:</span>
                    <span className="font-bold text-xl text-saffron">₹{grandTotal}</span>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-serif font-bold text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-serif font-bold text-sm shadow-md transition-all uppercase tracking-wide"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
