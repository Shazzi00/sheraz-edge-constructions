'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AdminSidebar from '../../components/AdminSidebar';

export default function CreateProjectPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [constructionType, setConstructionType] = useState('');
  const [sector, setSector] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const token = localStorage.getItem('adminToken');

    if (!token) {
      setErrorMsg('Session expired. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('construction_type', constructionType);
      formData.append('sector', sector);
      formData.append('short_desc', shortDesc);
      formData.append('description', description);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('http://127.0.0.1:8000/api/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg('Project created successfully!');
        setTitle('');
        setLocation('');
        setConstructionType('');
        setSector('');
        setShortDesc('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
      } else {
        setErrorMsg(data.message || 'Failed to create project.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Ensure Laravel backend is running.');
    } finally {
      setLoading(false);
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
              <h1 className="text-xl font-bold text-slate-800">Projects / Create</h1>
              <Link
                href="/admin/dashboard"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-5 py-2 rounded-xl shadow transition-all"
              >
                BACK
              </Link>
            </div>

            {successMsg && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl font-semibold">
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Residential Complex A"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="Lucknow, UP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Construction Type</label>
                  <input
                    type="text"
                    required
                    placeholder="Turnkey, Remodeling, etc."
                    value={constructionType}
                    onChange={(e) => setConstructionType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Sector</label>
                  <input
                    type="text"
                    required
                    placeholder="Residential, Commercial, etc."
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Short Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Full Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed specifications and execution breakdown..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer bg-slate-50 border border-slate-200 rounded-xl"
                />
                {imagePreview && (
                  <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 text-white font-bold text-xs uppercase px-8 py-3 rounded-xl shadow transition-all hover:scale-105"
              >
                {loading ? 'SAVING...' : 'SAVE PROJECT'}
              </button>
            </form>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}