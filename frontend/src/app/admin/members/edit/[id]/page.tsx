'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import AdminSidebar from '../../../components/AdminSidebar';
import { getImageUrl } from '../../../../utils/imageUrl';

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/members/${id}`);
        if (!res.ok) throw new Error('Member not found');
        const data = await res.json();

        setName(data.name || '');
        setDesignation(data.designation || '');
        setLinkedinUrl(data.linkedin_url || '');

        if (data.image) {
          setExistingImage(data.image);
        }
      } catch (err) {
        setError('Failed to load team member data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const token = localStorage.getItem('adminToken');

    if (!token) {
      setError('Session expired. Please log in again.');
      setSaving(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', name);
      formData.append('designation', designation);
      if (linkedinUrl) formData.append('linkedin_url', linkedinUrl);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch(`http://127.0.0.1:8000/api/members/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && (data.success || data.id)) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Failed to update team member.');
      }
    } catch (err) {
      setError('Connection error. Ensure Laravel backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const displayImageSrc = newImagePreview || getImageUrl(existingImage);

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
              <h1 className="text-xl font-bold text-slate-800">Members / Edit #{id}</h1>
              <Link
                href="/admin/dashboard"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-5 py-2 rounded-xl shadow transition-all"
              >
                BACK
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-8 text-xs text-slate-500 animate-pulse">
                Loading member data...
              </p>
            ) : (
              <>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Member Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Designation / Role</label>
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 block">Update Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    {displayImageSrc && (
                      <div className="mt-2 w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                        <img
                          src={displayImageSrc}
                          alt="Member Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 text-white font-bold text-xs uppercase px-8 py-3 rounded-xl shadow transition-all hover:scale-105"
                  >
                    {saving ? 'UPDATING...' : 'UPDATE MEMBER'}
                  </button>
                </form>
              </>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}