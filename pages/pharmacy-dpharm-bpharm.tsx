import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function PharmacyDPharmBPharmPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    city: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const countersRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const formGallery = [
    { src: '/pharmacy/college.png', alt: 'Pharmacy college campus' },
    { src: '/pharmacy/practicals.png', alt: 'Modern pharmacy lab' },
    { src: '/pharmacy/trip.png', alt: 'Students on industry visit' },
    { src: '/pharmacy/lecture_cropped.png', alt: 'Lecture hall' },
  ];

  // Auto-slide gallery every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % formGallery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp popup after 6s
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!countersRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            animateCounter('counter1', 88000);
            animateCounter('counter2', 12000);
            animateCounter('counter3', 16);
            animateCounter('counter4', 6);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  function animateCounter(id: string, target: number) {
    const el = document.getElementById(id);
    if (!el) return;
    let count = 0;
    const speed = target / 200;
    (function update() {
      count += speed;
      if (count < target) {
        el.textContent = Math.ceil(count).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    })();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-pharmacy-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //   name: formData.name,
        //   phone: formData.phone,
        //   email: '',
        //   course: formData.course,
        //   city: formData.city,
        //   source: 'pharmacy-dpharm-bpharm',
        // }),
        body: JSON.stringify({
          type: 'pharmacy-dpharm-bpharm',
          name: formData.name,
          phone: formData.phone,
          email: '',
          course: formData.course,
          city: formData.city
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

  const placementLogos = Array.from({ length: 10 }, (_, i) => ({
    src: `/pharmacy/package/${i + 1}.png`,
    alt: ['Apollo Pharmacy', 'MedPlus', 'Cipla', 'Sun Pharma', 'Lupin', 'Dr. Reddy\u2019s', 'Glenmark', 'Abbott', 'Mankind Pharma', 'Alkem Laboratories'][i],
  }));

  return (
    <>
      <Head>
        <title>D.Pharm &amp; B.Pharm Admissions 2026-27 | ABS Educational Solution</title>
        <meta
          name="description"
          content="Start your pharmacy career after 12th. D.Pharm (No NEET/CET) & B.Pharm admissions open for 2026-27. Expert guidance, affordable fees, placement assistance."
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-800">

        {/* ==================== SECTION 1: HERO BANNER ==================== */}
        <section
          className="hero-banner relative text-white pt-4 pb-16 md:pt-6 md:pb-20"
          id="top"
        >
          <div className="flex items-center justify-between px-4 mb-6 relative z-10">
            <img src="/uploads/abs-logo.png" alt="ABS Educational Solution" className="h-16 md:h-20" />
            <div className="flex items-center gap-3">
              <img src="/pharmacy/pci.png" alt="PCI approved" className="h-12 md:h-16 object-contain bg-white rounded-lg p-1.5" />
              <img src="/pharmacy/NAAC.png" alt="NAAC accredited" className="h-12 md:h-16 object-contain bg-white rounded-lg p-1.5" />
              <img src="/pharmacy/AICTE.png" alt="AICTE approved" className="h-12 md:h-16 object-contain bg-white rounded-lg p-1.5" />
            </div>
          </div>

          {/* Scholarship highlight — mobile only */}
          <div className="mx-4 mb-5 rounded-xl bg-yellow-400 px-5 py-3 text-center shadow-lg relative z-10 md:hidden">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
              {'\uD83C\uDF93'} Upto 100% Scholarship Available
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 relative z-10">
            <div>
              <p className="text-2xl font-medium uppercase tracking-wider mb-3">Admissions Open 2026-27</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                Start Your Pharmacy Career After 12th
              </h1>
              <div className="flex flex-row gap-4 mb-6">
                <div className="bg-white/15 border border-white/25 backdrop-blur-sm rounded-xl px-5 py-3">
                  <p className="text-2xl md:text-3xl font-bold text-white">D.Pharm</p>
                  <p className="text-blue-200 font-normal text-xs md:text-sm -mt-0.5">Diploma in Pharmacy</p>
                </div>
                <div className="bg-white/15 border border-white/25 backdrop-blur-sm rounded-xl px-5 py-3">
                  <p className="text-2xl md:text-3xl font-bold text-white">B.Pharm</p>
                  <p className="text-blue-200 font-normal text-xs md:text-sm -mt-0.5">Bachelor in Pharmacy</p>
                </div>
              </div>
              <p className="text-blue-100 mb-6">
                Get expert guidance for admission to top pharmacy colleges with affordable fee options and complete admission support.
              </p>

              <ul className="space-y-2 mb-8 text-sm md:text-base">
                {[
                  'D.Pharm \u2013 No NEET | No CET',
                  'B.Pharm \u2013 Entrance Exam Required',
                  'Government Approved Colleges',
                  'Affordable Fee Options',
                  'Placement Assistance',
                  'End-to-End Admission Guidance',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0">{'\u2713'}</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#apply"
                className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg shadow-lg font-semibold text-lg hover:bg-blue-50 transition"
              >
                Book Free Counselling
              </a>
            </div>
            <div className="flex flex-col items-center gap-4 mt-12 md:mt-96">
              {/* Scholarship highlight — desktop only */}
              <div className="hidden md:block w-full max-w-sm rounded-xl bg-yellow-400 px-5 py-3 text-center shadow-lg">
                <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                  {'\uD83C\uDF93'} Upto 100% Scholarship Available
                </p>
              </div>

              <div className="w-full max-w-sm">
                <h3 className="mb-3 flex items-center gap-2 text-left text-lg font-semibold text-white md:hidden">
                  <span className="h-5 w-1 rounded-full bg-white" />
                  Our Branches
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Bhayandar', url: 'https://maps.app.goo.gl/ByaBb6YaPjKm9RaQ7' },
                    { name: 'Nalasopara', url: 'https://maps.app.goo.gl/Qm2VXQnjrp1pqnV29' },
                    { name: 'Andheri', url: 'https://maps.app.goo.gl/YiTCbBSbKFGSa77JA' },
                    { name: 'Thane', url: 'https://maps.app.goo.gl/kgjbCtz12hH9kZLU7' },
                    { name: 'Kurla', url: 'https://maps.app.goo.gl/L87RcSThwYUJWu4YA' },
                    { name: 'Malad', url: 'https://maps.app.goo.gl/zapkzq2trXPFZbaC7' },
                  ].map((b) => (
                    <a
                      key={b.name}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-white/10 backdrop-blur rounded-lg flex items-center text-sm font-semibold hover:bg-white/50 transition"
                    >
                      <span className="mr-2 text-base">📍</span>
                      {b.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SECTION 2: LEAD FORM ==================== */}
        <section id="apply" className="py-14 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Get Free Admission Guidance</h3>
              <p className="text-gray-600 mb-6">
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

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div
                className="cursor-pointer"
                onClick={() => setLightboxImg(formGallery[slideIndex].src)}
              >
                <img
                  src={formGallery[slideIndex].src}
                  alt={formGallery[slideIndex].alt}
                  className="object-cover w-full h-[420px] transition-opacity duration-500"
                />
              </div>
              {/* Navigation dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {formGallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${i === slideIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
              {/* Prev / Next arrows */}
              <button
                onClick={() => setSlideIndex((slideIndex - 1 + formGallery.length) % formGallery.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                {'\u2039'}
              </button>
              <button
                onClick={() => setSlideIndex((slideIndex + 1) % formGallery.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
              >
                {'\u203A'}
              </button>
            </div>
          </div>
        </section>

        {/* ==================== SECTION 3: TRUST & CREDIBILITY ==================== */}
        <section className="py-14 bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Trusted by Thousands of Students</h3>
            <div ref={countersRef} className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p id="counter1" className="text-3xl md:text-4xl font-bold">0</p>
                <p className="mt-2 text-sm text-blue-100">Students Counselled</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p id="counter2" className="text-3xl md:text-4xl font-bold">0</p>
                <p className="mt-2 text-sm text-blue-100">Successful Admissions</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p id="counter3" className="text-3xl md:text-4xl font-bold">0</p>
                <p className="mt-2 text-sm text-blue-100">Years of Experience</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <p id="counter4" className="text-3xl md:text-4xl font-bold">0</p>
                <p className="mt-2 text-sm text-blue-100">Branches Across Mumbai</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 col-span-2 md:col-span-1">
                <p className="text-3xl md:text-4xl font-bold">100%</p>
                <p className="mt-2 text-sm text-blue-100">Admission Guidance</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SECTION 4: WHY CHOOSE ABS ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Students Choose ABS Admission</h3>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Our experienced counsellors help you throughout the admission journey.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '\uD83C\uDFAF', title: 'Career Counselling' },
                { icon: '\uD83C\uDFEB', title: 'College Selection' },
                { icon: '\uD83D\uDCCB', title: 'Admission Process' },
                { icon: '\uD83D\uDCC4', title: 'Documentation Support' },
                { icon: '\uD83C\uDFC6', title: 'Scholarship Guidance' },
                { icon: '\uD83C\uDFE6', title: 'Education Loan Assistance' },
                { icon: '\uD83C\uDFE0', title: 'Hostel Support' },
                { icon: '\uD83D\uDCBC', title: 'Placement Assistance' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition text-center">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SECTION 5: COURSE DETAILS ==================== */}
        <section id="courses" className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Choose the Right Pharmacy Course</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* D.Pharm Card */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition flex flex-col">
                <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">DIPLOMA</div>
                <h4 className="text-2xl font-bold mb-1">D.Pharm</h4>
                <p className="text-gray-500 mb-4">Diploma in Pharmacy</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Duration:</span> 2 Years
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Eligibility</p>
                  <p className="text-sm text-gray-600">12th Science (PCB/PCM)</p>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {['No NEET Required', 'No CET Required', 'Direct Admission Guidance', 'Affordable Fees', 'Excellent Career Opportunities'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">{'\u2713'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className="block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 transition mt-auto"
                >
                  Apply for D.Pharm
                </a>
              </div>

              {/* B.Pharm Card */}
              <div className="border-2 border-blue-100 rounded-2xl p-8 hover:border-blue-300 transition flex flex-col">
                <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">DEGREE</div>
                <h4 className="text-2xl font-bold mb-1">B.Pharm</h4>
                <p className="text-gray-500 mb-4">Bachelor of Pharmacy</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Duration:</span> 4 Years
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Eligibility</p>
                  <p className="text-sm text-gray-600">12th Science (PCB/PCM) + Entrance Exam</p>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {['Industry-Oriented Curriculum', 'Modern Laboratories', 'Internship Opportunities', 'Placement Assistance'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">{'\u2713'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className="block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 transition mt-auto"
                >
                  Apply for B.Pharm
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MID-PAGE CTA ==================== */}
        <section className="py-10 bg-gradient-to-r from-blue-800 to-blue-950 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Not Sure Which Course Is Right for You?</h3>
            <p className="text-blue-100 mb-6">Talk to our expert counsellors and get personalized guidance.</p>
            <a
              href="#apply"
              className="inline-block px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Book Free Counselling
            </a>
          </div>
        </section>

        {/* ==================== SECTION 6: CAREER OPPORTUNITIES ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">Career Opportunities After Pharmacy</h3>
            <p className="text-gray-600 text-center mb-10">After completing D.Pharm or B.Pharm, you can work as:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                'Hospital Pharmacist',
                'Clinical Pharmacist',
                'Retail Pharmacist',
                'Quality Control Executive',
                'Production Executive',
                'Medical Representative',
                'Drug Safety Associate',
                'Research Associate',
                'Pharma Marketing Executive',
              ].map((role, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm text-center text-sm font-medium text-gray-700">
                  {role}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center border-l-4 border-blue-500">
                <p className="text-sm text-gray-500 mb-1">Starting Salary</p>
                <p className="text-2xl font-bold text-blue-600">{'\u20B9'}3 LPA*</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center border-l-4 border-green-500">
                <p className="text-sm text-gray-500 mb-1">Career Growth</p>
                <p className="text-2xl font-bold text-green-600">Up to {'\u20B9'}8+ LPA*</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">*Based on role, employer and experience.</p>
          </div>
        </section>

        {/* ==================== SECTION 7: PLACEMENT PARTNERS ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">Placement Opportunities</h3>
            <p className="text-gray-600 text-center mb-8">Our students have opportunities with leading healthcare and pharmaceutical companies.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {placementLogos.slice(0, 8).map((logo, i) => (
                <div key={i} className="w-full flex items-center justify-center bg-gray-50 rounded-xl p-4 h-50 md:h-48">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:flex md:justify-center gap-6 mt-6">
              {placementLogos.slice(8).map((logo, i) => (
                <div key={i} className="w-full md:w-[calc(25%-18px)] flex items-center justify-center bg-gray-50 rounded-xl p-4 h-50 md:h-48">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SECTION 8: ADMISSION PROCESS ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Admission Process</h3>
            <div className="space-y-0">
              {[
                { step: '1', title: 'Submit Your Enquiry', desc: 'Fill the form or call us to get started' },
                { step: '2', title: 'Talk to Our Admission Expert', desc: 'Get personalized guidance on courses and colleges' },
                { step: '3', title: 'Select the Right College', desc: 'Choose from our network of approved colleges' },
                { step: '4', title: 'Complete Documentation', desc: 'We help you with all required paperwork' },
                { step: '5', title: 'Confirm Admission', desc: 'Secure your seat and begin your pharmacy journey' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    {i < 4 && <div className="w-0.5 h-12 bg-blue-200" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CAMPUS & LAB GALLERY ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3">Campus &amp; Lab Glimpses</h3>
            <p className="text-gray-600 text-center mb-8">Take a look at the facilities and environment our students learn in.</p>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { src: '/pharmacy/college.png', alt: 'Pharmacy college campus' },
                { src: '/pharmacy/practicals.png', alt: 'Modern pharmacy lab' },
                { src: '/pharmacy/trip.png', alt: 'Students on industry visit' },
                { src: '/pharmacy/lecture_cropped.png', alt: 'Lecture hall' },
              ].map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl shadow-sm cursor-pointer"
                  onClick={() => setLightboxImg(img.src)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-48 md:h-72 object-cover hover:scale-105 transition duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== IMAGE LIGHTBOX ==================== */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setLightboxImg(null)}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-10"
            >
              {'\u00D7'}
            </button>
            <img
              src={lightboxImg}
              alt="Gallery preview"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* ==================== SECTION 9: WHY PARENTS TRUST US ==================== */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Trusted Admission Guidance Since 2009</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '\uD83D\uDD0D', title: 'Transparent Admission Process' },
                { icon: '\uD83D\uDC68\u200D\uD83C\uDFEB', title: 'Experienced Counsellors' },
                { icon: '\uD83C\uDFDB\uFE0F', title: 'Government Approved Colleges' },
                { icon: '\uD83D\uDCB0', title: 'Affordable Fee Options' },
                { icon: '\uD83D\uDCC2', title: 'Complete Documentation Support' },
                { icon: '\uD83E\uDD1D', title: 'Personalized Student Assistance' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SECTION 10: STUDENT SUCCESS STORIES ==================== */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Students Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: 'The ABS team guided me throughout the admission process. Everything was smooth and hassle-free.',
                  name: 'Ankit Tiwari',
                  img: '/pharmacy/reviews/student-1.png',
                },
                {
                  quote: 'I got admission into my preferred pharmacy college with complete support from the counsellors.',
                  name: 'Shubh Jaiswal',
                  img: '/pharmacy/reviews/student-3.png',
                },
                {
                  quote: 'Highly professional team with excellent admission guidance.',
                  name: 'Mansi K.',
                  img: '/pharmacy/reviews/student-2.png',
                },
              ].map((review, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-blue-400 text-4xl mb-3">{'\u201C'}</div>
                  <p className="text-gray-600 text-sm mb-4">{review.quote}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-200"
                    />
                    <p className="font-semibold text-sm text-gray-800">{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SECTION 11: FAQ ==================== */}
        <section id="faq" className="py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
            {[
              {
                q: 'Is NEET required for D.Pharm?',
                a: 'No. NEET is not required for D.Pharm admission.',
              },
              {
                q: 'Is an entrance exam required for B.Pharm?',
                a: 'Yes. A qualifying entrance exam is mandatory for B.Pharm admission as per applicable admission guidelines.',
              },
              {
                q: 'Can I apply after 12th Science?',
                a: 'Yes. Students from the Science stream (PCB/PCM) can apply, subject to eligibility criteria.',
              },
              {
                q: 'Are scholarships available?',
                a: 'Scholarships may be available for eligible students based on applicable criteria.',
              },
              {
                q: 'Is placement assistance available?',
                a: 'Yes. Placement assistance is provided through participating colleges and industry collaborations.',
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

        {/* ==================== SECTION 12: FINAL CTA ==================== */}
        <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-3">Limited Seats Available</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Admissions Open for 2026{'\u2013'}27</h3>
            <p className="text-blue-100 mb-8">
              Start your pharmacy career with expert admission guidance and personalized counselling.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#apply"
                className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Book Free Counselling
              </a>
              {/* <a
                href="tel:+919702836946"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                Call Now
              </a> */}
              {/* <a
                href="https://wa.me/919702836946?text=I%20want%20to%20know%20more%20about%20pharmacy%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition"
              >
                WhatsApp Now
              </a> */}
            </div>
          </div>
        </section>

        {/* ==================== SECTION 13: DISCLAIMER ==================== */}
        <section className="py-6 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-xs text-gray-500 text-center">
              <strong>Note:</strong> D.Pharm admission does not require NEET or CET. B.Pharm admission requires a qualifying entrance exam as per applicable admission guidelines. Admissions, scholarships and placement assistance are subject to eligibility criteria and institute policies.
            </p>
          </div>
        </section>

        {/* ==================== WHATSAPP MODAL ==================== */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative mx-4 shadow-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
              >
                {'\u00D7'}
              </button>
              <h3 className="text-xl font-bold mb-2 text-blue-600">
                Get Admission Guidance Instantly!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tap below to connect with our admission expert on WhatsApp.
              </p>
              <a
                href="https://wa.me/919702836946?text=I%20want%20to%20know%20more%20about%20pharmacy%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Chat on WhatsApp
              </a>
              {/* <a
                href="tel:+919702836946"
                className="w-full block text-center bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-950 mt-3 transition"
              >
                Call Now
              </a> */}
            </div>
          </div>
        )}

        {/* ==================== FLOATING CALL BUTTON ==================== */}
        {/* <a
          href="tel:+919702836946"
          className="fixed bottom-4 right-4 bg-blue-900 p-3 rounded-full shadow-lg hover:bg-blue-950 z-40 transition"
          aria-label="Call"
        >
          <img src="/pharmacy/phone.png" alt="Call Now" className="w-6 h-6" />
        </a> */}
      </div>

      {/* Marquee animation */}
      <style jsx>{`
        .hero-banner {
          background-image: linear-gradient(rgba(30,58,138,0.92), rgba(30,58,138,0.95)), url(/pharmacy/banner_portrait.png);
          background-size: cover;
          background-position: center top;
        }
        @media (min-width: 768px) {
          .hero-banner {
            background-image: linear-gradient(to right, rgba(30,58,138,0.9) 45%, rgba(30,64,175,0.55)), url(/pharmacy/banner.png);
            background-position: right center;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* JSON-LD structured data */}
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
            ],
          }),
        }}
      />
    </>
  );
}
