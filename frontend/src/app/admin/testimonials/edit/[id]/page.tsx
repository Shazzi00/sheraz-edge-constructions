'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import AdminSidebar from '../../../components/AdminSidebar';
import { getImageUrl } from '../../../../utils/imageUrl';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchTestimonial = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/testimonials/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Testimonial not found');
        const data = await res.json();

        setName(data.name || '');
        setDesignation(data.designation || '');
        setRating(data.rating || 5);
        setReview(data.review || '');

        if (data.image) {
          setExistingImage(data.image);
        }
      } catch (err) {
        setError('Failed to load testimonial data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
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
      formData.append('rating', rating.toString());
      formData.append('review', review);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch(`http://127.0.0.1:8000/api/testimonials/${id}`, {
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
        setError(data.message || 'Failed to update testimonial.');
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
              <h1 className="text-xl font-bold text-slate-800">Testimonials / Edit #{id}</h1>
              <Link
                href="/admin/dashboard"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-5 py-2 rounded-xl shadow transition-all"
              >
                BACK
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-8 text-xs text-slate-500 animate-pulse">
                Loading testimonial data...
              </p>
            ) : (
              <>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 block">Author Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 block">Designation</label>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Rating (Stars)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                      <option value={2}>2 Stars ★★☆☆☆</option>
                      <option value={1}>1 Star ★☆☆☆☆</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Review Text</label>
                    <textarea
                      rows={4}
                      required
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 block">Update Author Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    {displayImageSrc && (
                      <div className="mt-2 w-20 h-20 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                        <img
                          src={displayImageSrc}
                          alt="Author Preview"
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
                    {saving ? 'UPDATING...' : 'UPDATE TESTIMONIAL'}
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