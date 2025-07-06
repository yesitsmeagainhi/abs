// components/Goals.tsx
import { useState } from 'react';
import Image from 'next/image';
import Link  from 'next/link';

/* ---------------------------------------------------------
   CONFIG
--------------------------------------------------------- */

const COUNSELLOR_PHONE  = '9702836946';          // edit once here
const WHATSAPP_NUMBER   = '919702836946';         // 91 + phone (no +)

/* ---------------------------------------------------------
   TABS
--------------------------------------------------------- */

const tabs = [
  {
    id: 'dpharm',
    label: 'D.Pharm',
    slug:  'd-pharma-admission-mumbai',
    title: 'D.Pharm Admission in Mumbai – 2025',
    body: /* html */ `
      <h4 class="font-semibold text-lg mb-2">D Pharm Course Overview:</h4>
      <p>Start your pharmacy journey with a 2-year Diploma in Pharmacy (D.Pharm) from a government-approved pharmacy college in Mumbai. Get expert guidance from ABS Educational Solution with 80,000+ career counselling sessions and 12,000+ successful enrollments.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">D Pharm Course Eligibility:</h4>
      <p>✔ 12th pass (Science – Physics, Chemistry, Biology/Math).<br><strong class="text-green-700">✔ No entrance exam – Get direct admission in D Pharma colleges with our expert help!</strong></p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Career Opportunities & Placement:</h4>
      <p>Earn from ₹3–5 LPA as a fresher. Growth up to ₹8 LPA+ with experience.</p>
      <p>We connect you to top hospitals and pharmacy jobs after graduation.</p>
    `,
    image: '/uploads/d-pharma-course-overview.png',
  },
  {
    id: 'bpharm',
    label: 'B.Pharm',
    slug:  'b-pharma-admission-mumbai',
    title: 'B.Pharm Admission in Mumbai – 2025',
    body: /* html */ `
      <h4 class="font-semibold text-lg mb-2">Course Overview:</h4>
      <p>B.Pharm is a 4-year degree for a future in pharmacy, research or clinical jobs. Build strong knowledge in medicine and pharma technology.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Eligibility:</h4>
      <p>12th pass (Science with PCB/PCM).<br><strong class="text-green-700">No CET or NEET required — direct admission in B pharma through our guidance.</strong></p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Highest Salary:</h4>
      <p>Starting salary ₹3–5 LPA; senior roles ₹8–12 LPA+.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">100% Placement Assistance:</h4>
      <p>Campus placements in pharma companies, hospitals and research centres.</p>
    `,
    image: '/uploads/Bachelor of Pharmacy (B.Pharm) students in a modern pharma lab at a PCI-approved college in Mumbai.png',
  },
  {
    id: 'gnm',
    label: 'GNM',
    slug:  'gnm-nursing-admission-mumbai',
    title: 'GNM Admission in Mumbai 2025',
    body: /* html */ `
      <h4 class="font-semibold text-lg mb-2">Course Overview:</h4>
      <p>GNM (General Nursing &amp; Midwifery) is a 3-year course to become a registered nurse. Gain clinical and patient-care skills.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Eligibility:</h4>
      <p>12th pass (any stream, science preferred).<br><strong class="text-green-700">Direct admission — no entrance test needed.</strong></p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Highest Salary:</h4>
      <p>Earn ₹2.5–4 LPA initially; experienced nurses earn ₹8 LPA+.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">100% Placement Assistance:</h4>
      <p>Placement support for top hospitals and clinics in Mumbai.</p>
    `,
    image: '/uploads/GNM Nursing students in clinical training at a top nursing college in Mumbai with hospital facilities.png',
  },
  {
    id: 'bscnursing',
    label: 'B.Sc Nursing',
    slug:  'bsc-nursing-admission-mumbai',
    title: 'B.Sc Nursing Admission in Mumbai 2025',
    body: /* html */ `
      <h4 class="font-semibold text-lg mb-2">Course Overview:</h4>
      <p>Become a professional nurse with a 4-year B.Sc Nursing degree. Learn advanced patient care, medical procedures and hospital management.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Eligibility:</h4>
      <p>12th Science (PCB, English).<br><strong class="text-green-700">No entrance exam required — secure admission directly.</strong></p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Highest Salary:</h4>
      <p>Freshers earn ₹3–5 LPA; senior nurses up to ₹10 LPA+.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">100% Placement Assistance:</h4>
      <p>Get placed in leading hospitals and healthcare organisations.</p>
    `,
    image: '/uploads/B.Sc Nursing students in clinical training at a top nursing college in Mumbai with hospital facilities.png',
  },
  {
    id: 'dmlt',
label: 'DMLT',
slug: 'dmlt-admission-in-mumbai',
title: 'DMLT Admission in Mumbai 2025',
body: /* html */ `
  <h4 class="font-semibold text-lg mb-2">Course Overview:</h4>
  <p>Start your career as a certified lab technician with DMLT (Diploma in Medical Lab Technology). Learn pathology, diagnostics, and lab procedures hands-on.</p>
  <h4 class="font-semibold text-lg mt-4 mb-2">Eligibility:</h4>
  <p>12th pass in Science stream.<br><strong class="text-green-700">Direct admission — no entrance exam required.</strong></p>
  <h4 class="font-semibold text-lg mt-4 mb-2">Highest Salary:</h4>
  <p>Up to ₹4 LPA depending on skills and experience.</p>
  <h4 class="font-semibold text-lg mt-4 mb-2">100% Placement Assistance:</h4>
  <p>Job opportunities in hospitals, diagnostic labs, pathology centres, and clinics.</p>
`,
image: '/uploads/dmlt-lab-technician-course-students-in-diagnostic-lab-mumbai.png',

  },
  {
    id: 'bpt',
    label: 'BPT',
    slug:  'bpt-admission-mumbai',
    // icon:  '/uploads/icon-bpt.svg',
    title: 'BPT Admission in Mumbai 2025',
    body: /* html */ `
      <h4 class="font-semibold text-lg mb-2">Course Overview:</h4>
      <p>BPT (Bachelor of Physiotherapy) is a 4.5-year degree to become a physiotherapist. Train in rehabilitation and sports-injury care.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Eligibility:</h4>
      <p>12th Science (PCB).<br><strong class="text-green-700">No entrance exam — get direct BPT admission now!</strong></p>
      <h4 class="font-semibold text-lg mt-4 mb-2">Highest Salary:</h4>
      <p>Start at ₹3–5 LPA; specialists earn ₹8 LPA+.</p>
      <h4 class="font-semibold text-lg mt-4 mb-2">100% Placement Assistance:</h4>
      <p>We help you find jobs in hospitals, clinics and sports centres.</p>
    `,
    image: '/uploads/BPT students practicing physiotherapy techniques in a rehab lab at a physiotherapy college in Mumbai.png',
  },
];

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

