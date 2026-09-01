'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    members: 0,
    testimonials: 0,
    messages: 0,
  });

  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Live Digital Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Calendar Computation
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();
  const todayDate = now.getDate();
  const monthName = now.toLocaleString('default', { month: 'long' }).toUpperCase();

  const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Monday start
  const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonthIndex, 0).getDate();

  const calendarGrid = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    calendarGrid.push({ day: prevMonthDays - i, isPrev: true, isNext: false, isToday: false });
  }

  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarGrid.push({ day: i, isPrev: false, isNext: false, isToday: i === todayDate });
  }

  const remainingCells = (calendarGrid.length > 35 ? 42 : 35) - calendarGrid.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarGrid.push({ day: i, isPrev: false, isNext: true, isToday: false });
  }

  // Fast Backend Data Load
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setAdminEmail(parsed.email || 'sherazasadkhan123@gmail.com');
      } catch {
        setAdminEmail('sherazasadkhan123@gmail.com');
      }
    } else {
      setAdminEmail('sherazasadkhan123@gmail.com');
    }

    const fetchSingleStatsEndpoint = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          cache: 'no-store',
        });

        if (res.ok) {
          const data = await res.json();
          setStats({
            services: data.services || 0,
            projects: data.projects || 0,
            members: data.members || 0,
            testimonials: data.testimonials || 0,
            messages: data.messages || 0,
          });
          setRecentMessages(data.recent_messages || []);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleStatsEndpoint();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-between pt-20">
      <Navbar />

      <section className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-3">
            <AdminSidebar />
          </div>

          <article className="lg:col-span-9 space-y-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  LoggedIn: <span className="text-pink-600 font-semibold">{adminEmail}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/admin/inbox"
                  className="relative px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-xl transition-all shadow-xs flex items-center space-x-2 text-xs font-semibold"
                >
                  <span>Inbox</span>
                  {stats.messages > 0 && (
                    <span className="bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {stats.messages}
                    </span>
                  )}
                </Link>

                <Link
                  href="/admin/projects/create"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105"
                >
                  + ADD PROJECT
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/admin/projects"
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 hover:border-pink-300 transition-all block group"
              >
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                  <span>Projects</span>
                  <span className="text-pink-500 font-bold text-xs">PORTFOLIO</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mt-3">
                  {loading ? '...' : stats.projects}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block font-medium">Active Portfolio</span>
              </Link>

              <Link
                href="/admin/services"
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 hover:border-pink-300 transition-all block group"
              >
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                  <span>Services</span>
                  <span className="text-pink-500 font-bold text-xs">OFFERINGS</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mt-3">
                  {loading ? '...' : stats.services}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block font-medium">Public Offerings</span>
              </Link>

              <Link
                href="/admin/members"
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 hover:border-pink-300 transition-all block group"
              >
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                  <span>Members</span>
                  <span className="text-pink-500 font-bold text-xs">TEAM</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mt-3">
                  {loading ? '...' : stats.members}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block font-medium">Team Leaders</span>
              </Link>

              <Link
                href="/admin/testimonials"
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 hover:border-pink-300 transition-all block group"
              >
                <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                  <span>Testimonials</span>
                  <span className="text-pink-500 font-bold text-xs">REVIEWS</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mt-3">
                  {loading ? '...' : stats.testimonials}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block font-medium">Client Reviews</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Client Messages</h3>
                    <Link href="/admin/inbox" className="text-xs font-bold text-pink-500 hover:underline">
                      View All →
                    </Link>
                  </div>

                  {loading ? (
                    <p className="text-xs text-slate-400 py-6 text-center animate-pulse">Loading inquiries...</p>
                  ) : recentMessages.length === 0 ? (
                    <div className="text-center py-8 space-y-1">
                      <p className="text-xs text-slate-600 font-semibold">No pending messages</p>
                      <p className="text-[11px] text-slate-400">Client form submissions will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-slate-800">{msg.name}</h4>
                            <span className="text-[10px] text-pink-500 font-semibold">{msg.email}</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            "{msg.subject || msg.message || 'Client inquiry message.'}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white text-white p-6 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold tracking-wider text-pink-400 uppercase">
                    MANAGEMENT SHORTCUTS
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/admin/services/create"
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-200 hover:text-white transition-all text-center"
                    >
                      + New Service
                    </Link>
                    <Link
                      href="/admin/testimonials/create"
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-200 hover:text-white transition-all text-center"
                    >
                      + New Testimonial
                    </Link>
                  </div>
                </div>
              </div>

              {/* Calendar & Live Clock Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Live Digital Clock & Date */}
                <div className="bg-gradient-to-r from-slate-400 to-slate-400 text-white p-5 rounded-3xl shadow-sm border border-slate-400 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block">
                      SYSTEM TIME
                    </span>
                    <p className="text-2xl font-black font-mono tracking-wider mt-0.5 text-white">
                      {currentTime || '--:--:-- --'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                      TODAY
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {monthName} {currentYear}
                    </h3>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                      <span key={day} className="text-slate-400 font-bold py-1">
                        {day}
                      </span>
                    ))}

                    {calendarGrid.map((item, idx) => (
                      <div
                        key={idx}
                        className={`py-1.5 text-xs font-semibold rounded-xl ${
                          item.isToday
                            ? 'bg-pink-500 text-white font-bold shadow-xs'
                            : item.isPrev || item.isNext
                            ? 'text-slate-300'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.day}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}