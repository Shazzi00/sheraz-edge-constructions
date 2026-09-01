'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getImageUrl } from '../../utils/imageUrl';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  content: string;
  status: string;
  image: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id;

  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;

    const fetchServiceData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/services');
        const data: Service[] = await res.json();
        
        const activeServices = data.filter((s) => s.status === 'Active');
        setServices(activeServices);

        const found = activeServices.find((s) => String(s.id) === String(serviceId));
        setCurrentService(found || null);
      } catch (err) {
        console.error('Failed to load service details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-xs text-slate-500 animate-pulse font-semibold">Loading service details...</p>
      </main>
    );
  }

  if (!currentService) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col justify-between pt-20">
        <Navbar />
        <div className="text-center py-24 text-slate-600 font-bold text-sm">
          Service not found or is currently inactive.
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between pt-20">
      <Navbar />

      <section className="py-12 sm:py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Dynamic Services Sidebar */}
          <aside className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/70 space-y-6 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => {
                const isActive = service.id === currentService.id;
                return (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className={`block text-xs sm:text-sm font-semibold transition-all py-2.5 px-3.5 rounded-xl ${
                        isActive
                          ? 'bg-slate-100 text-pink-500 font-bold translate-x-1'
                          : 'text-slate-600 hover:text-pink-500 hover:bg-slate-50'
                      }`}
                    >
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Service Detail Content */}
          <article className="lg:col-span-8 space-y-8">
            <div className="w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 bg-slate-900 flex items-center justify-center">
              {currentService.image ? (
                <img
                  src={getImageUrl(currentService.image)}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-slate-500 text-xs">No image provided</p>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {currentService.title}
              </h1>
              {currentService.short_desc && (
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  {currentService.short_desc}
                </p>
              )}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                {currentService.content}
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
}