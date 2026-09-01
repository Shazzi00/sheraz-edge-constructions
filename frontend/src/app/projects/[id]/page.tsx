'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getImageUrl } from '../../utils/imageUrl';

interface Project {
  id: number;
  title: string;
  location: string;
  construction_type: string;
  sector: string;
  description: string;
  full_description: string;
  image: string;
  image_url?: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id;

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchProjectData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/projects');
        const data: Project[] = await res.json();
        setProjects(data);

        const found = data.find((p) => String(p.id) === String(projectId));
        setCurrentProject(found || null);
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-xs text-slate-500 animate-pulse font-semibold">Loading project details...</p>
      </main>
    );
  }

  if (!currentProject) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col justify-between pt-20">
        <Navbar />
        <div className="text-center py-24 text-slate-600 font-bold text-sm">
          Project not found in database.
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
          
          {/* Dynamic Projects Sidebar */}
          <aside className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/70 space-y-6 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Our Projects
            </h3>
            <ul className="space-y-2">
              {projects.map((proj) => {
                const isActive = proj.id === currentProject.id;
                return (
                  <li key={proj.id}>
                    <Link
                      href={`/projects/${proj.id}`}
                      className={`block text-xs sm:text-sm font-semibold transition-all py-2.5 px-3.5 rounded-xl ${
                        isActive
                          ? 'bg-slate-100 text-pink-500 font-bold translate-x-1'
                          : 'text-slate-600 hover:text-pink-500 hover:bg-slate-50'
                      }`}
                    >
                      {proj.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Project Detail Content */}
          <article className="lg:col-span-8 space-y-8">
            <div className="w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 bg-slate-900 flex items-center justify-center">
              {currentProject.image_url || currentProject.image ? (
                <img
                  src={getImageUrl(currentProject.image_url || currentProject.image)}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-slate-500 text-xs">No image provided</p>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {currentProject.title}
              </h1>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-3 py-1">
                {currentProject.location && (
                  <span className="bg-pink-50 text-pink-600 border border-pink-200/60 text-xs font-semibold px-3 py-1 rounded-full">
                    📍 {currentProject.location}
                  </span>
                )}
                {currentProject.construction_type && (
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1 rounded-full">
                    🏗️ {currentProject.construction_type}
                  </span>
                )}
                {currentProject.sector && (
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1 rounded-full">
                    🏛️ {currentProject.sector}
                  </span>
                )}
              </div>

              {currentProject.description && (
                <p className="text-sm font-semibold text-slate-700 leading-relaxed pt-2">
                  {currentProject.description}
                </p>
              )}

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                {currentProject.full_description || currentProject.description}
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
}