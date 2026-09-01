import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1f262e] text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-bold text-lg tracking-wide">
              Sheraz Edge Constructions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Our post-construction services gives you peace of mind knowing that we are still here for you even after.
            </p>
          </div>

          {/* Column 2: Our Services */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-bold text-lg tracking-wide">
              Our Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li className="hover:text-amber-400 transition-colors">Specialty Construction</li>
              <li className="hover:text-amber-400 transition-colors">Civil Construction</li>
              <li className="hover:text-amber-400 transition-colors">Residential Construction</li>
              <li className="hover:text-amber-400 transition-colors">Corporate Construction</li>
              <li className="hover:text-amber-400 transition-colors">Building Constructions</li>
              <li  className="hover:text-amber-400 transition-colors">Industrial Construction</li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-bold text-lg tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-amber-400 transition-colors">Projects</Link></li>
             
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact us</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-bold text-lg tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm font-light text-slate-300">
              <p>(888-000-0000)</p>
              <p>info@example.com</p>
              <p>B-18X, Sheraz Edge Constructions</p>
              <p>example, , 226017</p>
              <p>0522400XXXX</p>
            </div>
          </div>

        </div>

        {/* Divider & Copyright Line */}
        <div className="border-t border-slate-700/60 pt-6">
          <p className="text-center text-xs text-slate-400 font-light">
            Copyright © {new Date().getFullYear()} Sheraz Edge Constructions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}