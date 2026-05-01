import Head from 'next/head';

type ResultLink = {
  name: string;
  url: string;
  note: string;
  primary?: boolean;
};

// Only officially authorized portals for HSC (Class 12) Maharashtra 2026 result.
const RESULT_LINKS: ResultLink[] = [
  {
    name: 'mahresult.nic.in',
    url: 'https://mahresult.nic.in/',
    note: 'Official MSBSHSE result portal hosted by NIC — primary site on result day.',
    primary: true,
  },
  {
    name: 'hscresult.mkcl.org',
    url: 'https://hscresult.mkcl.org/',
    note: 'Official MKCL portal authorised by Maharashtra State Board — main backup.',
    primary: true,
  },
  {
    name: 'hscresult.mahahsscboard.in',
    url: 'https://hscresult.mahahsscboard.in/',
    note: 'Dedicated result subdomain of the Maharashtra State Board (MSBSHSE) — direct result lookup.',
  },
  {
    name: 'results.digilocker.gov.in',
    url: 'https://results.digilocker.gov.in/',
    note: 'Government-issued digital marksheet via DigiLocker — login with Aadhaar.',
  },
];

const STEPS = [
  'Open one of the official result websites listed below.',
  'Click on the "HSC / Class 12 Result 2026" link on the homepage.',
  'Enter your Seat Number and Mother\'s First Name (as on hall-ticket).',
  'Click "View Result" — your provisional marksheet appears on screen.',
  'Take a screenshot and download / print the PDF for safe-keeping.',
  'Collect the original marksheet from your school / junior college after 10–15 days.',
];

const SMS_HELP = [
  { code: 'MHHSC <space> Seat-No', send: 'Send to 57766', desc: 'Works on any mobile, no internet needed.' },
  { code: 'DigiLocker app', send: 'Login with Aadhaar', desc: 'Instant digital marksheet, government-issued.' },
];

export default function HSCResultPage() {
  return (
    <>
      <Head>
        <title>HSC 12th Result 2026 Maharashtra — Where & How to Check | ABS</title>
        <meta
          name="description"
          content="Direct links to check Maharashtra HSC Class 12 result 2026. Step-by-step guide with all official MSBSHSE websites, DigiLocker and SMS options."
        />
        <meta name="robots" content="index,follow" />
      </Head>

      {/* ---------- HERO + LINKS (above the fold) ---------- */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-4 md:pt-10 md:pb-6 text-center">
          <span className="inline-block bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
            Result on Saturday, 2 May 2026 · 1:00 PM
          </span>
          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight">
            HSC 12th Result 2026 — Maharashtra Board
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            MSBSHSE will declare the Class 12 result at 1:00 PM. Click any
            official link below — login with your <strong>seat number</strong>{' '}
            and <strong>mother's first name</strong>.
          </p>
        </div>

        <div id="links" className="max-w-6xl mx-auto px-6 pb-10 md:pb-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESULT_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 transition shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${
                  link.primary ? 'ring-2 ring-yellow-300' : ''
                }`}
              >
                <span className="font-semibold text-gray-900 break-all text-sm">
                  {link.name}
                </span>
                <span className="shrink-0 text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>
            ))}
          </div>
          {/* ---------- POST-RESULT ACTION BUTTONS ---------- */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-center text-sm text-white/90 mb-3">
              After checking your result —
            </p>
            <div className="flex justify-center">
              <a
                href="/scholarship-tool"
                className="inline-flex items-center gap-2 bg-yellow-300 hover:bg-yellow-200 text-yellow-900 font-semibold px-5 py-2.5 rounded-lg shadow-sm"
              >
                🎓 Find Scholarships You Qualify For
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOW TO CHECK ---------- */}
      <section id="how-to-check" className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              How to Check Your HSC Result — 6 Steps
            </h2>
            <p className="text-gray-600 mt-2">
              Keep your hall-ticket ready before you start.
            </p>
          </div>

          <ol className="space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 bg-white rounded-lg border border-gray-200 p-5"
              >
                <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-600 text-white font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-800 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- SMS / DIGILOCKER ---------- */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Other Ways to Get Your Result
          </h2>
          <p className="text-gray-600 mt-2">
            Useful when websites are slow on result day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {SMS_HELP.map((s) => (
            <div
              key={s.code}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="font-mono text-sm bg-gray-100 rounded px-3 py-2 inline-block">
                {s.code}
              </div>
              <p className="text-sm font-semibold text-indigo-600 mt-3">
                {s.send}
              </p>
              <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- HELP / CTA ---------- */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Got your result? Plan your next step.
          </h2>
          <p className="mt-3 text-white/90">
            Confused about which course or college to choose after 12th? Talk
            to an ABS career counsellor — it's free.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/counselling"
              className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-lg shadow"
            >
              Free Career Counselling →
            </a>
            <a
              href="tel:+919702836946"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              📞 Call +91 97028 36946
            </a>
            <a
              href="https://wa.me/919702836946?text=Hi%20ABS%2C%20I%20just%20checked%20my%20HSC%20result%20and%20need%20guidance%20on%20what%20to%20do%20next."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
