import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function PharmacyPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    city: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  // WhatsApp popup after 6s
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 6000);
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
            animateCounter('counter1', 80000);
            animateCounter('counter2', 11000);
            animateCounter('counter3', 20);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.6 }
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
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          course: formData.course,
          city: formData.city,
          source: 'pharmacy',
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

  const alumniLogos = Array.from({ length: 10 }, (_, i) => ({
    src: `/pharmacy/package/${i + 1}.png`,
    alt: ['Cipla', 'Apollo', 'Sun Pharma', 'Pfizer', 'Lupin', 'Glenmark', 'Reliance', "Dr Reddy's", 'Biocon', 'Novartis'][i],
  }));

  return (
    <>
      <Head>
        <title>No NEET | No CET - Direct Pharmacy Admissions | ABS Educational Solution</title>
        <meta
          name="description"
          content="Direct admission (No NEET/CET) in PCI-approved D & B Pharm colleges, Mumbai & Pan-India. Fees from Rs 60k, scholarships Rs 25k, 100% placement help."
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-800">
        {/* ==================== HERO ==================== */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12" id="top">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                No NEET &bull; No CET &mdash; Direct Admission in{' '}
                <span className="text-blue-600">D.Pharm &amp; B.Pharm</span>
              </h2>
              <h3 className="text-xl font-semibold mt-2">
                Top PCI-Approved Pharmacy Colleges in Mumbai &bull; Bangalore &bull; Across India
              </h3>
              <p className="text-lg mb-3">Govt-Approved | PCI Certified | Scholarships up to Rs 25,000</p>
              <p className="font-semibold text-red-600 mb-6">
                Limited-Period Fee <u>Rs 60,000 / year*</u> for First 20 Seats (Regular Rs 70,000)
              </p>
              <a
                href="#apply"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Book Free Counselling Now
              </a>

              <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
                <span className="font-medium">80 K+ Counselling</span>
                <span className="font-medium">| 11 K+ Admissions</span>
                <span className="font-medium">| 100 % Placement Assistance</span>
              </div>
            </div>

            {/* Logos + branch cards */}
            <div className="flex flex-col items-center md:items-end w-full">
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
                <img src="/pharmacy/pci.png" alt="PCI approved pharmacy college" className="h-20 object-contain" />
                <img src="/pharmacy/NAAC.png" alt="NAAC A accredited college" className="h-20 object-contain" />
                <img src="/pharmacy/AICTE.png" alt="AICTE approved" className="h-20 object-contain" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 w-full max-w-sm">
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
                    className="px-3 py-2 bg-white rounded-lg shadow flex items-center text-xs font-medium hover:bg-blue-50"
                  >
                    <span className="text-blue-600 mr-1">&#x1f4cd;</span>
                    {b.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== LEAD FORM ==================== */}
        <section id="apply" className="py-12 bg-white">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Start Your Pharmacy Career Today</h3>
              <p className="mb-4">
                Fill the form below &ndash; our counsellor will WhatsApp or call you within{' '}
                <span className="font-semibold">15 minutes</span> with top college options and the lowest fee offers.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-700 text-lg font-semibold mb-2">Thank you!</p>
                  <p className="text-green-600">Our counsellor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select Course
                    </option>
                    <option>D.Pharm</option>
                    <option>B.Pharm</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Your City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="flex items-start gap-2 text-sm">
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
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Get Admission Details'}
                  </button>
                </form>
              )}
            </div>

            <img
              src="/pharmacy/college.png"
              alt="PCI approved D Pharma college Mumbai lab"
              className="rounded-lg shadow object-cover"
            />
          </div>
        </section>

        {/* ==================== WHY ABS ==================== */}
        <section id="why" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-10">Why 11,000+ Students Choose ABS</h3>
            <div className="grid md:grid-cols-5 gap-6 text-center text-sm">
              {[
                { icon: '\u2705', text: '15+ Years Expertise' },
                { icon: '\uD83C\uDFDB\uFE0F', text: '100 % PCI-Approved Colleges' },
                { icon: '\uD83D\uDCB8', text: 'Low Fees & 0 % EMI' },
                { icon: '\uD83D\uDCBC', text: 'Placement Opportunities' },
                { icon: '\uD83E\uDD1D', text: 'End-to-End Guidance' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-lg shadow">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== COURSE COMPARISON ==================== */}
        <section id="courses" className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">D.Pharm vs B.Pharm &ndash; Choose Your Path</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3">Feature</th>
                    <th className="px-4 py-3">D.Pharm</th>
                    <th className="px-4 py-3">B.Pharm</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Duration', '2 Years', '4 Years'],
                    ['Eligibility', '12th Sci (PCB/PCM)', '12th Sci (PCB/PCM)'],
                    ['Career Options', 'Chemist, Hospital Pharmacist', 'R&D, Production, Abroad'],
                    ['Internship', '3-6 months', '6 months'],
                  ].map(([feature, dpharm, bpharm], i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-3">{feature}</td>
                      <td className="px-4 py-3">{dpharm}</td>
                      <td className="px-4 py-3">{bpharm}</td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td className="px-4 py-3">Fees</td>
                    <td className="px-4 py-3">
                      Rs 70,000 / yr <br />
                      <span className="text-green-600">Rs 60,000* Early Bird</span>
                    </td>
                    <td className="px-4 py-3">
                      Rs 70,000 / yr <br />
                      <span className="text-green-600">Rs 60,000* Early Bird</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center mt-6">
              <a
                href="https://wa.me/919702836946?text=I%20want%20to%20know%20more%20about%20pharmacy%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Talk to a Counsellor
              </a>
            </div>
          </div>
        </section>

        {/* ==================== ALUMNI ==================== */}
        <section id="alumni" className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-6">Our Alumni are Making Their Mark</h3>
            <div className="overflow-hidden">
              <div className="flex gap-8 animate-marquee">
                {[...alumniLogos, ...alumniLogos].map((logo, i) => (
                  <img key={i} src={logo.src} alt={logo.alt} className="h-20 object-contain flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== STATS ==================== */}
        <section id="stats" className="py-12 bg-white">
          <div ref={countersRef} className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-40 p-6 bg-gray-50 rounded-lg shadow">
                <p id="counter1" className="text-3xl font-bold text-blue-600">0</p>
                <p className="mt-2 text-sm">Counselling Sessions</p>
              </div>
              <div className="w-40 p-6 bg-gray-50 rounded-lg shadow">
                <p id="counter2" className="text-3xl font-bold text-blue-600">0</p>
                <p className="mt-2 text-sm">Successful Admissions</p>
              </div>
              <div className="w-40 p-6 bg-gray-50 rounded-lg shadow">
                <p id="counter3" className="text-3xl font-bold text-blue-600">0</p>
                <p className="mt-2 text-sm">College Tie-ups</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== GALLERY ==================== */}
        <section id="gallery" className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold mb-6">Campus &amp; Lab Glimpses</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <img src="/pharmacy/college.png" alt="Pharmacy college campus Mumbai" className="rounded-lg shadow" />
              <img src="/pharmacy/practicals.png" alt="Modern lab for B Pharma practicum" className="rounded-lg shadow" />
              <img src="/pharmacy/trip.png" alt="Students on industry visit" className="rounded-lg shadow" />
            </div>
          </div>
        </section>

        {/* ==================== NO NEET CTA ==================== */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold mb-4">Skipped NEET or CET? No Problem.</h3>
            <p className="mb-6">Admission doors are still open! Join top PCI-approved colleges with placement support.</p>
            <a
              href="#apply"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Book My Free Counselling
            </a>
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold mb-4">About ABS Educational Solution</h3>
            <p className="mb-4">
              Since 2009, ABS Educational Solution has guided <strong>80,000+</strong> students and secured{' '}
              <strong>11,000+</strong> pharmacy admissions. Our mission is to make quality healthcare education
              affordable and accessible.
            </p>
            <p>
              We partner with India&apos;s leading PCI-approved colleges, ensuring our students graduate with
              industry-relevant skills and guaranteed placement support.
            </p>
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        <section id="faq" className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">FAQ</h3>
            {[
              {
                q: 'Is NEET or CET mandatory?',
                a: 'No. Direct admission is available through ABS without NEET or CET for both D.Pharm and B.Pharm programs.',
              },
              {
                q: 'Are the colleges recognized?',
                a: 'Yes. All colleges are 100 % PCI-approved, many also AICTE & NAAC-A accredited.',
              },
              {
                q: 'Can I get a scholarship?',
                a: 'Scholarships up to Rs 25,000 are available based on merit, need, or early application.',
              },
              {
                q: "What's better: D.Pharm or B.Pharm?",
                a: "D.Pharm is a 2-year diploma; B.Pharm is a 4-year degree. We'll help you choose the right path for your goals.",
              },
              {
                q: 'Placement support?',
                a: 'Yes, 100 % placement assistance. Alumni work at Cipla, Sun Pharma, Apollo Hospitals & more.',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-lg shadow p-4 mb-4" open={i === 0}>
                <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                <p className="mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ==================== WHATSAPP MODAL ==================== */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative mx-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-xl hover:text-gray-700"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Get Govt-Approved College at Lowest Fee!
              </h3>
              <p className="text-sm mb-4">
                Tap below and get help instantly on WhatsApp. Limited scholarships available!
              </p>
              <a
                href="https://wa.me/919702836946?text=I%20want%20to%20know%20more%20about%20pharmacy%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+919702836946"
                className="w-full block text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 mt-3"
              >
                Connect on Call
              </a>
            </div>
          </div>
        )}

        {/* ==================== FLOATING BUTTONS ==================== */}
        <a
          href="https://wa.me/919702836946?text=I%20want%20to%20know%20more%20about%20pharmacy%20courses"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-4 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 z-40"
          aria-label="WhatsApp"
        >
          <img src="/pharmacy/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
        </a>
        <a
          href="tel:+919702836946"
          className="fixed bottom-4 right-4 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 z-40"
          aria-label="Call"
        >
          <img src="/pharmacy/phone.png" alt="Call Now" className="w-6 h-6" />
        </a>
      </div>

      {/* Marquee animation */}
      <style jsx>{`
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
