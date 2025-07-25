// components/JoinUs.tsx
import Image from 'next/image';

export default function JoinUs() {
  // Perks – updated for organization relevance
  const perks = [
    ['Admission Guidance', 'Personalized Career Counseling'],
    ['100% placement assistance', 'Direct Admission Without Entrance Exam'],
    ['Career Planning & Course Selection', 'Complete Student Support – From admission to placement, we assist you at every step.'],
  ];

  // Stats – updated "years" as per your latest data
  const stats = [
    { value: '80 K+', label: 'Counselling sessions' },
    { value: '12 K+', label: 'Students trained' },
    { value: '16 years', label: 'Of trusted guidance' },
  ];

  return (
<<<<<<< HEAD
    <section className="mt-6 mb-6 px-4 bg-gray-50">
=======
    <section className="mt-32 mb-28 px-4 bg-gray-50">
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
      <div className="mx-auto max-w-7xl">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Top content */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section - First on mobile, right on desktop */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-10 md:p-16 flex items-center justify-center order-1 md:order-2">
              <div className="relative">
                <Image
                  src="/uploads/pharmacy college in mumbai.png"
                  alt="ABS Educational Solution team"
                  width={600}
                  height={600}
                  className="rounded-2xl object-cover w-full h-auto shadow-xl transform scale-x-[-1]"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Content Section - Second on mobile, left on desktop */}
            <div className="p-10 md:p-16 order-2 md:order-1">
              <h2 className="font-bold text-3xl md:text-5xl mb-6 text-gray-900 leading-tight">
                About ABS Educational Solution
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                At ABS Educational Solution, we don't just guide careers — we build futures. With over 16 years of excellence in student counselling and pharmacy admissions, our mission is to simplify the admission journey for aspiring healthcare professionals.
              </p>

              <ul className="grid sm:grid-cols-1 gap-y-4 mb-10 text-base md:text-lg">
                {perks.flat().map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-green-600"
                      >
                        <path d="M5 10l3 3 7-7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/courses"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium group shadow-sm"
              >
                Explore Available Courses
                <svg
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 3l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-10 md:px-16 py-12">
            <div className="grid sm:grid-cols-3 text-center gap-10">
              {stats.map(({ value, label }, index) => (
                <div key={label} className="relative">
                  {index !== stats.length - 1 && (
                    <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-gray-200"></div>
                  )}
                  <div className="relative">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{value}</p>
                    <p className="text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supporting Text */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            Whether it's Pharmacy, Paramedical, Nursing, or Allied Health courses, we provide trusted guidance, seamless support, and expert mentorship. Join thousands of successful students who've transformed their careers with our guidance.
          </p>
        </div>
      </div>
    </section>
  );
}