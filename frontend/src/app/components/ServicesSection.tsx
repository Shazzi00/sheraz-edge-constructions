'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getImageUrl } from '../utils/imageUrl';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  content: string;
  status: string;
  image: string;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/services');
        const data = await res.json();
        // Only active services created from Admin
        const activeServices = data.filter((item: Service) => item.status === 'Active');
        setServices(activeServices);
      } catch (err) {
        console.error('Failed to fetch services from database:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const displayedServices = services.slice(0, 4);

  return (
    <section className="bg-white py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our construction services
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-500 animate-pulse">
            Loading services from database...
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No services added yet. Add services from the admin panel to display them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-slate-900"
              >
                {service.image ? (
                  <img
                    src={getImageUrl(service.image)}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    No Image Uploaded
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-6 flex flex-col justify-end transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-3 opacity-0 max-h-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mb-4 transition-all duration-300">
                    {service.short_desc || service.content}
                  </p>

                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold text-[10px] uppercase px-4 py-2 rounded tracking-wider shadow"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Services Button */}
        {services.length > 0 && (
          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-xl tracking-wider shadow-md transition-transform hover:scale-105"
            >
              VIEW ALL SERVICES
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}