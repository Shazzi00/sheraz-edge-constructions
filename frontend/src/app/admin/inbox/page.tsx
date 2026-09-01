'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  created_at?: string;
}

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError('Failed to fetch client messages from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } else {
        alert('Failed to delete message.');
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
                <h1 className="text-xl font-bold text-slate-800">Inbox / Contact Messages</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  View and manage inquiries sent through the website contact form
                </p>
              </div>
              <span className="bg-pink-50 text-pink-600 text-xs font-bold px-3 py-1 rounded-full border border-pink-200">
                {messages.length} Total Messages
              </span>
            </div>

            {loading ? (
              <p className="text-center py-10 text-xs text-slate-400 animate-pulse">
                Fetching client messages...
              </p>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-2xl font-semibold text-center">
                {error}
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-sm font-bold text-slate-700">No contact messages yet</p>
                <p className="text-xs text-slate-500">
                  Submissions from the "Contact Us" page will automatically show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3 hover:border-pink-200 transition-colors"
                  >
                    <div className="flex justify-between items-start border-b border-slate-200/60 pb-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{item.name}</h3>
                        <p className="text-xs text-pink-600 font-semibold">
                          {item.email} {item.phone ? `• ${item.phone}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {item.created_at && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {item.subject && (
                      <p className="text-xs font-bold text-slate-700">Subject: {item.subject}</p>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100 whitespace-pre-wrap">
                      {item.message || 'No additional message text provided.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}