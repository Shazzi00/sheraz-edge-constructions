'use client';

import { useEffect, useState } from 'react';
import { getImageUrl } from '../utils/imageUrl';

interface Member {
  id: number;
  name: string;
  designation: string;
  linkedin_url?: string;
  image: string;
  image_url?: string;
}

export default function TeamSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/members');
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error('Failed to fetch team members from database:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Team
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            We specialize in a wide range of construction services, including residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Dynamic Team Grid */}
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-500 animate-pulse">
            Loading team members...
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No team members added yet. Add members from the admin panel to display them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow"
              >
                {/* Profile Image */}
                <div className="h-[280px] w-full bg-slate-900 overflow-hidden">
                  {member.image_url || member.image ? (
                    <img
                      src={getImageUrl(member.image_url || member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                      No Photo Uploaded
                    </div>
                  )}
                </div>

                {/* Info Card */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {member.designation}
                  </p>

                  {/* LinkedIn Link */}
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block pt-1 text-slate-800 hover:text-sky-600 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}