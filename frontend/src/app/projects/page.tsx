'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageUrl } from '../utils/imageUrl';

interface Project {
  id: number;
  title: string;
  location?: string;
  construction_type?: string;
  sector?: string;
  short_desc?: string;
  description?: string;
  image?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between pt-20">
      <Navbar />

      <section className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Projects
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Explore our landmark engineering developments, residential villas, and commercial structures across Pakistan.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="group relative h-[380px] rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 flex flex-col justify-end cursor-pointer"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={getImageUrl(item.image) || '/placeholder-project.jpg'}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent group-hover:from-slate-950/95 group-hover:via-slate-950/80 transition-all duration-300" />

                {/* Content Area */}
                <div className="relative p-6 z-10 flex flex-col justify-end space-y-1">
                  {/* Always Visible Default View */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.location && (
                      <p className="text-xs text-pink-400 font-semibold tracking-wide">
                        {item.location} {item.construction_type ? `• ${item.construction_type}` : ''}
                      </p>
                    )}
                  </div>

                  {/* Revealed Only on Hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden space-y-3 pt-1">
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.short_desc || item.description || 'View full project specifications and structural execution details.'}
                    </p>
                    <div>
                      <span className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl shadow transition-all group-hover:scale-105">
                        READ MORE
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}