'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Testimonials', href: '/admin/testimonials' },
    { label: 'Members', href: '/admin/members' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return (
    <aside className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
        Sidebar
      </h2>

      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`block text-left py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border-b border-slate-100/60 last:border-0 ${
                isActive
                  ? 'bg-slate-100 text-pink-500 font-bold translate-x-1'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase py-3 rounded-xl tracking-wider shadow-sm transition-all hover:scale-[1.02] active:scale-95"
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
}