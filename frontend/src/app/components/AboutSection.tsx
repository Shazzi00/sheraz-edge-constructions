export default function AboutSection() {
  return (
    <section className="bg-slate-100 py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-y border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Image Wrapper with Edge Gradient Overlay */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/about-engineers.jpg"
            alt="Engineers reviewing blueprints on construction site"
            className="w-full h-full object-cover object-center"
          />
          {/* Top-to-Bottom Linear Darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-transparent to-slate-900/60 pointer-events-none" />
          {/* Side-to-Side Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-transparent to-slate-900/50 pointer-events-none" />
        </div>

        {/* Text Content */}
        <div className="space-y-4 sm:space-y-6">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            ABOUT US
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Crafting structures that last a lifetime
          </h2>
          <div className="space-y-4 text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed font-normal">
            <p>
              At Sheraz Edge Constructions, we believe that building enduring structures requires a comprehensive approach. We combine premium-grade materials, resilient engineering design, and sustainable building practices to deliver exceptional results across every project.
            </p>
            <p>
              By drawing on deep industry insights and leveraging modern technology, our team seamlessly manages every detail from concept to completion—ensuring your structural vision is realized with uncompromised quality and long-term durability.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}