export default function Goals() {
  const [active, setActive]         = useState(tabs[0].id);
  const [modalOpen, setModalOpen]   = useState(false);
  const tab = tabs.find(t => t.id === active)!;

  /* helpers */
  const phoneHref    = `tel:${COUNSELLOR_PHONE}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <>
      {/* ---------------  Main Section  --------------- */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Need Counselling or Admission Guidance?
        </h2>

        {/* tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full py-3 px-6 text-sm font-medium
                          ${active === t.id
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* active panel */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* text */}
          <div>
            {/* {tab.icon && (
              <Image src={tab.icon} alt="" width={36} height={36} className="mb-4" />
            )} */}
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{tab.title}</h3>

            {/* markdown-like html from CMS */}
            <div
              className="text-gray-700 leading-relaxed text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: tab.body }}
            />

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium
                           px-6 py-3 rounded-lg transition">
                Connect with Counsellor
              </button>

              <Link
                href={`/courses/${tab.slug}`}
                className="border border-green-600 text-green-700 hover:bg-green-50
                           font-medium px-6 py-3 rounded-lg transition">
                Know more about {tab.label}
              </Link>
            </div>
          </div>

          {/* image */}
          {tab.image ? (
            <img
  src={tab.image}
  alt={`${tab.label} course information`}
  className="w-full rounded-2xl shadow-md max-w-full h-auto"
  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${tab.image}`);

    /* hide the broken <img> */
    const img = e.currentTarget;            // already HTMLImageElement
    img.style.display = 'none';

    /* show fallback div */
    const fallback = img.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = 'flex';
  }}
/>
          ) : null}
          <div className="w-full h-96 bg-gray-200 rounded-2xl hidden items-center justify-center">
            <p className="text-gray-500">Image not available</p>
          </div>
        </div>
      </section>

      {/* ---------------  Modal  --------------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setModalOpen(false)}   /* click outside to close */
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl p-8 relative"
            onClick={e => e.stopPropagation()} /* prevent bubble */
          >
            {/* close icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setModalOpen(false)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>

            <h4 className="text-xl font-semibold mb-6 text-center">
              Speak with a Counsellor
            </h4>
            <p className="text-gray-600 mb-6 text-center">
              Call or chat with our expert counsellor for free guidance on admissions and career options.</p>


            <div className="space-y-4">
              <a
                href={phoneHref}
                className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700
                           text-white font-medium px-4 py-3 rounded-lg transition justify-center"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3c3 9 9 15 18 18l3-3-4-6-5 2c-2-1-5-4-6-6l2-5L5 0 2 3z" />
                </svg>
                Call Now
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full border border-green-600
                           text-green-700 hover:bg-green-50 font-medium px-4
                           py-3 rounded-lg transition justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.733 5.463 2.017 7.788L0 32l8.4-2.182A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.771 23.771c-.373 1.044-2.16 1.97-2.976 2.096-.76.115-1.713.163-2.76-.175a24.57 24.57 0 0 1-2.556-1.12c-4.511-1.974-7.452-6.555-7.687-6.86-.235-.307-1.84-2.445-1.84-4.665 0-2.219 1.161-3.311 1.574-3.758.412-.447.898-.559 1.198-.559.3 0 .6.003.859.015.28.012.649-.105 1.017.777.374.898 1.274 3.116 1.387 3.344.112.228.186.496.037.803-.149.306-.224.495-.448.763-.224.267-.472.598-.673.803-.224.224-.457.468-.196.915.261.448 1.159 1.915 2.492 3.103 1.713 1.572 3.16 2.063 3.609 2.287.449.224.711.187.973-.112.261-.298 1.119-1.303 1.418-1.749.299-.447.598-.373.998-.224.374.15 2.366 1.118 2.767 1.322.374.19.623.286.711.448.087.162.087.934-.286 1.978z"/>
                </svg>
                Chat on&nbsp;WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
