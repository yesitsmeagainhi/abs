import Head from 'next/head';
import { useState } from 'react';

export default function PharmaAndNursingCourses2026Page() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    city: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-pharmacy-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pharma-nursing-courses2026',
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
        <title>Admissions Open 2026-27 | Pharmacy, Nursing, BPT, DMLT Courses | ABS Educational Solution</title>
        <meta
          name="description"
          content="Explore top career courses after 12th — D.Pharm, B.Pharm, GNM, B.Sc Nursing, P.B.Sc Nursing, BPT, DMLT. Expert admission guidance from ABS Educational Solution."
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-800">

        {/* ==================== HERO SECTION ==================== */}
        {/* <section className="bg-blue-900 text-white pt-6 pb-16 md:pb-20" id="top"> */}
        <section className="hero-banner relative text-white pt-6 pb-16 md:pt-10 md:pb-12" id="top">

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <img src="/uploads/abs-logo.png" alt="ABS Educational Solution" className="h-16 md:h-20 flex-shrink-0" />
              <div className="overflow-hidden flex-1 border-l-2 border-white/30 pl-4">
                <div className="marquee-scroll whitespace-nowrap text-xs md:text-sm font-medium text-white/80 tracking-wider uppercase">
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
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
              {/* Left — headline */}
              <div>
                <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  Admissions Open 2026{'\u2013'}27
                </span>
                {/* <p className="text-blue-200 text-xl md:text-2xl font-bold uppercase tracking-wider mb-3">Admissions Open 2026{'\u2013'}27</p> */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  Explore Top Career Courses After 12th
                </h1>
                <p className="text-blue-100 mb-6 text-xl">
                  Choose the right career with expert admission guidance from ABS Educational Solution.
                </p>
                <div className="flex flex-wrap gap-4">
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

              {/* Right — campus image */}
              {/* <div className="hidden md:block">
                <img
                  src="/pharmacy/college-students.png"
                  alt="College campus"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                />
              </div> */}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Courses — no background */}
              <div>
                <p className="text-white font-bold text-3xl mb-3">Courses Offered</p>
                <div className="flex flex-wrap gap-2">
                  {['D.Pharm', 'B.Pharm', 'GNM Nursing', 'B.Sc Nursing', 'BPT', 'DMLT'].map((c, i) => (
                    <span key={i} className="bg-blue-900 border border-blue-700 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-800 transition cursor-default">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why ABS — white overlay */}
              <div className="bg-white/20 md:bg-white rounded-2xl p-5 shadow-lg">
                <p className="text-white md:text-blue-900 font-bold text-2xl mb-3 border-b-2 border-blue-100 pb-2">Why ABS?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {[
                    '88,000+ Students Counselled',
                    '16+ Years Experience',
                    'Expert Career Guidance',
                    'Scholarship Support',
                    'Approved Colleges',
                    'Transparent Process',
                    'Free Counselling',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-blue-50 rounded-lg px-3 py-2">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">{'\u2713'}</span>
                      <span className="text-blue-900 text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:hidden">
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
        </section>

        {/* ==================== FIND THE RIGHT COURSE ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Find the Right Course</h2>
            <p className="text-gray-600 text-center">
              Whether you want to build a career in healthcare, pharmacy, nursing, allied health sciences, ABS Educational Solution helps you choose the right course and college through personalized career counselling and admission guidance.
            </p>
          </div>
        </section>

        {/* ==================== LEAD FORM ==================== */}
        <section id="apply" className="py-14 bg-gray-50">

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — Form */}
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
                    <option>D.Pharm</option>
                    <option>B.Pharm</option>
                    <option>GNM Nursing</option>
                    <option>B.Sc Nursing</option>
                    <option>P.B.Sc Nursing</option>
                    <option>BPT</option>
                    <option>DMLT</option>
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
              {/* Right — Image */}
              <div className="hidden md:block">
                <img src="/pharmacy/form-all-courses.png" alt="..." className="w-full h-auto rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== HEALTHCARE COURSES ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Healthcare Courses</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pharmacy */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:bg-blue-100 transition">
                <h3 className="text-xl font-bold mb-1">Pharmacy</h3>
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">D.Pharm</span>
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">B.Pharm</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Learn pharmaceutical sciences and prepare for careers in hospitals, retail pharmacy and healthcare industries.
                </p>
              </div>

              {/* Nursing */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:bg-blue-100 transition">
                <h3 className="text-xl font-bold mb-1">Nursing</h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">GNM</span>
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">B.Sc Nursing</span>
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">P.B.Sc Nursing</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Build a rewarding career in patient care, hospitals, community healthcare, and international nursing.
                </p>
              </div>

              {/* Physiotherapy */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:bg-blue-100 transition">
                <h3 className="text-xl font-bold mb-1">Physiotherapy</h3>
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Bachelor of Physiotherapy (BPT)</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Develop expertise in rehabilitation, sports medicine, and physical therapy.
                </p>
              </div>

              {/* Allied Health */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:bg-blue-100 transition">
                <h3 className="text-xl font-bold mb-1">Allied Health</h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">DMLT</span>
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Medical Laboratory Technology</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Work in diagnostics, pathology labs, hospitals, and surgical departments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== WHY CHOOSE ABS ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-center text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Your Trusted Admission Partner</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Choose ABS Educational Solution?</h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">End-to-end admission support from career counselling to placement guidance — everything under one roof.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { icon: 'M12 14l9-5-9-5-9 5 9 5z', title: 'Career Counselling', desc: 'Personalized guidance to choose the right course' },
                { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'College Selection', desc: 'Access to top approved colleges across India' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Admission Guidance', desc: 'Step-by-step help through the admission process' },
                { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Scholarship Assistance', desc: 'Help in securing merit & need-based scholarships' },
                { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Documentation Support', desc: 'Complete assistance with paperwork & verification' },
                { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Hostel Assistance', desc: 'Help finding safe & affordable accommodation' },
                { icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Placement Guidance', desc: 'Career support & placement opportunities' },
                { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Education Loan Guidance', desc: 'Assistance with loan applications & approvals' },
                { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Post Admission Support', desc: 'Continued guidance even after you get admitted' },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-3 transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="font-bold text-sm text-gray-800 mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ADMISSION PROCESS ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Admission Process</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-0">
              {[
                'Fill the Enquiry Form',
                'Free Career Counselling',
                'Select Your Course',
                'Choose Your College',
                'Complete Admission',
              ].map((title, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < 4 && <div className="w-0.5 h-12 bg-blue-200" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-gray-800 pt-2">{title}</p>
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

        {/* ==================== WHY THOUSANDS TRUST ABS ==================== */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <p className="text-center text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-2">Trusted Since 2009</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Thousands of Students Trust ABS</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '\uD83C\uDFC6', title: '16+ Years Experience' },
                { icon: '\uD83C\uDF93', title: '88,000+ Students Counselled' },
                { icon: '\uD83D\uDCAC', title: 'Expert Career Counsellors' },
                { icon: '\uD83D\uDCDA', title: 'Multiple Course Options' },
                { icon: '\uD83D\uDCB0', title: 'Affordable Fee Guidance' },
                { icon: '\u2705', title: 'Transparent Admission Process' },
                { icon: '\u2764\uFE0F', title: 'Student-Centric Support' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/15 transition cursor-default">
                  <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-sm text-blue-50 leading-tight">{item.title}</p>
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
                q: 'Which courses are available after 12th?',
                a: 'Healthcare, Pharmacy, Nursing, Physiotherapy, Allied Health programs.',
              },
              {
                q: 'Do you provide free counselling?',
                a: 'Yes.',
              },
              {
                q: 'Can you help with scholarships?',
                a: 'Yes.',
              },
              {
                q: 'Do you assist with hostel accommodation?',
                a: 'Yes.',
              },
              {
                q: 'Do you support students after admission?',
                a: 'Yes, guidance continues through admission and beyond.',
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Future Starts Here</h2>
            <p className="text-blue-200 mb-2">Admissions Open 2026{'\u2013'}27</p>
            <p className="text-blue-100 mb-8 text-lg">Talk to an Expert Counsellor Today</p>
            <div className="flex flex-wrap justify-center gap-4">
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
        </section>

      </div>
      <style jsx>
        {`
                    .hero-banner {
          background-image: linear-gradient(rgba(30,58,138,0.45), rgba(30,58,138,0.30)), url(/pharmacy/banner-all-courses-portrait.png);
          background-size: cover;
          background-position: center center;
        }
        @media (min-width: 768px) {
          .hero-banner {
            background-image: linear-gradient(to right, rgba(30,58,138,0.35) 45%, rgba(30,64,175,0.15)), url(/pharmacy/banner-all-courses.png);
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
      `}
      </style>
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
              { '@type': 'Course', name: 'D.Pharm' },
              { '@type': 'Course', name: 'B.Pharm' },
              { '@type': 'Course', name: 'GNM Nursing' },
              { '@type': 'Course', name: 'B.Sc Nursing' },
              { '@type': 'Course', name: 'P.B.Sc Nursing' },
              { '@type': 'Course', name: 'BPT' },
              { '@type': 'Course', name: 'DMLT' },
            ],
          }),
        }}
      />
    </>
  );
}
