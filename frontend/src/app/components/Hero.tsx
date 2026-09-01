import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14, 116, 144, 0.45), rgba(15, 23, 42, 0.55)), url('/hero-crane.jpg')",
      }}
    >
      <div className="max-w-4xl text-white space-y-4 sm:space-y-6">
        <p className="text-amber-400 font-semibold text-sm sm:text-base md:text-lg tracking-wide uppercase">
          Welcome Amazing Constructions
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
          Crafting dreams with precision and excellence.
        </h1>
        <p className="text-slate-100 text-xs sm:text-sm md:text-base max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed">
          We excel at transforming visions into reality through outstanding craftsmanship and precise attention to detail. With years of experience and a dedication to quality.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-8 rounded text-xs uppercase tracking-wider transition shadow-md text-center"
          >
            Contact Now
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-8 rounded text-xs uppercase tracking-wider transition shadow-md text-center"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}