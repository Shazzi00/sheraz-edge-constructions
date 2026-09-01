export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: 'Cutting-Edge Solutions',
      description:
        'We leverage modern construction technologies, advanced building materials, and smart project management to ensure every project is completed efficiently, safely, and within budget.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Superior Craftsmanship',
      description:
        'Precision and quality guide every phase of our work. From structural foundations to interior finishes, our team adheres to strict standards to deliver structures built for longevity.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Knowledge and Expertise',
      description:
        'Backed by years of hands-on industry experience, our engineers and builders bring deep technical knowledge and proactive problem-solving to every construction challenge.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-slate-100/80 py-16 sm:py-24 px-6 sm:px-8 lg:px-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-pink-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Unmatched Quality & Dependable Construction
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            Created in close partnership with our clients and collaborators, our approach merges industry expertise,
            innovation, and flexibility to consistently deliver structural excellence.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 ease-in-out">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}