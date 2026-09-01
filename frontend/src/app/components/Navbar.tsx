'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Our Projects', href: '/projects' },

    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Dynamic Background Blur Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Crystal Glass Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-slate-950/30 backdrop-blur-md border-b border-white/15 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase drop-shadow">
            SHERAZ <span className="text-amber-400">Constructions</span>
          </Link>

          {/* Desktop Menu Links */}
          <ul className="hidden md:flex space-x-6 text-xs font-bold uppercase tracking-wide">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors py-1 border-b-2 ${
                      isActive
                        ? 'text-amber-400 border-amber-400 font-extrabold'
                        : 'text-slate-100 border-transparent hover:text-amber-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-white hover:text-amber-400 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Frosted Crystal Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden bg-slate-900/90 backdrop-blur-xl border-t border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-amber-400 font-extrabold' : 'text-slate-100 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}