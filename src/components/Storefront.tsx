import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { categories, products } from '../data';
import { 
  ShoppingCart, Search, Info, Sparkles, ShieldCheck, 
  Truck, Gift, Palette, Leaf, Flame, ChevronRight, ChevronLeft,
  Play, Pause, Volume2, VolumeX,
  Star, CheckCircle2, ArrowRight, Clock, Heart, Award, 
  Users, MapPin, ThumbsUp, HelpCircle, X, Home, ArrowLeft,
  Wheat, Wrench, Sun, Flower
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import heroImg from '../assets/images/hero.png';
import vid1 from '../assets/images/videos/vid1.mp4';
import vid2 from '../assets/images/videos/vid2.mp4';
import vid3 from '../assets/images/videos/vid3.mp4';
import decorImg from '../assets/images/decor_1782390006555.jpg';
import { Product } from '../types';

const categoryHeroDetails: Record<string, {
  bgGradient: string;
  subtitle: string;
  description: string;
  accentText: string;
  tagline: string;
}> = {
  landscaping: {
    bgGradient: "from-emerald-900 via-emerald-950 to-stone-900 border-emerald-600/30",
    subtitle: "Professional Landscaping & Botanical Nursery",
    description: "Bring natural peace and verdant harmony to your home and commercial surroundings. From custom lawn blueprints and rich red-soil preparation to organic native flower saplings, our expert team provides end-to-end greening services across Trichy.",
    accentText: "text-emerald-400",
    tagline: "✦ ORGANIC & LOCAL ✦"
  },
  gifts: {
    bgGradient: "from-indigo-900 via-indigo-950 to-slate-900 border-indigo-600/30",
    subtitle: "Eco-Friendly Indian Toys & Traditional Crafts",
    description: "Preserving indigenous handcraft heritage. Our Mysore and Chennapatna toys are lovingly lathed from seasoned ivory wood and coated with lead-free turmeric, indigo, and organic plant extracts. Child-safe, durable, and culturally rich.",
    accentText: "text-indigo-400",
    tagline: "✦ 100% LEAD-FREE ARTISANAL ✦"
  },
  food: {
    bgGradient: "from-amber-950 via-[#3d1a04] to-stone-950 border-amber-600/30",
    subtitle: "Authentic Wood-Pressed Oils & Heritage Nutrition",
    description: "Revitalize your wellness with cold wood-pressed (Vaagai Chekku) groundnut oils, nutrient-packed multi-grain health mixes, and pure farm-fresh ingredients. Extracted slowly at low temperatures to lock in original taste and health benefits.",
    accentText: "text-amber-400",
    tagline: "✦ PURE COLD PRESSED ✦"
  },
  pooja: {
    bgGradient: "from-[#6e120e] via-deep-maroon to-[#450907] border-saffron/30",
    subtitle: "Spiritual Worship Essentials & Divine Resin",
    description: "Sourced with extreme devotion. Experience pristine prayers with 99.9% pure refined smokeless Bhimseni camphor, natural sambrani resin cups, and chemical-free organic jaggery offerings designed to create high-vibe, calm home atmospheres.",
    accentText: "text-saffron",
    tagline: "✦ DEVOTIONALLY SOURCE-VERIFIED ✦"
  },
  industrial: {
    bgGradient: "from-blue-900 via-blue-950 to-slate-900 border-blue-600/30",
    subtitle: "High-Performance Paints & Structural Supplies",
    description: "Engineered for lasting durability. Explore standard Asian Paints interior/exterior emulsions, rapid on-site tinting services, and high-strength D&H Secheron welding electrodes tailored for robust steel fabrications and grill works.",
    accentText: "text-blue-400",
    tagline: "✦ CONTRACTOR STRENGTH ✦"
  },
  home: {
    bgGradient: "from-rose-900 via-rose-950 to-stone-900 border-rose-600/30",
    subtitle: "Artisanal Tableware & Premium Ceramics",
    description: "Add timeless grace to your dining and decor with hand-glazed high-fire ceramic bowls, artisan plateware sets, and premium glassware. Blending physical durability with modern, minimalist aesthetics for local Trichy homes.",
    accentText: "text-rose-400",
    tagline: "✦ REFINED LIVING ✦"
  }
};

interface StorefrontProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Storefront({ 
  onAddToCart, 
  searchQuery,
  activeCategory,
  setActiveCategory
}: StorefrontProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const carouselVideos = [
    {
      id: 1,
      videoSrc: vid1,
      tag: "HEALTH & WELLNESS",
      title: "Wood-Pressed Gingelly Sesame Oil",
      desc: "Traditionally extracted using premium quality sesame seeds in a stone wood chekku to preserve rich nutrients."
    },
    {
      id: 2,
      videoSrc: vid2,
      tag: "INDUSTRIAL STRENGTH",
      title: "D&H Secheron Welding Electrodes",
      desc: "Premium grade welding electrodes engineered for extreme reliability, stable arcs, and superior finish."
    },
    {
      id: 3,
      videoSrc: vid3,
      tag: "DIVINE FRAGRANCE",
      title: "100% Organic Cup Sambrani",
      desc: "Pure herbal loban cup sambrani designed to diffuse a sacred, uplifting, and mosquito-repellent aroma."
    }
  ];

  const categoryCards = [
    {
      id: 'food',
      title: "FOOD & OILS",
      itemCount: "3 ITEMS",
      icon: Wheat
    },
    {
      id: 'home',
      title: "HOME & CERAMICS",
      itemCount: "2 ITEMS",
      icon: Home
    },
    {
      id: 'industrial',
      title: "INDUSTRIAL & PAINTS",
      itemCount: "2 ITEMS",
      icon: Wrench
    },
    {
      id: 'landscaping',
      title: "LANDSCAPING & NURSERY",
      itemCount: "2 ITEMS",
      icon: Sun
    },
    {
      id: 'pooja',
      title: "POOJA ESSENTIALS",
      itemCount: "4 ITEMS",
      icon: Flower
    }
  ];

  // Auto-advance video slides
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, carouselVideos.length]);

  // Scroll to top whenever activeCategory or searchQuery changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // Custom rich definitions and specifications for each product
  const getDefinitiveProductDetails = (product: Product) => {
    switch (product.id) {
      case 'p1':
        return {
          origin: "Swathanthra Horticulture Hub, Trichy",
          usage: "Transform your outdoor or indoor space into a peaceful oasis. Perfect for home lawns, corporate balconies, temple courtyards, and villa gardens.",
          features: [
            "Complete consultation, drainage checking, soil test and site survey included",
            "Selection of local native flower saplings and low-maintenance turf grass",
            "Includes 3 months of complimentary follow-up checks and organic pruning",
            "Handled by expert, certified local landscape architects from Trichy"
          ],
          specs: {
            "Service Location": "Thiruchirappalli & 40km surrounding radius",
            "Duration": "3 to 7 days depending on garden size",
            "Includes": "Plants, Soil enrichment, Grass turf, Layout design, and Labor",
            "Maintenance Support": "First 90 days completely free"
          }
        };
      case 'p2':
        return {
          origin: "Swathanthra Organic Nursery, Srirangam",
          usage: "Healthy, fully-rooted botanical saplings including Tulsi, Curry leaf, Hibiscus, Jasmine, and indoor purification plants. Grown using pure organic compost.",
          features: [
            "100% organic soil composition, enriched with organic cow manure",
            "Pest-resistant varieties acclimated to the warm Trichy climate",
            "Packaged in high-durability biodegradable seed-starting bags",
            "Includes a step-by-step physical card explaining daily watering & sunlight needs"
          ],
          specs: {
            "Average Height": "8 to 15 inches",
            "Plant Types": "Medicinal Herbs, Sacred Tulsi, Flowery Jasmines",
            "Soil Medium": "Red soil, coco peat, and organic compost",
            "Water Requirement": "Moderate (Once daily in mornings)"
          }
        };
      case 'p3':
        return {
          origin: "Traditional Toy Artisans, Mysore & Chennapatna",
          usage: "Traditional wooden toys crafted with pure ivory wood (Aale Mara) and colored with natural organic dyes extracted from turmeric, indigo, and kumkum. Completely safe for toddlers.",
          features: [
            "Hand-lathed by award-winning traditional toys craftsmen",
            "100% chemical-free and lead-free natural lacquer finish",
            "No sharp edges; polished to ultra-smooth rounded curves",
            "Excellent as educational gifts, return gifts, or heritage shelf decor"
          ],
          specs: {
            "Material": "Ivory Wood (Wrightia Tinctoria)",
            "Colors Used": "Pure organic dyes (Turmeric, Indigo, Madder root)",
            "Age Group": "Safe for ages 1 year and above",
            "Certification": "Traditional Handicraft Authenticity Guaranteed"
          }
        };
      case 'p4':
        return {
          origin: "Traditional Wooden Chekku, Lalgudi",
          usage: "100% natural, cold wood-pressed (Vaagai Chekku) groundnut oil. Extracted at low temperatures to preserve natural antioxidants, healthy fats, and rich traditional aroma.",
          features: [
            "No chemicals, no artificial preservatives, and zero heating during extraction",
            "Sourced from premium-grade premium local groundnut seeds",
            "Filtered using traditional gravity settling methods (no chemical refining)",
            "High smoke-point; ideal for deep frying, sautéing, and daily authentic South Indian cooking"
          ],
          specs: {
            "Type": "Cold Wood-Pressed Groundnut Oil (Mara Chekku Kadalai Ennai)",
            "Volume": "1 Liter food-grade bottle",
            "Shelf Life": "6 months from packaging date",
            "Ingredients": "100% Pure Groundnuts (No added palm oil or mineral oils)"
          }
        };
      case 'p5':
        return {
          origin: "Refined Camphor Works, Trichy",
          usage: "Refined, edible-grade Bhimseni camphor. Creates a serene, high-vibrational spiritual atmosphere during daily prayers, meditation, or temple services.",
          features: [
            "Edible-grade purity; free from paraffin wax, artificial binders, and chemicals",
            "Burns fully without leaving behind any black residue or soot",
            "Releases a distinct calming camphor aroma that deters mosquitoes and purifies indoor air",
            "Highly concentrated crystals packed in secure airtight moisture-proof jars"
          ],
          specs: {
            "Type": "Pure Bhimseni Camphor (Pachai Karpooram Grade)",
            "Net Weight": "250 grams jar",
            "Purity Standard": "99.9% Refined botanical extract",
            "Usage": "Aarti, meditation, air freshening, and temple poojas"
          }
        };
      case 'p6':
        return {
          origin: "Swathanthra Sacred Resins, Trichy",
          usage: "Premium cup sambrani crafted with genuine natural benzoin resin (Sambrani) harvested from divine forest hills. Perfect for traditional evening dhoop incense prayers.",
          features: [
            "Formulated with pure natural resin and dry coal dust (no charcoal chemicals)",
            "Produces thick, rich, spiritually grounding smoke with long-lasting herbal fragrance",
            "Includes a convenient non-combustible metal burner stand inside the box",
            "Safe to burn in homes, temples, and yoga centers"
          ],
          specs: {
            "Quantity": "24 cups per pack with metal holder",
            "Burning Time": "20 to 25 minutes per cup",
            "Ingredients": "Natural loban/benzoin resin, dry aromatic roots, cow ghee",
            "Aroma Profile": "Traditional sweet woodsy temple scent"
          }
        };
      case 'p7':
        return {
          origin: "Asian Paints Depot, Trichy",
          usage: "Premium interior/exterior emulsions providing high-durability, rich sheen, and advanced stain resistance for local home renovations.",
          features: [
            "Waterproof formula protects walls against heavy Trichy monsoon rains",
            "Low VOC (Volatile Organic Compounds) with no harsh paint smells",
            "Available in custom-matched colors on-the-fly at our store tinting unit",
            "Antifungal and antibacterial shield ensures pristine walls for up to 7 years"
          ],
          specs: {
            "Volume": "10 Liter container",
            "Finish Type": "Rich Satin Matte finish",
            "Coverage": "120 - 140 sq ft per liter for 2 coats",
            "Recommended Coat": "2 Coats with standard primer base"
          }
        };
      case 'p8':
        return {
          origin: "D&H Secheron, India",
          usage: "Heavy-duty welding electrodes for high-strength steel fabrication, construction grill works, gates, and industrial repairs.",
          features: [
            "Superb arc stability with low spatter and self-peeling slag",
            "All-position welding capability (flat, vertical-up, overhead)",
            "Consistent deep penetration with high mechanical strength properties",
            "Acreage-resistant dry protective vacuum packaging"
          ],
          specs: {
            "Size / Dimensions": "3.15mm x 350mm",
            "Classification": "AWS A5.1 E6013 / IS: ER4211",
            "Quantity": "Box of 100 pieces (approx. 2.5 kg)",
            "Suitable for": "Carbon steels, structural steels, sheet metals"
          }
        };
      default:
        return {
          origin: "Swathanthra Select, Tamil Nadu",
          usage: "A premium product selected for high-durability, traditional purity, and superior quality performance.",
          features: [
            "Rigorous quality check & batch-testing for absolute customer satisfaction",
            "Ethically and locally sourced supporting native rural farmers & artisans",
            "100% genuine product with Swathanthra guarantee seal",
            "Fully recyclable, food-grade, or sustainable packaging materials"
          ],
          specs: {
            "Origin": "Tamil Nadu, India",
            "Purity/Quality": "High Grade Certified",
            "Delivery": "Express door delivery available",
            "Support": "24/7 dedicated customer helpline"
          }
        };
    }
  };

  // Filter products by category AND search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBentoClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Smooth scroll to catalog
    document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Testimonials list
  const testimonials = [
    {
      name: "Ranganathan S.",
      location: "Thillai Nagar, Trichy",
      rating: 5,
      comment: "Swathanthra's garden landscaping service completely transformed our courtyard! The team is incredibly professional and skilled. We also buy our daily pooja camphor and sambrani here—purity is outstanding.",
      role: "Homeowner",
      date: "2 weeks ago"
    },
    {
      name: "Meenakshi Sundaram",
      location: "KK Nagar, Trichy",
      rating: 5,
      comment: "The cold pressed groundnut oil is highly aromatic and tastes exactly like old times. Also got some Chennapatna wooden toys as return gifts for my granddaughter's birthday, and all guests loved the organic finish!",
      role: "Verified Buyer",
      date: "1 month ago"
    },
    {
      name: "Rajesh Kumar",
      location: "Srirangam, Trichy",
      rating: 5,
      comment: "We used Swathanthra to source Asian Paints and welding electrodes for our renovation project. The pricing was very competitive and delivery to our site was completed on the exact same day. Highly recommended!",
      role: "Contractor",
      date: "3 days ago"
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "Where is Swathanthra located and do you deliver locally?",
      a: "Our physical store is conveniently situated in Thiruchirappalli (Trichy), Tamil Nadu, near Uyyakondan Thirumalai. We offer rapid local shipping to all parts of Trichy and adjacent districts. Delivery is free for all orders above ₹1,500!"
    },
    {
      q: "Are the pooja essentials completely pure and chemical-free?",
      a: "Yes, absolute purity is our core value. Our refined camphor is completely smokeless and edible-grade (for pachai karpuram), and our cup sambrani is crafted from premium natural resins to create a calm, spiritually uplifting atmosphere."
    },
    {
      q: "How can I book the Garden Landscaping service?",
      a: "You can purchase our starter Garden Landscaping Service right here. Once the order is placed, our expert landscaping team will contact you to schedule a site visit, draft custom layout designs, and begin execution."
    }
  ];

  const isHomePage = activeCategory === 'all';
  const currentCategoryDetails = categoryHeroDetails[activeCategory] || {
    bgGradient: "from-deep-maroon via-deep-maroon/95 to-black/80 border-temple-gold/30",
    subtitle: categories.find(c => c.id === activeCategory)?.name || "Premium Sector",
    description: "Handpicked premium essentials and trusted local solutions curated for quality, authenticity, and absolute reliability.",
    accentText: "text-saffron",
    tagline: "✦ SWATHANTHRA SELECT ✦"
  };

  return (
    <div className="pb-24 bg-[#faf7f2] min-h-screen">
      {isHomePage ? (
        <>
          {/* Hero Banner with Divine Temple Theme (Sticky Background) */}
          <div 
            className="sticky top-0 z-0 bg-deep-maroon overflow-hidden border-b-[6px] border-saffron shadow-lg rounded-b-[2rem] sm:rounded-b-[4rem] h-[65vh] sm:h-[75vh] md:h-[80vh] min-h-[480px] w-full flex flex-col justify-center"
          >
            <div className="absolute inset-0">
              <img 
                src={heroImg} 
                alt="Temple Background" 
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-maroon via-deep-maroon/60 to-transparent"></div>
              
              {/* Remaining Decorative Spinning elements (Bottom-Left and Bottom-Right only) */}
              <motion.img
                src={decorImg}
                alt="Hero Deco Bottom Left"
                className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-12 w-24 h-24 sm:w-44 sm:h-44 opacity-50 pointer-events-none select-none mix-blend-screen"
                style={{ mixBlendMode: 'screen' }}
                referrerPolicy="no-referrer"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              />
              <motion.img
                src={decorImg}
                alt="Hero Deco Bottom Right"
                className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-12 w-24 h-24 sm:w-44 sm:h-44 opacity-50 pointer-events-none select-none mix-blend-screen"
                style={{ mixBlendMode: 'screen' }}
                referrerPolicy="no-referrer"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              />
            </div>
            
            {/* Subtle decorative temple lights background overlay */}
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
              {/* Decorative Logo element (centered, beautifully styled) */}
              <div className="w-64 sm:w-[26rem] md:w-[30rem] h-auto flex items-center justify-center overflow-visible mb-6">
                 <img src={logoImg} alt="Swathanthra Logo" className="w-full h-auto drop-shadow-md" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 max-w-2xl"
              >
                {/* Equipments and Services */}
                <h1 className="text-xs sm:text-sm lg:text-base font-serif font-bold text-temple-gold mb-3 sm:mb-4 leading-tight drop-shadow-lg uppercase tracking-wider">
                  Equipments and Services
                </h1>
                
                <p className="text-xs sm:text-sm md:text-base text-white/95 leading-relaxed font-sans font-medium drop-shadow-sm px-4">
                  Pooja essentials, Channapatna toys, wood-pressed oils, plants, paints, industrial electrodes & more — sourced and curated, in one trusted place
                </p>

                <div className="flex flex-wrap justify-center gap-3 pt-3">
                  <button 
                    onClick={() => document.getElementById('video-carousel-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-2 bg-saffron hover:bg-white text-deep-maroon hover:text-deep-maroon rounded-full font-serif font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Explore Highlights
                  </button>
                  <button 
                    onClick={() => document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-2 bg-transparent hover:bg-white/10 border-2 border-temple-gold text-temple-gold hover:text-white rounded-full font-serif font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Shop Catalog
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrollable Content Wrapper with solid background */}
          <div className="relative z-10 bg-[#faf7f2] rounded-t-[2.5rem] sm:rounded-t-[4rem] shadow-[-10px_-10px_30px_rgba(0,0,0,0.15)] border-t-[4px] border-saffron/40 pb-20 pt-16 -mt-8">
            
            {/* Video Carousel Section */}
            <div id="video-carousel-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-visible">
              <div 
                className="w-full relative aspect-[5/2] overflow-hidden rounded-2xl border-2 border-temple-gold/40 shadow-2xl origin-center"
              >
                {/* Video Player */}
                <video
                  key={videoIndex}
                  src={carouselVideos[videoIndex].videoSrc}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />

                {/* Video Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Video Slide Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-left">
                  <span className="text-[10px] font-mono text-saffron font-bold tracking-widest uppercase mb-1">
                    ✦ {carouselVideos[videoIndex].tag} ✦
                  </span>
                  <h3 className="text-xs sm:text-sm md:text-base font-serif font-bold text-temple-gold leading-tight drop-shadow">
                    {carouselVideos[videoIndex].title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/85 mt-0.5 line-clamp-1">
                    {carouselVideos[videoIndex].desc}
                  </p>
                </div>

                {/* Controls Row */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  {/* Play/Pause control */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-saffron text-white hover:text-deep-maroon border border-white/20 transition-all cursor-pointer"
                    title={isPlaying ? "Pause Auto-Rotation" : "Play Auto-Rotation"}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>

                  {/* Mute/Unmute control */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-saffron text-white hover:text-deep-maroon border border-white/20 transition-all cursor-pointer"
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>

                {/* Left and Right Nav Chevrons */}
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setVideoIndex((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-saffron/90 text-white hover:text-deep-maroon transition-all border border-white/10 cursor-pointer"
                  title="Previous video"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setVideoIndex((prev) => (prev + 1) % carouselVideos.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-saffron/90 text-white hover:text-deep-maroon transition-all border border-white/10 cursor-pointer"
                  title="Next video"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Clickable indicator dots */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 bg-black/30 px-2 py-1 rounded-full">
                  {carouselVideos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setVideoIndex(idx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === videoIndex ? 'bg-saffron scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Category Switcher Section (replaces the feature badges section next to/below the carousel) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-5 w-full">
                {categoryCards.map((card) => {
                  const Icon = card.icon;
                  const isActive = activeCategory === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleBentoClick(card.id)}
                      className={`rounded-2xl sm:rounded-3xl p-2 sm:p-5 md:p-6 shadow-lg border-2 flex flex-col items-center justify-center text-center cursor-pointer relative group overflow-hidden transition-all duration-300 ${
                        isActive 
                          ? 'bg-amber-50/90 border-saffron shadow-xl scale-105 ring-4 ring-saffron/15' 
                          : 'bg-white border-amber-900/10 hover:border-saffron hover:shadow-2xl hover:-translate-y-1'
                      }`}
                    >
                      {/* Delicate soft gradient band at the top of the card to match image design */}
                      <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-orange-50/60 to-transparent pointer-events-none group-hover:from-saffron/10 transition-all duration-300"></div>

                      {/* Circular Gold Icon Badge */}
                      <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-inner transition-all duration-300 mb-2 sm:mb-4 z-10 ${
                        isActive
                          ? 'bg-saffron/20 border-2 border-saffron text-saffron scale-110'
                          : 'bg-amber-50/80 border border-[#facc15]/30 text-amber-600 group-hover:bg-saffron/20 group-hover:text-saffron group-hover:scale-110'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Category Title in capital letters, classy serif font */}
                      <h4 className="font-serif font-bold text-deep-maroon text-[9px] sm:text-sm md:text-base leading-tight tracking-wider uppercase group-hover:text-saffron transition-colors z-10">
                        {card.title}
                      </h4>

                      {/* Item count in small tracking-widest text */}
                      <p className="font-sans text-[8px] sm:text-xs tracking-widest text-slate-400 font-bold mt-1 sm:mt-2 uppercase z-10">
                        {card.itemCount}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          {/* SEARCH RESULTS INDICATOR */}
          {searchQuery.trim() !== '' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="bg-orange-50 border-2 border-saffron/30 px-6 py-4 rounded-2xl flex items-center justify-between shadow-md">
                <span className="text-sm font-medium text-deep-maroon flex items-center gap-2">
                  <Search className="w-4 h-4 text-saffron" />
                  Showing search results for "<span className="font-bold text-saffron">{searchQuery}</span>" ({filteredProducts.length} items found)
                </span>
                <button 
                  onClick={() => handleBentoClick('all')} 
                  className="text-xs text-deep-maroon hover:text-saffron font-bold underline transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* BENTO BOX GRID SECTION */}
          <section id="bento-grid-highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-1 font-mono">✦ DIVINE BENTO HIGHLIGHTS ✦</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-maroon">Explore Our Specialized Sectors</h2>
                <p className="text-gray-600 mt-2 max-w-2xl text-sm">
                  We bridge traditional spiritual goods with modern structural services, creating an organic ecosystem for your home, mind, and workspace. Click any bento box to explore the products!
                </p>
              </div>
              <button 
                onClick={() => handleBentoClick('all')}
                className="text-sm text-saffron hover:text-deep-maroon font-serif font-bold flex items-center gap-1.5 self-center md:self-end border-b-2 border-saffron pb-1 transition-all cursor-pointer"
              >
                See Full Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[220px]">
              
              {/* Card 1: Garden Landscaping & Nursery Services (Double Column, Double Row) */}
              <div 
                onClick={() => handleBentoClick('landscaping')}
                className="md:col-span-3 md:row-span-2 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-emerald-800/10 hover:border-emerald-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-black/20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&auto=format&fit=crop&q=80"
                  alt="Garden Landscaping"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Top-right badge */}
                <span className="absolute top-4 right-4 z-20 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Nurseries & Lawns
                </span>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-20 flex flex-col justify-end h-full">
                  <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">Professional Landscaping</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 group-hover:text-temple-gold transition-colors">
                    Garden Landscaping & Nursery Services
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm mt-2 line-clamp-2 font-light">
                    Draft professional lawn layouts, plant healthy Tulsi saplings, and fully redesign your residential yards. Full Trichy site-survey included.
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-temple-gold font-bold text-xs sm:text-sm group-hover:translate-x-2 transition-transform">
                    Browse Gardening Services <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card 2: Pure Pooja Essentials (Double Column, Single Row) */}
              <div 
                onClick={() => handleBentoClick('pooja')}
                className="md:col-span-3 md:row-span-1 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-saffron/10 hover:border-saffron hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5a100c] via-[#5a100c]/80 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden hidden sm:block">
                  <img 
                    src="https://images.unsplash.com/photo-1615592389070-bcc97e050800?w=600&auto=format&fit=crop&q=80"
                    alt="Pooja items"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Top-right badge */}
                <span className="absolute top-4 right-4 z-20 bg-saffron text-deep-maroon text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Purity Verified
                </span>

                {/* Content */}
                <div className="absolute inset-0 p-6 z-20 flex flex-col justify-center max-w-md">
                  <span className="text-saffron font-mono text-xs font-bold tracking-widest uppercase">Traditional Aromatics</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 group-hover:text-temple-gold transition-colors">
                    Spiritual Pooja Essentials
                  </h3>
                  <p className="text-gray-200 text-xs mt-1 line-clamp-2">
                    100% pure refined smokeless camphor, aromatic cup sambrani, and natural edible jaggery. Perfect for clean standard home poojas.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-temple-gold font-bold text-xs">
                    Explore Devotional Goods <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 3: Wood Pressed Cold Oils (Single Column, Single Row) */}
              <div 
                onClick={() => handleBentoClick('food')}
                className="md:col-span-1.5 md:row-span-1 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-amber-600/10 hover:border-amber-500 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#401202] via-[#401202]/70 to-black/20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&auto=format&fit=crop&q=80"
                  alt="Cold oil"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end">
                  <span className="text-amber-300 font-mono text-[10px] font-bold tracking-widest uppercase">Healthy & Nutritious</span>
                  <h4 className="text-lg font-serif font-bold text-white mt-0.5 group-hover:text-amber-200 transition-colors">
                    Organic Pressed Oils
                  </h4>
                  <p className="text-gray-200 text-[10px] line-clamp-2">
                    Traditional cold groundnut oil & homemade multi-grain mixes.
                  </p>
                </div>
              </div>

              {/* Card 4: Traditional Wooden Toys & Crafts (Single Column, Single Row) */}
              <div 
                onClick={() => handleBentoClick('gifts')}
                className="md:col-span-1.5 md:row-span-1 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-amber-800/10 hover:border-amber-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-black/20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1557142046-c704a3adf364?w=500&auto=format&fit=crop&q=80"
                  alt="Channapatna Wooden Toys"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end">
                  <span className="text-orange-300 font-mono text-[10px] font-bold tracking-widest uppercase">Eco-Friendly Gifts</span>
                  <h4 className="text-lg font-serif font-bold text-white mt-0.5 group-hover:text-orange-200 transition-colors">
                    Wooden Toys
                  </h4>
                  <p className="text-gray-200 text-[10px] line-clamp-2">
                    Handcrafted Mysore Chennapatna toys finished with natural lacquer colors.
                  </p>
                </div>
              </div>

              {/* Card 5: Industrial Paints & Structural Supplies (Double Column, Single Row) */}
              <div 
                onClick={() => handleBentoClick('industrial')}
                className="md:col-span-3 md:row-span-1 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-blue-900/10 hover:border-blue-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden hidden sm:block">
                  <img 
                    src="https://images.unsplash.com/photo-1571259160565-df04e8d3ee6e?w=500&auto=format&fit=crop&q=80"
                    alt="Asian paints & hardware"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Top-right badge */}
                <span className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Palette className="w-3 h-3" /> Paints & Tools
                </span>

                {/* Content */}
                <div className="absolute inset-0 p-6 z-20 flex flex-col justify-center max-w-sm">
                  <span className="text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">Infrastructure Grade</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">
                    Asian Paints & Welding Electrodes
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                    Heavy duty D&H Secheron welding electrodes and luxury interior/exterior paints for durable home constructions.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                    Browse Industrial Materials <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 6: Home & Ceramics (Double Column, Single Row) */}
              <div 
                onClick={() => handleBentoClick('home')}
                className="md:col-span-3 md:row-span-1 rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg border-2 border-rose-900/10 hover:border-rose-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden hidden sm:block">
                  <img 
                    src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80"
                    alt="Ceramic tableware & glassware"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Top-right badge */}
                <span className="absolute top-4 right-4 z-20 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Home className="w-3 h-3" /> Ceramics & Dining
                </span>

                {/* Content */}
                <div className="absolute inset-0 p-6 z-20 flex flex-col justify-center max-w-sm">
                  <span className="text-rose-400 font-mono text-xs font-bold tracking-widest uppercase">Refined Living</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 group-hover:text-rose-300 transition-colors">
                    Artisanal Tableware & Premium Ceramics
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                    Hand-glazed high-fire ceramic bowls, artisan plateware sets, and premium glassware for daily home aesthetics.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                    Explore Home Aesthetics <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CORE PRODUCT CATALOG - WITH ID FOR SMOOTH SCROLLING */}
          <section id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            
            {/* Section Heading */}
            <div className="text-center mb-10">
              <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-1 font-mono">✦ OUR SACRED CATALOG ✦</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-maroon">Browse All Divine Goods & Services</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto mt-3"></div>
            </div>

            {/* Categories Navigation (Temple Styled) */}
            <div className="mb-10">
              <div className="flex overflow-x-auto pb-4 gap-4 justify-start sm:justify-center scrollbar-hide px-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-6 py-3 rounded-full font-serif tracking-wide transition-all border-2 cursor-pointer ${
                      activeCategory === category.id 
                        ? 'bg-deep-maroon text-temple-gold border-saffron shadow-lg scale-105 font-bold' 
                        : 'bg-white text-deep-maroon hover:bg-orange-50 border-temple-gold/30 shadow-sm'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-temple-gold/20 shadow-sm p-8 max-w-lg mx-auto bg-temple-pattern-card">
                  <Info className="w-12 h-12 text-temple-gold/80 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-deep-maroon mb-2">No Products Found</h3>
                  <p className="text-gray-600 text-sm">
                    We couldn't find any products matching your search criteria in this category. Try choosing "All Products" or modifying your search query.
                  </p>
                </div>
              ) : activeCategory === 'all' && searchQuery.trim() === '' ? (
                <div className="space-y-16">
                  {categories.filter(c => c.id !== 'all').map((category) => {
                    const categoryProducts = products.filter(p => p.categoryId === category.id);
                    if (categoryProducts.length === 0) return null;
                    
                    return (
                      <div key={category.id} className="relative">
                        <div className="flex items-center gap-4 mb-8">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-deep-maroon">{category.name}</h3>
                          <div className="h-[2px] flex-1 bg-gradient-to-r from-temple-gold to-transparent"></div>
                        </div>
                        
                        <motion.div 
                          layout 
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                          <AnimatePresence mode="popLayout">
                            {categoryProducts.map((product) => (
                              <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setModalQty(1);
                                }}
                                className="bg-white rounded-t-full rounded-b-2xl shadow-md border-2 border-temple-gold/20 overflow-hidden hover:shadow-2xl hover:border-saffron transition-all duration-300 group flex flex-col pt-4 px-4 bg-temple-pattern-card cursor-pointer transform hover:-translate-y-1"
                              >
                                <div className="relative h-48 w-full rounded-full overflow-hidden bg-orange-50 border-4 border-temple-gold/30 shadow-inner flex-shrink-0">
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-deep-maroon/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-temple-gold uppercase tracking-widest shadow-md whitespace-nowrap">
                                    {category.name}
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col mt-2 text-center">
                                  <h3 className="font-serif font-bold text-deep-maroon text-lg mb-2 line-clamp-2">{product.name}</h3>
                                  <p className="text-xs text-gray-600 mb-6 line-clamp-3 flex-1">{product.description}</p>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-temple-gold/20">
                                    <span className="font-bold text-xl text-saffron">₹{product.price}</span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onAddToCart(product);
                                      }}
                                      className="flex items-center gap-1.5 bg-temple-gold hover:bg-saffron text-deep-maroon hover:text-white px-4 py-2 rounded-full font-bold shadow-md transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
                                    >
                                      <ShoppingCart className="w-4 h-4" />
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <motion.div 
                  layout 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalQty(1);
                        }}
                        className="bg-white rounded-t-full rounded-b-2xl shadow-md border-2 border-temple-gold/20 overflow-hidden hover:shadow-2xl hover:border-saffron transition-all duration-300 group flex flex-col pt-4 px-4 bg-temple-pattern-card cursor-pointer transform hover:-translate-y-1"
                      >
                        <div className="relative h-48 w-full rounded-full overflow-hidden bg-orange-50 border-4 border-temple-gold/30 shadow-inner flex-shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-deep-maroon/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-temple-gold uppercase tracking-widest shadow-md whitespace-nowrap">
                            {categories.find(c => c.id === product.categoryId)?.name}
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col mt-2 text-center">
                          <h3 className="font-serif font-bold text-deep-maroon text-lg mb-2 line-clamp-2">{product.name}</h3>
                          <p className="text-xs text-gray-600 mb-6 line-clamp-3 flex-1">{product.description}</p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-temple-gold/20">
                            <span className="font-bold text-xl text-saffron">₹{product.price}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="flex items-center gap-1.5 bg-temple-gold hover:bg-saffron text-deep-maroon hover:text-white px-4 py-2 rounded-full font-bold shadow-md transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </section>

          {/* CUSTOMER TESTIMONIALS SECTION */}
          <section className="bg-white py-20 mt-28 border-y-2 border-temple-gold/20 bg-temple-pattern-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center mb-12">
                <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-1 font-mono">✦ DHANYAVADAH ✦</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-maroon">What Our Local Trichy Customers Say</h2>
                <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
                  Read review comments from Trichy and adjacent district homeowners, contractors, and spiritual seekers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#faf7f2] rounded-3xl p-6 sm:p-8 border-2 border-temple-gold/10 shadow-md relative hover:shadow-xl hover:border-saffron/20 transition-all duration-300"
                  >
                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 text-saffron mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-saffron" />
                      ))}
                    </div>

                    <p className="text-sm text-gray-700 italic leading-relaxed mb-6 font-light">
                      "{t.comment}"
                    </p>

                    <div className="flex justify-between items-center border-t border-temple-gold/20 pt-4">
                      <div>
                        <h4 className="font-serif font-bold text-deep-maroon text-base">{t.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-saffron/10 text-saffron px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {t.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DETAILED FAQ SECTION */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="text-center mb-12">
              <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-1 font-mono">✦ INQUIRIES & HELP ✦</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-maroon">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-2 text-sm">
                Everything you need to know about our local store offerings, services, and Trichy delivery procedures.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border-2 border-temple-gold/15 shadow-sm hover:border-saffron/20 transition-all"
                >
                  <h3 className="font-serif font-bold text-deep-maroon text-lg flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3 pl-7 leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </>
      ) : (
        <>
          {/* Dedicated Category Page Hero Banner */}
          <div className={`bg-gradient-to-r ${currentCategoryDetails.bgGradient} overflow-hidden relative border-b-[6px] border-saffron shadow-lg rounded-b-[2rem] sm:rounded-b-[4rem]`}>
            <div className="absolute inset-0 opacity-15 bg-temple-pattern"></div>
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              {/* Breadcrumbs & Back to Home */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                  <button 
                    onClick={() => setActiveCategory('all')} 
                    className="hover:text-white hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/60">Categories</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-saffron font-bold">{categories.find(c => c.id === activeCategory)?.name}</span>
                </div>

                <button
                  onClick={() => setActiveCategory('all')}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-serif font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to All Products
                </button>
              </div>

              <div className="max-w-3xl">
                <span className={`font-mono text-xs font-black tracking-widest ${currentCategoryDetails.accentText} uppercase`}>
                  {currentCategoryDetails.tagline}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-4 leading-tight drop-shadow-md">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h1>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                  {currentCategoryDetails.description}
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH RESULTS INDICATOR */}
          {searchQuery.trim() !== '' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="bg-orange-50 border-2 border-saffron/30 px-6 py-4 rounded-2xl flex items-center justify-between shadow-md">
                <span className="text-sm font-medium text-deep-maroon flex items-center gap-2">
                  <Search className="w-4 h-4 text-saffron" />
                  Showing search results for "<span className="font-bold text-saffron">{searchQuery}</span>" ({filteredProducts.length} items found)
                </span>
                <button 
                  onClick={() => handleBentoClick('all')} 
                  className="text-xs text-deep-maroon hover:text-saffron font-bold underline transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Dedicated Product List */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Swapping category switcher tabs */}
            <div className="mb-12 border-b border-temple-gold/15 pb-6">
              <p className="text-center text-xs font-serif font-bold text-deep-maroon/60 uppercase tracking-widest mb-4">Switch Departments</p>
              <div className="flex overflow-x-auto pb-2 gap-4 justify-start sm:justify-center scrollbar-hide px-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full font-serif text-xs sm:text-sm tracking-wide transition-all border-2 cursor-pointer ${
                      activeCategory === category.id 
                        ? 'bg-deep-maroon text-temple-gold border-saffron shadow-md scale-105 font-bold' 
                        : 'bg-white text-deep-maroon hover:bg-orange-50 border-temple-gold/20 shadow-sm'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Results Counter bar */}
            <div className="flex items-center justify-between border-l-4 border-saffron pl-4 mb-8">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-mono">Department Catalog</p>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-deep-maroon mt-0.5">
                  Available in {categories.find(c => c.id === activeCategory)?.name}
                </h2>
              </div>
              <span className="text-xs font-bold font-mono bg-orange-50 text-saffron border border-saffron/20 px-3 py-1.5 rounded-full shadow-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
              </span>
            </div>

            {/* Clean Products Grid */}
            <div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-temple-gold/20 shadow-sm p-8 max-w-lg mx-auto bg-temple-pattern-card">
                  <Info className="w-12 h-12 text-temple-gold/80 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-deep-maroon mb-2">No Products Found</h3>
                  <p className="text-gray-600 text-sm">
                    We couldn't find any products matching your search criteria in this category. Try choosing "All Products" or modifying your search query.
                  </p>
                </div>
              ) : (
                <motion.div 
                  layout 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalQty(1);
                        }}
                        className="bg-white rounded-t-full rounded-b-2xl shadow-md border-2 border-temple-gold/20 overflow-hidden hover:shadow-2xl hover:border-saffron transition-all duration-300 group flex flex-col pt-4 px-4 bg-temple-pattern-card cursor-pointer transform hover:-translate-y-1"
                      >
                        <div className="relative h-48 w-full rounded-full overflow-hidden bg-orange-50 border-4 border-temple-gold/30 shadow-inner flex-shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-deep-maroon/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-temple-gold uppercase tracking-widest shadow-md whitespace-nowrap">
                            {categories.find(c => c.id === product.categoryId)?.name}
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col mt-2 text-center">
                          <h3 className="font-serif font-bold text-deep-maroon text-lg mb-2 line-clamp-2">{product.name}</h3>
                          <p className="text-xs text-gray-600 mb-6 line-clamp-3 flex-1">{product.description}</p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-temple-gold/20">
                            <span className="font-bold text-xl text-saffron">₹{product.price}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="flex items-center gap-1.5 bg-temple-gold hover:bg-saffron text-deep-maroon hover:text-white px-4 py-2 rounded-full font-bold shadow-md transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </section>

          {/* Trusted Guarantees Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="bg-white rounded-3xl border-2 border-temple-gold/20 p-8 shadow-xl bg-temple-pattern-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-temple-gold/20">
                <div className="pt-6 md:pt-0 pb-6 md:pb-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-deep-maroon text-base">Authentic Guarantee</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    All our pooja items and wood-pressed oils undergo strict quality inspections for pure traditional standard verification.
                  </p>
                </div>
                <div className="pt-6 pb-6 px-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-saffron border border-saffron/20 flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-deep-maroon text-base">Local Trichy Delivery</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Sourced and delivered rapidly straight to your doorstep across Srirangam, Lalgudi, and surrounding Tiruchirappalli sectors.
                  </p>
                </div>
                <div className="pt-6 md:pt-0 px-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-deep-maroon text-base">Supporting Local Artisans</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Every craft, toy, and sapling purchase goes directly to empowering native rural gardeners, toy-lathe workers, and oil-pressers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* DEFINITIVE PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (() => {
          const details = getDefinitiveProductDetails(selectedProduct);
          return (
            <div className="fixed inset-0 z-[200] overflow-y-auto flex items-center justify-center p-4">
              {/* Backdrop overlay with blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-deep-maroon/75 backdrop-blur-md cursor-pointer"
              />

              {/* Content Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full border-4 border-temple-gold shadow-2xl z-10 flex flex-col md:flex-row bg-temple-pattern-card text-gray-800"
              >
                {/* Product Image Frame */}
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-orange-50/50 border-b-2 md:border-b-0 md:border-r-2 border-temple-gold/10">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-temple-gold/30 shadow-2xl aspect-square w-full max-w-[320px] md:max-w-none">
                    <img 
                      src={selectedProduct.imageUrl} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-deep-maroon text-temple-gold text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {categories.find(c => c.id === selectedProduct.categoryId)?.name}
                    </span>
                  </div>
                </div>

                {/* Details Pane */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
                  <div>
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <p className="text-[10px] font-mono font-bold text-saffron uppercase tracking-widest">{details.origin}</p>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep-maroon mt-0.5">{selectedProduct.name}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(null)}
                        className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-saffron">₹{selectedProduct.price}</span>
                      <span className="text-xs text-gray-400 font-light">(Inclusive of all local taxes)</span>
                    </div>

                    {/* Definitive Description */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-deep-maroon uppercase tracking-wider font-serif mb-1.5">Product Overview</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">{selectedProduct.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light mt-2 italic">{details.usage}</p>
                    </div>

                    {/* Key Features Bullet List */}
                    <div className="mb-6 bg-orange-50/50 p-4 rounded-2xl border border-saffron/15">
                      <h4 className="text-xs font-bold text-deep-maroon uppercase tracking-wider font-serif mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-saffron" /> Premium Standards & Purity
                      </h4>
                      <ul className="space-y-2">
                        {details.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Specifications */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-deep-maroon uppercase tracking-wider font-serif mb-2">Specifications</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {Object.entries(details.specs).map(([key, val]) => (
                          <div key={key} className="flex flex-col border-b border-gray-100 pb-1.5">
                            <span className="text-gray-400 font-light">{key}</span>
                            <span className="font-semibold text-gray-700 mt-0.5">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Tray */}
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-600 font-serif">Purchase Quantity</span>
                      <div className="flex items-center border-2 border-temple-gold/30 rounded-full p-1 bg-white">
                        <button 
                          onClick={() => setModalQty(q => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50 text-deep-maroon font-black transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{modalQty}</span>
                        <button 
                          onClick={() => setModalQty(q => q + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50 text-deep-maroon font-black transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Buy Buttons */}
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          for(let i=0; i<modalQty; i++) {
                            onAddToCart(selectedProduct);
                          }
                          setSelectedProduct(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-saffron hover:bg-deep-maroon text-deep-maroon hover:text-white rounded-full font-serif font-bold transition-all shadow-md active:scale-98 cursor-pointer text-sm sm:text-base"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart • ₹{selectedProduct.price * modalQty}
                      </button>
                    </div>

                    {/* Guarantee badge */}
                    <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>100% Genuine product • Fast local delivery in Trichy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
