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
        <section className="bg-blue-900 text-white pt-6 pb-16 md:pb-20" id="top">
          <div className="max-w-7xl mx-auto px-4">
            <img src="/uploads/abs-logo.png" alt="ABS Educational Solution" className="h-16 md:h-20 mb-8" />

            <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
              {/* Left — headline */}
              <div>
                <p className="text-blue-200 text-base md:text-lg font-medium uppercase tracking-wider mb-3">Admissions Open 2026{'\u2013'}27</p>
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
              <div className="hidden md:block">
                <img
                  src="/pharmacy/college.png"
                  alt="College campus"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Courses Offered */}
              <div>
                <p className="text-white font-bold text-lg mb-3">Courses Offered</p>
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-3">Healthcare</p>
                <div className="flex flex-wrap gap-3">
                  {['D.Pharm', 'B.Pharm', 'GNM Nursing', 'B.Sc Nursing', 'P.B.Sc Nursing', 'BPT', 'DMLT'].map((c, i) => (
                    <span key={i} className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-xl px-5 py-3 text-base font-bold shadow-lg">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why ABS */}
              <div>
                <p className="text-white font-semibold mb-3">Why ABS?</p>
                <ul className="space-y-2 text-sm">
                  {[
                    '88,000+ Students Counselled',
                    '16+ Years Experience',
                    'Expert Career Guidance',
                    'Scholarship Support',
                    'Approved Colleges',
                    'Transparent Admission Process',
                    'Free Counselling',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0">{'\u2713'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
          <div className="max-w-xl mx-auto px-4">
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
        </section>

        {/* ==================== HEALTHCARE COURSES ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Healthcare Courses</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pharmacy */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition">
                <h3 className="text-xl font-bold mb-1">Pharmacy</h3>
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">D.Pharm</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">B.Pharm</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Learn pharmaceutical sciences and prepare for careers in hospitals, retail pharmacy and healthcare industries.
                </p>
              </div>

              {/* Nursing */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition">
                <h3 className="text-xl font-bold mb-1">Nursing</h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">GNM</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">B.Sc Nursing</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">P.B.Sc Nursing</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Build a rewarding career in patient care, hospitals, community healthcare, and international nursing.
                </p>
              </div>

              {/* Physiotherapy */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition">
                <h3 className="text-xl font-bold mb-1">Physiotherapy</h3>
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Bachelor of Physiotherapy (BPT)</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Develop expertise in rehabilitation, sports medicine, and physical therapy.
                </p>
              </div>

              {/* Allied Health */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition">
                <h3 className="text-xl font-bold mb-1">Allied Health</h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">DMLT</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Medical Laboratory Technology</span>
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Choose ABS Educational Solution?</h2>
            <p className="text-gray-600 text-center mb-10">Complete Admission Support</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Career Counselling',
                'College Selection',
                'Admission Guidance',
                'Scholarship Assistance',
                'Documentation Support',
                'Hostel Assistance',
                'Placement Guidance',
                'Education Loan Guidance',
                'Post Admission Support',
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <p className="font-medium text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ADMISSION PROCESS ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Admission Process</h2>
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
          </div>
        </section>

        {/* ==================== WHY THOUSANDS TRUST ABS ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Thousands of Students Trust ABS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                '16+ Years Experience',
                '88,000+ Students Counselled',
                'Expert Career Counsellors',
                'Multiple Course Options',
                'Affordable Fee Guidance',
                'Transparent Admission Process',
                'Student-Centric Support',
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="font-semibold text-sm text-gray-700 flex items-center justify-center gap-2">
                    <span className="text-green-500">{'\u2022'}</span>
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
