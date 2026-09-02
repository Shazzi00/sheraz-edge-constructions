'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sheraz-constructions-api.vercel.app/api';
      const res = await fetch(`${API_BASE}/contact-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Ensure Laravel backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Us
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            Our dedicated experts are here to help you with any of your questions, contact us by filling out the form below and we will be in touch shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Sidebar */}
          <aside className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-sm text-slate-600">(+92467439117)</p>
              <p className="text-sm text-slate-600">(222-123-12345)</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">You can write us:</h3>
              <p className="text-sm text-slate-600">sherazasadkhan123@gmail.com</p>
              <p className="text-sm text-slate-600">info@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Address:</h3>
              <p className="text-sm text-slate-600">B-18X, Sheraz Edge Constructions</p>
              <p className="text-sm text-slate-600">example , 226017</p>
              <p className="text-sm text-slate-600">0522400XXXX</p>
            </div>
          </aside>

          {/* Contact Form */}
          <article className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-semibold">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone No."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-xl shadow transition-all hover:scale-105"
              >
                {loading ? 'SENDING...' : 'SEND NOW'}
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}