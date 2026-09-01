'use client';

import { useEffect, useState } from 'react';
import { getImageUrl } from '../utils/imageUrl';

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  rating: number;
  review: string;
  image?: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/testimonials');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Duplicate testimonials array for infinite continuous loop
  const sliderItems = [...testimonials, ...testimonials];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-amber-400' : 'text-slate-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="bg-slate-100/60 py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      {/* Dynamic Keyframe Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-continuous {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto px-6">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What people are saying about us
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
          </p>
        </div>

        {loading ? (
          <div className="flex space-x-6 justify-center px-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-80 sm:w-96 h-64 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-slate-500 text-xs py-8">No testimonials available yet.</p>
        ) : (
          /* Marquee Container with Gradient Edge Fades */
          <div className="relative w-full overflow-hidden py-4">
            {/* Left Edge Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />

            {/* Continuous Sliding Track */}
            <div className="animate-marquee-continuous space-x-6 px-6">
              {sliderItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[300px] sm:w-[380px] bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-6 flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-3">
                    {/* Rating Stars */}
                    <div className="text-sm tracking-widest">
                      {renderStars(item.rating || 5)}
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-4">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-100">
                    <img
                      src={getImageUrl(item.image) || '/default-avatar.png'}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Edge Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />
          </div>
        )}
      </div>
    </section>
  );
}