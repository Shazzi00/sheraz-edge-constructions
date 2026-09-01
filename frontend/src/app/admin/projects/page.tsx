'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface Project {
  id: number;
  title: string;
  location?: string;
  category?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to load projects from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete project.');
      }
    } catch {
      alert('Error connecting to backend.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-between pt-20">
      <Navbar />

      <section className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <AdminSidebar />
          </div>

          <article className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-xl font-bold text-slate-800">Projects Management</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage portfolio items shown on the website</p>
              </div>
              <Link
                href="/admin/projects/create"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105"
              >
                + ADD PROJECT
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-10 text-xs text-slate-400 animate-pulse">Loading projects...</p>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 text-xs rounded-2xl font-semibold text-center border border-red-200">
                {error}
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center py-10 text-xs text-slate-500">No projects found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                    {projects.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{item.title}</td>
                        <td className="py-3.5 px-4 text-slate-500">{item.location || 'N/A'}</td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <Link
                            href={`/admin/projects/edit/${item.id}`}
                            className="text-pink-600 hover:text-pink-700 font-bold bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded-lg border border-red-100"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}