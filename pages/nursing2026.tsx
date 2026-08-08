import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Nursing2026Page() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    city: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---- Animated counters ---- */
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState([0, 0, 0]);
  const counterTargets = [88000, 16, 6];
  const counterDone = useRef(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counterDone.current) {
          counterDone.current = true;
          const duration = 1800;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // ease-out
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounters(counterTargets.map((t) => Math.round(t * ease)));
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-pharmacy-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'nursing2026',
          name: formData.name,
          phone: formData.phone,
          email: '',
          course: formData.course,
          city: formData.city,
        }),
      });
      if (res.ok) {
        window.location.href = '/thank-you';
        return;
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Nursing Admissions 2026-27 | GNM, B.Sc &amp; P.B.Sc Nursing | ABS Educational Solution</title>
        <meta
          name="description"
          content="Start your healthcare career with expert admission guidance for GNM, B.Sc Nursing & P.B.Sc Nursing. INC approved colleges, scholarship support, placement guidance."
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-800">

        {/* ==================== HERO SECTION ==================== */}
        <section className="hero-banner relative text-white pt-6 pb-16 md:pt-10 md:pb-12" id="top">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <img src="/uploads/abs-logo.png" alt="ABS Educational Solution" className="h-16 md:h-20 flex-shrink-0" />
              <div className="overflow-hidden flex-1 border-l-2 border-white/30 pl-4">
                <div className="marquee-scroll whitespace-nowrap text-base md:text-base font-medium text-white/900 tracking-wider uppercase">
                  <span className="inline-block px-3">No NEET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">No CET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Affordable Fees</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Direct Admission</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Limited Seats</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">No NEET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">No CET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Affordable Fees</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Direct Admission</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Limited Seats</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">No NEET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">No CET</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Affordable Fees</span>
                  <span className="inline-block px-1 text-white/40">{'\u2022'}</span>
                  <span className="inline-block px-3">Direct Admission</span>

                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — headline + CTAs */}
              <div>
                <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  Admissions Open 2026{'\u2013'}27
                </span>
                {/* Scholarship banner — mobile only */}
                <div className="rounded-lg bg-yellow-400 px-4 py-2.5 text-center mb-4 md:hidden">
                  <p className="text-normal font-bold uppercase tracking-wide text-blue-900">
                    {'\uD83C\uDF93'} Upto 100% Scholarship Available
                  </p>
                  <p className="text-blue-900 text-xs font-medium">Limited Seats Available</p>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  Start Your Career in Healthcare
                </h1>
                <p className="text-blue-100 mb-6 text-lg drop-shadow-md font-semibold">
                  India{'\u2019'}s Most Trusted Admission Guidance for Nursing Courses
                </p>
                <p className="text-white mb-8 drop-shadow-sm font-medium">
                  Get admission into leading Nursing colleges with expert counselling, scholarship guidance, and complete admission support.
                </p>


                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="#apply"
                    className="px-8 py-4 bg-white text-blue-700 rounded-lg shadow-lg font-semibold text-lg hover:bg-blue-50 transition"
                  >
                    Book Free Counselling
                  </a>
                  <a
                    href="#apply"
                    className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg shadow-lg font-semibold text-lg hover:bg-yellow-300 transition"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
              {/* Right — course badges + Why ABS checklist */}
              <div>
                {/* Scholarship banner — desktop only */}
                <div className="hidden md:block rounded-lg bg-yellow-400 px-4 py-2.5 text-center mb-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                    {'\uD83C\uDF93'} Upto 100% Scholarship Available
                  </p>
                  <p className="text-blue-900 text-xs font-medium">Limited Seats Available</p>
                </div>
                <span style={{ position: 'relative', display: 'inline-block', zIndex: 1, padding: '0 10px', marginBottom: '16px' }}>
                  <span style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 'bold', fontSize: '1.605rem' }}>
                    Apply for Courses
                  </span>
                  <svg
                    viewBox="0 0 500 100"
                    preserveAspectRatio="none"
                    style={{
                      position: 'absolute',
                      top: '55%',
                      left: '50%',
                      width: '110%',
                      height: '140%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  >

                  </svg>
                </span>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { name: 'GNM', sub: '3 Yrs + Internship' },
                    { name: 'B.Sc', sub: '4 Years' },
                    { name: 'P.B.Sc', sub: '2 Years' },
                  ].map((c, i) => (
                    <div key={i} className="bg-blue-900/60 backdrop-blur-sm border border-white/30 rounded-xl p-3 md:p-4 text-center shadow-lg">
                      <p className="font-bold text-xl md:text-3xl text-white">{c.name}</p>
                      <p className="text-blue-100 text-xs md:text-sm mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="why-choose-card">
                  <h3>Why Choose ABS?</h3>
                  <ul>
                    {[
                      '88,000+ Students Counselled',
                      '16+ Years of Admission Guidance',
                      'INC Approved Colleges',
                      'Direct Admission Assistance',
                      'Scholarship Support',
                      'Affordable Fee Structure',
                      'Hostel Assistance',
                      'Placement Guidance',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="check">{'\u2713'}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== ABOUT NURSING ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Build a Rewarding Career in Nursing</h2>
            <p className="text-center text-blue-600 font-medium mb-8">India{'\u2019'}s Most In-Demand Healthcare Profession</p>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left — description + stats */}
              <div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Nursing is one of the fastest-growing healthcare professions, offering excellent career opportunities in hospitals, community healthcare, research, education, and international healthcare organizations.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ABS Educational Solution helps students choose the right Nursing program based on their academic background, career goals, and budget. From counselling to final admission, our experienced team supports you at every stage of your journey.
                </p>

                {/* Stat strip */}
                <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { target: 0, suffix: '+', label: 'Students Counselled' },
                    { target: 1, suffix: '+', label: 'Years Experience' },
                    { target: 2, suffix: '', label: 'Branches in Mumbai' },
                  ].map((s, i) => (
                    <div key={i} className="bg-blue-50 rounded-xl px-2 py-3 sm:p-4 text-center">
                      <p className="text-lg sm:text-2xl font-bold text-blue-700">
                        {counters[s.target].toLocaleString('en-IN')}{s.suffix}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — career highlights grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '\uD83C\uDFE5', title: 'Hospital Jobs', desc: 'Work in top govt & private hospitals across India' },
                  { icon: '\uD83C\uDF0D', title: 'Global Opportunities', desc: 'Nursing degrees recognized internationally' },
                  { icon: '\uD83D\uDCB0', title: 'High Salary', desc: 'Starting salary 3-6 LPA with rapid growth' },
                  { icon: '\uD83C\uDF93', title: 'Higher Studies', desc: 'M.Sc Nursing, specializations & PhD options' },
                  { icon: '\uD83E\uDDEC', title: 'Research & Teaching', desc: 'Opportunities in academic & clinical research' },
                  { icon: '\u2764\uFE0F', title: 'Make a Difference', desc: 'Directly impact lives through patient care' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== LEAD FORM ==================== */}
        <section id="apply" className="py-14 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — Image */}
              <div className="hidden md:block">
                <img
                  src="/pharmacy/form-nursing.png"
                  alt="Nursing students"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>

              {/* Right — Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Get Free Admission Guidance</h2>
                <p className="text-gray-600 text-center mb-6">
                  Fill in your details and our admission expert will contact you shortly.
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <p className="text-green-700 text-xl font-semibold mb-2">Thank you!</p>
                    <p className="text-green-600">Our admission expert will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Mobile Number"
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="" disabled>Preferred Course</option>
                      <option>GNM Nursing</option>
                      <option>B.Sc Nursing</option>
                      <option>P.B.Sc Nursing</option>
                    </select>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <label className="flex items-start gap-2 text-sm text-gray-600">
                      <input
                        required
                        type="checkbox"
                        className="mt-1"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      />
                      <span>I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Terms &amp; Conditions</a></span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-950 disabled:opacity-50 transition"
                    >
                      {submitting ? 'Submitting...' : 'Get Free Counselling'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== NURSING COURSES ==================== */}
        <section id="courses" className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Nursing Courses</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* GNM */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition flex flex-col">
                <h3 className="text-2xl font-bold mb-1">GNM Nursing</h3>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p><span className="font-semibold">Duration:</span> 3 Years + Internship</p>
                  <p><span className="font-semibold">Eligibility:</span> 12th Pass (Any Stream)</p>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Career Opportunities</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {['Staff Nurse', 'Community Health Worker', 'Nursing Assistant', 'Hospital Administration'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">{'\u2022'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#apply" className="block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 transition mt-auto">
                  Apply for GNM
                </a>
              </div>

              {/* B.Sc */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition flex flex-col">
                <h3 className="text-2xl font-bold mb-1">B.Sc Nursing</h3>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p><span className="font-semibold">Duration:</span> 4 Years</p>
                  <p><span className="font-semibold">Eligibility:</span> 12th Science (PCB)</p>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Career Opportunities</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {['Registered Nurse', 'ICU Nurse', 'Operation Theatre Nurse', 'Clinical Instructor', 'International Nursing Jobs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">{'\u2022'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#apply" className="block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 transition mt-auto">
                  Apply for B.Sc Nursing
                </a>
              </div>

              {/* P.B.Sc */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition flex flex-col">
                <h3 className="text-2xl font-bold mb-1">P.B.Sc Nursing</h3>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p><span className="font-semibold">Duration:</span> 2 Years</p>
                  <p><span className="font-semibold">Eligibility:</span> GNM Qualified</p>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Career Opportunities</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {['Senior Staff Nurse', 'Nursing Supervisor', 'Clinical Educator', 'Healthcare Management'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">{'\u2022'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#apply" className="block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 transition mt-auto">
                  Apply for P.B.Sc Nursing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== WHY STUDENTS CHOOSE ABS ==================== */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <span className="block text-center text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-2">Trusted Since 2009</span>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Students Choose ABS</h2>
            <p className="text-blue-200 text-center mb-12 max-w-2xl mx-auto">
              Our experienced admission counsellors help students find the right Nursing college based on eligibility, budget, and career goals.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: 'Free Career Counselling', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 12.75c0 2.278-.638 4.408-1.743 6.223L12 14z' },
                { title: 'Direct Admission Guidance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { title: 'Scholarship Assistance', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Affordable Colleges', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                { title: 'Documentation Support', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { title: 'Hostel Assistance', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { title: 'Education Loan Guidance', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                { title: 'Placement Support', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { title: 'Transparent Process', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'No Hidden Charges', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
              ].map((item, i) => (
                <div key={i} className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300 cursor-default">
                  <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="font-medium text-sm leading-tight text-blue-50">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ADMISSION PROCESS ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Admission in Just 4 Easy Steps</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — steps */}
              <div className="space-y-0">
                {[
                  { step: '1', title: 'Submit Your Enquiry' },
                  { step: '2', title: 'Talk to an Expert Counsellor' },
                  { step: '3', title: 'Choose Your Preferred College' },
                  { step: '4', title: 'Complete Admission' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      {i < 3 && <div className="w-0.5 h-12 bg-blue-200" />}
                    </div>
                    <div className="pb-8">
                      <p className="font-semibold text-gray-800 pt-2">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right — image */}
              <div className="hidden md:block">
                <img
                  src="/pharmacy/banner-form.png"
                  alt="Admission guidance"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== WHY NURSING ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Nursing?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'High Demand Career',
                'Excellent Salary Growth',
                'Government & Private Jobs',
                'Overseas Opportunities',
                'Career Stability',
                'Higher Education Options',
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="font-semibold text-sm text-gray-700 flex items-center justify-center gap-2">
                    <span className="text-green-500">{'\u2714'}</span>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            {[
              {
                q: 'Who can apply?',
                a: 'Students who have completed 12th (eligibility varies by course).',
              },
              {
                q: 'Is scholarship available?',
                a: 'Yes, eligible students can receive scholarship guidance.',
              },
              {
                q: 'Are colleges approved?',
                a: 'Admissions are guided for recognized and approved institutions.',
              },
              {
                q: 'Is hostel available?',
                a: 'Yes, hostel assistance is available.',
              },
              {
                q: 'Do you provide placement guidance?',
                a: 'Yes, We do provide guidance for placements and career opportunities after course completion.',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl p-5 mb-3 group" open={i === 0}>
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform text-xl">{'\u25BE'}</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="py-16 bg-blue-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become a Healthcare Professional?</h2>
            <p className="text-blue-100 mb-2 text-lg">Get FREE Career Counselling Today.</p>
            <p className="text-blue-200 mb-8">Admissions Open 2026{'\u2013'}27</p>
            <a
              href="#apply"
              className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg shadow-lg font-semibold text-lg hover:bg-blue-50 transition"
            >
              Book Your Free Counselling
            </a>
          </div>
        </section>

      </div>

      <style jsx>{`
        
        .hero-banner {
          background-image: linear-gradient(rgba(30,58,138,0.45), rgba(30,58,138,0.30)), url(/pharmacy/banner-nursing-portrait.png);
          background-size: cover;
          background-position: center center;
        }
        @media (min-width: 768px) {
          .hero-banner {
            background-image: linear-gradient(to right, rgba(30,58,138,0.35) 45%, rgba(30,64,175,0.15)), url(/pharmacy/banner-nursing.png);
            background-position: center center;
          }
        }

        .marquee-scroll {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .why-choose-card {
          background: rgba(5, 35, 90, 0.58);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 20px;
          padding: 24px 20px;
          box-shadow: 0 14px 35px rgba(0, 25, 70, 0.35);
        }
        .why-choose-card h3 {
          color: #ffffff;
          font-size: 24px;
          margin-bottom: 18px;
        }
        .why-choose-card ul {
          display: grid;
          gap: 14px;
        }
        .why-choose-card li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
        }
        .why-choose-card .check {
          display: grid;
          place-items: center;
          flex: 0 0 26px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #37df82;
          color: #073c2c;
          font-weight: 800;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'ABS Educational Solution',
            url: 'https://abseducationalsolution.com',
            areaServed: 'Mumbai, India',
            foundingDate: '2009',
            offers: [
              { '@type': 'Course', name: 'GNM Nursing' },
              { '@type': 'Course', name: 'B.Sc Nursing' },
              { '@type': 'Course', name: 'P.B.Sc Nursing' },
            ],
          }),
        }}
      />
    </>
  );
}
