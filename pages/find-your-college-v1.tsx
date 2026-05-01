import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Award,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   COLLEGE DATABASE
───────────────────────────────────────────── */
interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  courses: string[];
  feesPerYear: string;
  totalFees: string;
  feeBucket: string[];
  streams: string[];
  minPercentage: number;
  examRequired: string[];
  locationTags: string[];
  isABSPartner: boolean;
  highlight: string;
  approval: string;
  ranking?: string;
}

const COLLEGES: College[] = [
  // ── PHARMACY ──────────────────────────────
  {
    id: 'nip-blr',
    name: 'NIP Bangalore (Neelsaroj Institute of Pharmacy)',
    city: 'Bangalore',
    state: 'Karnataka',
    courses: ['D.Pharm', 'B.Pharm', 'Pharm.D'],
    feesPerYear: '₹35,000 – ₹80,000/year',
    totalFees: '₹70,000 – ₹4.8 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCM', 'PCMB', 'Other'],
    minPercentage: 45,
    examRequired: ['NONE', 'CET', 'KCET'],
    locationTags: ['karnataka', 'india'],
    isABSPartner: true,
    highlight: 'ABS Direct Admission Partner · PCI-Approved · Ranked Top 10 Pharmacy Colleges Karnataka',
    approval: 'PCI Approved',
    ranking: 'Top 10 Karnataka',
  },
  {
    id: 'bcp-mumbai',
    name: 'Bombay College of Pharmacy',
    city: 'Mumbai',
    state: 'Maharashtra',
    courses: ['B.Pharm', 'Pharm.D'],
    feesPerYear: '₹60,000 – ₹1.2 Lakh/year',
    totalFees: '₹2.4 – ₹7.2 Lakh total',
    feeBucket: ['mid'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 50,
    examRequired: ['NEET', 'CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: false,
    highlight: "One of India's oldest & most reputed pharmacy colleges · Established 1957",
    approval: 'PCI Approved · NAAC A',
  },
  {
    id: 'dyp-pharmacy',
    name: 'D.Y. Patil College of Pharmacy',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    courses: ['D.Pharm', 'B.Pharm', 'Pharm.D'],
    feesPerYear: '₹50,000 – ₹1 Lakh/year',
    totalFees: '₹1 – ₹6 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCM', 'PCMB', 'Other'],
    minPercentage: 45,
    examRequired: ['CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Admission Partner · Strong Placement Record · Close to Mumbai',
    approval: 'PCI Approved',
  },
  {
    id: 'mvm-pharmacy',
    name: 'MVM College of Pharmacy',
    city: 'Mumbai',
    state: 'Maharashtra',
    courses: ['D.Pharm', 'B.Pharm'],
    feesPerYear: '₹30,000 – ₹60,000/year',
    totalFees: '₹60,000 – ₹2.4 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCM', 'PCMB', 'Other'],
    minPercentage: 40,
    examRequired: ['CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · Affordable Fees · Mumbai Location · Direct Admission Available',
    approval: 'PCI Approved',
  },
  {
    id: 'pcp-pune',
    name: 'Poona College of Pharmacy',
    city: 'Pune',
    state: 'Maharashtra',
    courses: ['B.Pharm', 'Pharm.D'],
    feesPerYear: '₹55,000 – ₹90,000/year',
    totalFees: '₹2.2 – ₹5.4 Lakh total',
    feeBucket: ['mid'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 50,
    examRequired: ['CET', 'NEET', 'NONE'],
    locationTags: ['maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · Excellent Research Facilities · Top Industry Connections',
    approval: 'PCI Approved · NAAC A',
  },
  {
    id: 'jss-mysore',
    name: 'JSS College of Pharmacy',
    city: 'Mysuru / Ooty',
    state: 'Karnataka / Tamil Nadu',
    courses: ['B.Pharm', 'Pharm.D'],
    feesPerYear: '₹70,000 – ₹1.5 Lakh/year',
    totalFees: '₹2.8 – ₹9 Lakh total',
    feeBucket: ['mid', 'high'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 55,
    examRequired: ['KCET', 'NEET', 'CET', 'COMEDK'],
    locationTags: ['karnataka', 'india'],
    isABSPartner: false,
    highlight: 'Ranked #3 Pharmacy College India (NIRF) · Excellent Pharma.D Program',
    approval: 'PCI Approved · NAAC A++',
    ranking: 'NIRF Top 5',
  },
  {
    id: 'krupanidhi-blr',
    name: 'Krupanidhi College of Pharmacy',
    city: 'Bangalore',
    state: 'Karnataka',
    courses: ['D.Pharm', 'B.Pharm', 'Pharm.D'],
    feesPerYear: '₹60,000 – ₹1.2 Lakh/year',
    totalFees: '₹1.2 – ₹7.2 Lakh total',
    feeBucket: ['mid'],
    streams: ['PCB', 'PCM', 'PCMB', 'Other'],
    minPercentage: 45,
    examRequired: ['KCET', 'COMEDK', 'NONE'],
    locationTags: ['karnataka', 'india'],
    isABSPartner: true,
    highlight: 'ABS Admission Partner · Central Bangalore · Strong Foreign Placement',
    approval: 'PCI Approved',
  },
  {
    id: 'bv-pharmacy',
    name: 'Bharati Vidyapeeth College of Pharmacy',
    city: 'Pune',
    state: 'Maharashtra',
    courses: ['D.Pharm', 'B.Pharm'],
    feesPerYear: '₹40,000 – ₹70,000/year',
    totalFees: '₹80,000 – ₹2.8 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCM', 'PCMB', 'Other'],
    minPercentage: 40,
    examRequired: ['CET', 'NONE'],
    locationTags: ['maharashtra', 'india'],
    isABSPartner: false,
    highlight: 'Affordable Fees · Good Government Quota Seats · Established University',
    approval: 'PCI Approved',
  },

  // ── NURSING ────────────────────────────────
  {
    id: 'dyp-nursing',
    name: 'D.Y. Patil College of Nursing',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    courses: ['B.Sc Nursing', 'GNM', 'ANM'],
    feesPerYear: '₹70,000 – ₹1.2 Lakh/year',
    totalFees: '₹1.4 – ₹4.8 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCMB'],
    minPercentage: 45,
    examRequired: ['NEET', 'CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · INC Approved · Excellent Clinical Exposure · Mumbai-based',
    approval: 'INC Approved',
  },
  {
    id: 'bv-nursing',
    name: 'Bharati Vidyapeeth College of Nursing',
    city: 'Pune',
    state: 'Maharashtra',
    courses: ['B.Sc Nursing', 'GNM'],
    feesPerYear: '₹60,000 – ₹90,000/year',
    totalFees: '₹1.2 – ₹3.6 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCMB'],
    minPercentage: 45,
    examRequired: ['CET', 'NONE'],
    locationTags: ['maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · Strong Foreign Migration Track Record · INC Approved',
    approval: 'INC Approved',
  },
  {
    id: 'abs-nursing',
    name: 'ABS-Affiliated Nursing Colleges (Mumbai)',
    city: 'Mumbai & MMR',
    state: 'Maharashtra',
    courses: ['B.Sc Nursing', 'GNM', 'ANM'],
    feesPerYear: '₹40,000 – ₹80,000/year',
    totalFees: '₹80,000 – ₹3.2 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCMB'],
    minPercentage: 40,
    examRequired: ['NONE', 'CET'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Direct Placement Network · Mumbai/MMR · Affordable · Direct Admission',
    approval: 'INC Approved Institutions',
  },
  {
    id: 'manipal-nursing',
    name: 'Manipal College of Nursing',
    city: 'Manipal',
    state: 'Karnataka',
    courses: ['B.Sc Nursing', 'GNM'],
    feesPerYear: '₹1.2 – ₹1.8 Lakh/year',
    totalFees: '₹4.8 – ₹7.2 Lakh total',
    feeBucket: ['mid', 'high'],
    streams: ['PCB', 'PCMB'],
    minPercentage: 50,
    examRequired: ['NEET', 'NONE'],
    locationTags: ['karnataka', 'india'],
    isABSPartner: false,
    highlight: 'NAAC A++ · Premium Nursing Education · Strong International Placement',
    approval: 'INC Approved · NAAC A++',
    ranking: 'Top 5 Nursing India',
  },

  // ── ALLIED HEALTH ──────────────────────────
  {
    id: 'mgm-physio',
    name: 'MGM College of Physiotherapy',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    courses: ['BPT'],
    feesPerYear: '₹70,000 – ₹1 Lakh/year',
    totalFees: '₹3.1 – ₹4.5 Lakh total',
    feeBucket: ['mid'],
    streams: ['PCB', 'PCMB'],
    minPercentage: 50,
    examRequired: ['CET', 'NEET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · Leading Physiotherapy College · Mumbai · Sports & Rehab Focus',
    approval: 'IAP Approved',
  },
  {
    id: 'dyp-allied',
    name: 'D.Y. Patil Allied Health Sciences',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    courses: ['BMLT', 'B.Sc Radiology', 'B.Sc OT Technology', 'B.Sc Optometry'],
    feesPerYear: '₹60,000 – ₹90,000/year',
    totalFees: '₹1.8 – ₹3.6 Lakh total',
    feeBucket: ['mid'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 45,
    examRequired: ['CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: true,
    highlight: 'ABS Partner · Multiple Allied Health Programs · Modern Labs · Mumbai',
    approval: 'University Approved',
  },
  {
    id: 'manipal-allied',
    name: 'Manipal College of Allied Health Sciences',
    city: 'Manipal',
    state: 'Karnataka',
    courses: ['BPT', 'BMLT', 'B.Sc Radiology', 'B.Sc Optometry', 'B.Sc OT Technology'],
    feesPerYear: '₹1.2 – ₹2 Lakh/year',
    totalFees: '₹3.6 – ₹8 Lakh total',
    feeBucket: ['mid', 'high'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 50,
    examRequired: ['NEET', 'CET', 'NONE'],
    locationTags: ['karnataka', 'india'],
    isABSPartner: false,
    highlight: 'NAAC A++ · Top Ranked Allied Health · International Placement Support',
    approval: 'Manipal University · NAAC A++',
    ranking: 'Top Ranked India',
  },
  {
    id: 'sies-lab',
    name: 'SIES College of Applied Sciences',
    city: 'Mumbai',
    state: 'Maharashtra',
    courses: ['BMLT', 'B.Sc Radiology'],
    feesPerYear: '₹40,000 – ₹65,000/year',
    totalFees: '₹1.2 – ₹2.6 Lakh total',
    feeBucket: ['low', 'mid'],
    streams: ['PCB', 'PCM', 'PCMB'],
    minPercentage: 45,
    examRequired: ['CET', 'NONE'],
    locationTags: ['mumbai', 'maharashtra', 'india'],
    isABSPartner: false,
    highlight: 'Mumbai College · Affordable · Well-known in Lab Technology',
    approval: 'Mumbai University Approved',
  },
];

/* ─────────────────────────────────────────────
   SCORING ALGORITHM
───────────────────────────────────────────── */
function scoreColleges(answers: Record<string, string>): Array<{ college: College; score: number }> {
  const results: Array<{ college: College; score: number }> = [];

  COLLEGES.forEach((college) => {
    let score = 0;

    // Stream eligibility (hard filter)
    if (answers.stream && !college.streams.includes(answers.stream)) return;

    // Percentage eligibility (soft filter — allow 5% below minimum)
    const pct = parseInt(answers.percentage) || 0;
    if (pct < college.minPercentage - 5) return;
    if (pct >= college.minPercentage) score += 10;
    if (pct >= college.minPercentage + 10) score += 5;

    // Course match
    if (answers.course && answers.course !== 'any') {
      if (college.courses.some((c) => c.toLowerCase().includes(answers.course.toLowerCase()))) {
        score += 30;
      } else {
        return; // skip if course doesn't match
      }
    } else {
      score += 5;
    }

    // Location match
    if (answers.location && college.locationTags.includes(answers.location)) {
      score += 15;
    }

    // Budget match
    if (answers.budget && college.feeBucket.includes(answers.budget)) {
      score += 10;
    } else if (answers.budget === 'flexible') {
      score += 5;
    }

    // ABS partner boost
    if (college.isABSPartner) score += 8;

    // Exam alignment
    const userExam = answers.entranceExam;
    if (userExam === 'NONE' && college.examRequired.includes('NONE')) score += 8;
    else if (userExam && college.examRequired.includes(userExam)) score += 8;

    results.push({ college, score });
  });

  return results.sort((a, b) => b.score - a.score);
}

/* ─────────────────────────────────────────────
   COURSES LIST
───────────────────────────────────────────── */
const COURSES = [
  { value: 'any', label: 'Any / Not Sure Yet' },
  { value: 'D.Pharm', label: 'D.Pharm (Diploma in Pharmacy)' },
  { value: 'B.Pharm', label: 'B.Pharm (Bachelor of Pharmacy)' },
  { value: 'Pharm.D', label: 'Pharm.D (Doctor of Pharmacy)' },
  { value: 'B.Sc Nursing', label: 'B.Sc Nursing' },
  { value: 'GNM', label: 'GNM Nursing' },
  { value: 'ANM', label: 'ANM' },
  { value: 'BPT', label: 'BPT (Physiotherapy)' },
  { value: 'BMLT', label: 'BMLT (Lab Technology)' },
  { value: 'B.Sc Radiology', label: 'B.Sc Radiology / Imaging' },
  { value: 'B.Sc Optometry', label: 'B.Sc Optometry' },
  { value: 'B.Sc OT Technology', label: 'B.Sc OT Technology' },
  { value: 'MBBS', label: 'MBBS' },
  { value: 'BDS', label: 'BDS (Dental)' },
  { value: 'BAMS', label: 'BAMS (Ayurveda)' },
  { value: 'BHMS', label: 'BHMS (Homeopathy)' },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
type FormData = {
  stream: string;
  percentage: string;
  entranceExam: string;
  examScore: string;
  course: string;
  budget: string;
  location: string;
  name: string;
  phone: string;
  email: string;
};

const INITIAL: FormData = {
  stream: '',
  percentage: '60',
  entranceExam: '',
  examScore: '',
  course: 'any',
  budget: '',
  location: '',
  name: '',
  phone: '',
  email: '',
};

const PHONE = '+919702836946';
const WA = '919702836946';

export default function FindYourCollege() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [results, setResults] = useState<Array<{ college: College; score: number }>>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  function validateStep(s: number): string {
    if (s === 1) {
      if (!form.stream) return 'Please select your stream.';
      if (!form.entranceExam) return 'Please select an entrance exam option.';
    }
    if (s === 2) {
      if (!form.course) return 'Please select a course.';
      if (!form.budget) return 'Please select a budget range.';
      if (!form.location) return 'Please select a location preference.';
    }
    if (s === 3) {
      if (!form.name.trim()) return 'Please enter your name.';
      if (!/^[6-9]\d{9}$/.test(form.phone)) return 'Please enter a valid 10-digit mobile number.';
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return 'Please enter a valid email address.';
    }
    return '';
  }

  function next() {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError('');
    if (step === 3) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    setSubmitStatus('loading');
    const matched = scoreColleges(form);
    setResults(matched);

    try {
      await fetch('/api/send-college-predictor-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          topColleges: matched.slice(0, 3).map((r) => r.college.name),
        }),
      });
    } catch {
      // non-blocking — results still show
    }

    setSubmitStatus('done');
    setStep(4);
  }

  const TOTAL_STEPS = 3;
  const progressPct = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  /* ── shared button class for option tiles ── */
  const tile = (selected: boolean) =>
    `border rounded-lg p-3 text-left transition-all cursor-pointer ${
      selected
        ? 'border-blue-600 bg-blue-50 text-blue-700'
        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
    }`;

  return (
    <>
      <Head>
        <title>Find Your Best-Fit College — ABS Educational Solution</title>
        <meta
          name="description"
          content="Answer 3 quick questions and instantly discover the best-fit colleges for Pharmacy, Nursing and Allied Health courses in Mumbai, Maharashtra and Karnataka."
        />
      </Head>

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100 py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-green-100 text-sm font-medium text-green-700 py-1.5 px-4 rounded-full mb-5">
            <GraduationCap size={16} />
            Free Career Counselling
          </span>
          <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-4">
            Find Your <span className="text-green-600">Best-Fit College</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Answer 3 quick questions — get a personalised list of top colleges matched to your
            stream, score, course preference and budget. 100% free, no obligation.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-6">
            {[
              ['50+', 'Partner Colleges'],
              ['10,000+', 'Students Placed'],
              ['15+', 'Years Experience'],
              ['6', 'Mumbai Branches'],
            ].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-2xl font-bold text-green-600">{num}</div>
                <div>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2 border rounded-lg py-3 px-6 hover:bg-gray-50 transition text-sm font-medium"
            >
              <Phone size={16} />
              Call a Counsellor
            </a>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to find the right college for my healthcare course.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border rounded-lg py-3 px-6 hover:bg-green-50 transition text-sm font-medium"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM / RESULTS ── */}
      <section className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {step <= 3 && (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                  {['Your Profile', 'Preferences', 'Contact Details'].map((lbl, i) => (
                    <span
                      key={lbl}
                      className={
                        step > i + 1
                          ? 'text-green-600'
                          : step === i + 1
                          ? 'text-gray-800'
                          : ''
                      }
                    >
                      {i + 1}. {lbl}
                    </span>
                  ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
                {/* ── STEP 1: Profile ── */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Academic Profile</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      We use this to filter colleges that are actually eligible for you.
                    </p>

                    {/* Stream */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        12th Stream <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'PCB', desc: 'Physics, Chemistry, Biology' },
                          { val: 'PCM', desc: 'Physics, Chemistry, Maths' },
                          { val: 'PCMB', desc: 'Maths + Biology both' },
                          { val: 'Other', desc: 'Vocational / Other' },
                        ].map(({ val, desc }) => (
                          <button
                            key={val}
                            onClick={() => update('stream', val)}
                            className={tile(form.stream === val)}
                          >
                            <div className="font-semibold text-sm">{val}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Percentage */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expected / Actual 12th Percentage
                      </label>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-3xl font-bold text-blue-600 text-center mb-3">
                          {form.percentage}%
                        </div>
                        <input
                          type="range"
                          min={35}
                          max={99}
                          value={form.percentage}
                          onChange={(e) => update('percentage', e.target.value)}
                          className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>35%</span><span>67%</span><span>99%</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Options available below 50% too — don&apos;t worry.
                        </p>
                      </div>
                    </div>

                    {/* Entrance Exam */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entrance Exam Taken / Planned <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: 'NEET', label: 'NEET UG' },
                          { val: 'CET', label: 'MHT-CET' },
                          { val: 'JEE', label: 'JEE Main' },
                          { val: 'KCET', label: 'KCET' },
                          { val: 'COMEDK', label: 'COMEDK' },
                          { val: 'NONE', label: 'None / Direct Admission' },
                        ].map(({ val, label }) => (
                          <button
                            key={val}
                            onClick={() => update('entranceExam', val)}
                            className={tile(form.entranceExam === val)}
                          >
                            <span className="text-sm font-medium">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Exam Score */}
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entrance Exam Score (approximate)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 'low', label: 'Low', sub: 'NEET <300, CET <80' },
                          { val: 'avg', label: 'Average', sub: 'NEET 300–450, CET 80–130' },
                          { val: 'good', label: 'Good+', sub: 'NEET 450+, CET 130+' },
                        ].map(({ val, label, sub }) => (
                          <button
                            key={val}
                            onClick={() => update('examScore', val)}
                            className={tile(form.examScore === val)}
                          >
                            <div className="font-semibold text-sm">{label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Preferences ── */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Preferences</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Help us narrow down the colleges that suit your goals.
                    </p>

                    {/* Course */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Course You&apos;re Interested In <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.course}
                        onChange={(e) => update('course', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      >
                        {COURSES.map(({ value, label }) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Course Budget <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'low', label: 'Under ₹2 Lakh', sub: 'Diploma / Govt colleges' },
                          { val: 'mid', label: '₹2 – ₹6 Lakh', sub: 'Most degree courses' },
                          { val: 'high', label: '₹6 – ₹15 Lakh', sub: 'Premium private colleges' },
                          { val: 'flexible', label: 'Flexible', sub: 'Best quality, cost secondary' },
                        ].map(({ val, label, sub }) => (
                          <button
                            key={val}
                            onClick={() => update('budget', val)}
                            className={tile(form.budget === val)}
                          >
                            <div className="font-semibold text-sm">{label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location Preference <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'mumbai', label: 'Mumbai / MMR', sub: 'Can commute from home' },
                          { val: 'maharashtra', label: 'Maharashtra', sub: 'Pune, Nashik, Nagpur OK' },
                          { val: 'karnataka', label: 'Karnataka', sub: 'Bangalore, Belgaum, etc.' },
                          { val: 'india', label: 'Anywhere in India', sub: 'Best college wins' },
                        ].map(({ val, label, sub }) => (
                          <button
                            key={val}
                            onClick={() => update('location', val)}
                            className={tile(form.location === val)}
                          >
                            <div className="font-semibold text-sm">{label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Contact ── */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Almost There!</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Enter your details to see your personalised college list.
                      Our counsellors will also follow up with free admission guidance.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Email Address{' '}
                          <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="[email protected]"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-gray-400">
                      🔒 Your details are safe. We only contact you for college admission guidance —
                      no spam, no third-party sharing.
                    </p>
                  </div>
                )}

                {/* ── Error ── */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                {/* ── Navigation ── */}
                <div className="flex justify-between items-center mt-8 gap-3">
                  <button
                    onClick={back}
                    disabled={step === 1}
                    className="flex items-center gap-1 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    onClick={next}
                    disabled={submitStatus === 'loading'}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Finding colleges...
                      </>
                    ) : step === 3 ? (
                      <>
                        <GraduationCap size={16} />
                        Show My College List
                      </>
                    ) : (
                      <>
                        Continue <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                {['✅ 100% Free', '✅ No Obligation', '✅ Instant Results', '✅ Expert Guidance'].map(
                  (t) => <span key={t}>{t}</span>
                )}
              </div>
            </>
          )}

          {/* ── STEP 4: RESULTS ── */}
          {step === 4 && (
            <div>
              {/* Result header */}
              <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 text-center mb-8 border-t-4 border-green-600">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Personalised Results · Generated Just For You
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {form.name.split(' ')[0]}, here are your best-fit colleges!
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                  Based on your {form.stream} stream, {form.percentage}% marks,{' '}
                  {form.course !== 'any' ? form.course : 'all courses'} preference and{' '}
                  {form.location} location, we found{' '}
                  <strong className="text-gray-800">{results.length} matching colleges.</strong>
                </p>
              </div>

              {results.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                  <GraduationCap size={40} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">No exact match found</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Your profile needs a 1-on-1 expert review. Our counsellors will personally
                    find the right college for you.
                  </p>
                  <a
                    href={`https://wa.me/${WA}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                  >
                    <MessageCircle size={16} /> WhatsApp a Counsellor
                  </a>
                </div>
              ) : (
                <>
                  {/* College cards */}
                  <div className="space-y-5 mb-8">
                    {results.slice(0, 8).map(({ college }, idx) => (
                      <div
                        key={college.id}
                        className={`bg-white rounded-xl shadow-md p-5 md:p-6 border-l-4 relative ${
                          idx === 0
                            ? 'border-l-blue-600'
                            : idx === 1
                            ? 'border-l-green-500'
                            : 'border-l-gray-200'
                        }`}
                      >
                        {idx === 0 && (
                          <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full">
                            Top Match
                          </span>
                        )}
                        {idx === 1 && (
                          <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold uppercase px-2.5 py-1 rounded-full">
                            Strong Fit
                          </span>
                        )}

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4 pr-24">
                          <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={20} className="text-green-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-bold text-gray-800 text-base leading-tight">
                                {college.name}
                              </h3>
                              {college.isABSPartner && (
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200">
                                  ★ ABS Partner
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <MapPin size={12} />
                              <span>{college.city}, {college.state}</span>
                            </div>
                          </div>
                        </div>

                        {/* Courses offered */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {college.courses.map((c) => (
                            <span
                              key={c}
                              className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {c}
                            </span>
                          ))}
                        </div>

                        {/* Meta grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">Fees / Year</div>
                            <div className="text-sm font-semibold text-gray-800">{college.feesPerYear}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">Total Fees</div>
                            <div className="text-sm font-semibold text-blue-600">{college.totalFees}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-400 uppercase font-bold mb-1">Approval</div>
                            <div className="text-sm font-semibold text-gray-800">{college.approval}</div>
                          </div>
                        </div>

                        {/* Highlight */}
                        <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
                          <Award size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-green-800 font-medium">{college.highlight}</p>
                        </div>

                        {/* Ranking */}
                        {college.ranking && (
                          <div className="flex items-center gap-1.5 mb-4">
                            <Star size={13} className="text-yellow-500" />
                            <span className="text-xs font-semibold text-gray-600">{college.ranking}</span>
                          </div>
                        )}

                        {/* CTAs */}
                        <div className="flex gap-3 flex-wrap">
                          <a
                            href={`https://wa.me/${WA}?text=${encodeURIComponent(
                              `Hi ABS Team! I used the Find Your College tool. I'm interested in ${college.name} for ${form.course !== 'any' ? form.course : 'a healthcare course'}. Please guide me. Name: ${form.name}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                          >
                            <MessageCircle size={13} /> Get Free Admission Guidance
                          </a>
                          <a
                            href={`tel:${PHONE}`}
                            className="flex items-center gap-1.5 border border-gray-300 hover:border-blue-600 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                          >
                            <Phone size={13} /> Call Now
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="bg-gray-800 text-white rounded-xl p-6 md:p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
                    <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
                      Our expert counsellors have guided 10,000+ students. Get free 1-on-1
                      admission guidance — no pressure, no charges.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a
                        href={`https://wa.me/${WA}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                      >
                        <MessageCircle size={16} /> WhatsApp Us
                      </a>
                      <a
                        href={`tel:${PHONE}`}
                        className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                      >
                        <Phone size={16} /> +91 97028 36946
                      </a>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                      📍 6 Branches: Bhayandar · Thane · Nalasopara · Andheri · Malad · Kurla
                    </p>
                  </div>

                  {/* Restart */}
                  <div className="text-center mt-6">
                    <button
                      onClick={() => {
                        setStep(1);
                        setForm(INITIAL);
                        setResults([]);
                        setSubmitStatus('idle');
                      }}
                      className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
                    >
                      ↻ Start over / Search again
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
