'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface Service {
  id: number;
  title: string;
  slug: string;
  status: string;
}


export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setServices((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete service', err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-between pt-20">
      <Navbar />

      <section className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 lg:col-span-3">
            <AdminSidebar />
          </div>

          <article className="md:col-span-8 lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h1 className="text-xl font-bold text-slate-800">Services</h1>
              <Link
                href="/admin/services/create"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow transition-all hover:scale-105"
              >
                CREATE
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-8 text-xs text-slate-500 animate-pulse">Loading services...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-700 uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Slug</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {services.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{item.id}</td>
                        <td className="py-3.5 px-4 font-medium">{item.title}</td>
                        <td className="py-3.5 px-4 text-slate-500">{item.slug}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">{item.status}</td>
                        <td className="py-3.5 px-4 space-x-2">
                          <Link
                            href={`/admin/services/edit/${item.id}`}
                            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            EDIT
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                    {services.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-slate-400">
                          No services found. Click Create to add one.
                        </td>
                      </tr>
                    )}
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