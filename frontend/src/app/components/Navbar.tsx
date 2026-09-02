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

  const isAdminActive = pathname?.startsWith('/admin');

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

          {/* Desktop Menu Links & Admin Icon */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 text-xs font-bold uppercase tracking-wide items-center">
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

            {/* Admin Login Icon Link */}
            <Link
              href="/admin/login"
              title="Admin Portal"
              className={`p-2 rounded-full border transition-all duration-200 ${
                isAdminActive
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'text-slate-100 border-white/20 hover:border-amber-400 hover:text-amber-400 hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>

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

            {/* Mobile Admin Link */}
            <div className="pt-2 border-t border-white/10">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isAdminActive ? 'text-amber-400 font-extrabold' : 'text-slate-100 hover:text-amber-400'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}