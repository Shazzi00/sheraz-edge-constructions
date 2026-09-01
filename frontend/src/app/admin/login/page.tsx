'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || data.errors?.email?.[0] || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Connection error. Ensure Laravel backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200/80">
        
        {/* Left Side: Branding & Illustration Image */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-pink-950 p-8 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px] md:min-h-[540px]">
          {/* Header Branding */}
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-pink-500/20 border border-pink-500/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-pink-300 uppercase">
              ADMIN CONSOLE
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Sheraz Edge <br />
              <span className="text-pink-400">Constructions</span>
            </h2>
          </div>

          {/* Centered Vector Illustration */}
          <div className="my-auto py-6 relative z-10 flex justify-center items-center">
            <img
              src="/admin.webp"
              alt="Admin Portal Graphic"
              className="w-full max-w-[380px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback if image extension is .jpg
                (e.target as HTMLImageElement).src = '/admin.webp';
              }}
            />
          </div>

          {/* Footer Quote */}
          <div className="space-y-1 relative z-10">
            <blockquote className="text-[11px] text-slate-300 italic leading-relaxed">
              "Crafting structural dreams with uncompromised precision and engineering excellence."
            </blockquote>
            <p className="text-[10px] text-pink-400/80 font-semibold tracking-wider uppercase">
              CMS PORTAL V2.0
            </p>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Enter your database credentials to access the admin dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-2xl font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@sherazedge.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Password Input with Interactive Eye Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                {/* Eye Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.14 10.14 0 013.122-.363c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              {loading ? 'AUTHENTICATING...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}