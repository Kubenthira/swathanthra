import logoImg from '../assets/images/logo.png';

export default function BusinessProfile() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
      <div className="bg-white shadow-2xl rounded-t-[4rem] rounded-b-2xl border-4 border-temple-gold p-8 sm:p-12 md:p-16 relative overflow-hidden">
        
        {/* Subtle temple pattern in background */}
        <div className="absolute inset-0 opacity-5 bg-temple-pattern-large"></div>

        {/* Document Header */}
        <div className="relative text-center border-b-4 border-saffron pb-8 mb-12 flex flex-col items-center">
          <img src={logoImg} alt="Swathanthra Logo" className="w-64 h-auto drop-shadow-lg" />
          
          <p className="mt-2 text-gray-500 text-sm tracking-wider">
            THIRUCHIRAPPALLI, TAMIL NADU
          </p>
          <div className="absolute top-0 right-0 text-right text-gray-400 text-xs hidden sm:block">
            <p>Generated on</p>
            <p className="font-medium text-gray-800">{currentDate}</p>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-[2px] w-12 bg-temple-gold"></span>
            <h3 className="text-3xl font-serif font-bold text-deep-maroon text-center">
              Company Overview
            </h3>
            <span className="h-[2px] w-12 bg-temple-gold"></span>
          </div>
          <div className="bg-orange-50 border-l-4 border-saffron p-6 rounded-r-xl shadow-sm text-center sm:text-left">
            <p className="text-gray-800 leading-relaxed text-lg font-medium text-justify">
              Swathanthra Equipments and Services, conveniently located in Thiruchirappalli, Tamil Nadu, is a premier religious goods shop offering an array of spiritual accoutrements for devotees seeking solace and connection with the divine. Whether you're seeking murtis, prayer items, or traditional garments, we have everything you need to deepen your spiritual journey and pay homage to the gods. 
              <br/><br/>
              We serve the community of Tiruchirappalli, Tamil Nadu, and the surrounding areas, including Uyyakondan Thirumalai. Step into our sacred space and be inspired by the serenity and tranquility that envelops you. Our commitment to authentic sourcing and quality service spans across multiple verticals, spanning both industrial needs and divine offerings.
            </p>
          </div>
        </section>

        {/* Verticals */}
        <section className="mb-12 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-[2px] w-12 bg-temple-gold"></span>
            <h3 className="text-3xl font-serif font-bold text-deep-maroon text-center">
              Our Offerings
            </h3>
            <span className="h-[2px] w-12 bg-temple-gold"></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertical: Pooja */}
            <div className="bg-white p-8 rounded-xl border border-temple-gold/30 shadow-md hover:shadow-lg transition-shadow bg-temple-pattern">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white text-xl mb-4 shadow-sm">🪔</div>
              <h4 className="font-serif font-bold text-deep-maroon mb-3 text-2xl">Pooja Essentials</h4>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li>• Pure Refined Camphor</li>
                <li>• Green Camphor (Pachai Karpuram)</li>
                <li>• Premium Cup Sambrani</li>
                <li>• Organic Jaggery Offerings</li>
              </ul>
            </div>

            {/* Vertical: Food */}
             <div className="bg-white p-8 rounded-xl border border-temple-gold/30 shadow-md hover:shadow-lg transition-shadow bg-temple-pattern">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white text-xl mb-4 shadow-sm">🍯</div>
              <h4 className="font-serif font-bold text-deep-maroon mb-3 text-2xl">Premium Foods</h4>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li>• Wood Press Groundnut Oils</li>
                <li>• Traditional Multigrain Health Mixes</li>
                <li>• Amul Ice Creams</li>
              </ul>
            </div>

            {/* Vertical: Cultural */}
            <div className="bg-white p-8 rounded-xl border border-temple-gold/30 shadow-md hover:shadow-lg transition-shadow bg-temple-pattern">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white text-xl mb-4 shadow-sm">🎁</div>
              <h4 className="font-serif font-bold text-deep-maroon mb-3 text-2xl">Traditional Gifts</h4>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li>• Mysore Chennapatna Wooden Toys</li>
                <li>• Traditional Return Gifts</li>
              </ul>
            </div>

            {/* Vertical: Industrial */}
            <div className="bg-white p-8 rounded-xl border border-temple-gold/30 shadow-md hover:shadow-lg transition-shadow bg-temple-pattern">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white text-xl mb-4 shadow-sm">🏗️</div>
              <h4 className="font-serif font-bold text-deep-maroon mb-3 text-2xl">Industrial & Utilities</h4>
              <ul className="space-y-2 text-gray-700 font-medium">
                <li>• D&H Secheron Special Electrodes</li>
                <li>• Asian Paints Emulsions</li>
                <li>• Garden Landscaping & Saplings</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Footer of Document */}
        <div className="mt-16 pt-8 border-t-2 border-temple-gold/30 text-center text-gray-600 font-medium">
          <p className="font-serif text-xl text-deep-maroon mb-1">Swathanthra Equipments & Services</p>
          <p className="text-sm">Deepening your spiritual journey through quality offerings.</p>
        </div>

      </div>
    </div>
  );
}
