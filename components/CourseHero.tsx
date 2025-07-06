// components/CourseHero.tsx
import Image from 'next/image';
import Link  from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

type Props = {
  title: string;
  tagline: string;
  domain: string;
  eligibility: string;
  salary: string;
  heroImage: string;
  heroAlt?: string;        // ← now optional
  ctaLabel: string;
  ctaLink: string;
  brochureLink?: string;
  onConnect: () => void;
  onGetBrochure?: () => void;
  breadcrumbs: Breadcrumb[];
};

export default function CourseHero({
  title,
  tagline,
  domain,
  eligibility,
  salary,
  heroImage,
  heroAlt,
  ctaLabel,
  ctaLink,
  brochureLink,
  onConnect,
  onGetBrochure,
  breadcrumbs,
}: Props) {
  const altText = heroAlt ?? 'Course hero image';

  return (
    <section className="bg-white py-6 md:py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* ───────── column A ───────── */}
        <div>
          {/* breadcrumb */}
          <nav className="mb-6 text-sm text-slate-500 space-x-1">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center space-x-1">
                {i !== 0 && <span>›</span>}
                {b.href ? (
                  <Link href={b.href} className="hover:underline">
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-700 mb-6">{tagline}</p>

          <ul className="space-y-2 mb-8 text-slate-800">
            <li>⭐ <strong>Domain:</strong> {domain}</li>
            <li>⭐ <strong>Eligibility:</strong> {eligibility}</li>
            <li>⭐ <strong>Starting&nbsp;Salary:</strong> {salary}</li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white py-3 px-7 text-sm font-medium hover:bg-slate-800"
            >
              {ctaLabel} ↗
            </a>

            {/* brochure button */}
            {brochureLink ? (
              <a
                href={brochureLink}
                className="inline-flex items-center gap-2 rounded-lg border py-3 px-7 text-sm font-medium hover:bg-slate-100"
              >
                🗎 Get&nbsp;brochure
              </a>
            ) : onGetBrochure ? (
              <button
                onClick={onGetBrochure}
                className="inline-flex items-center gap-2 rounded-lg border py-3 px-7 text-sm font-medium hover:bg-slate-100"
              >
                🗎 Get&nbsp;brochure
              </button>
            ) : null}

            <button
              onClick={onConnect}
              className="md:hidden rounded-lg border py-3 px-7 text-sm font-medium hover:bg-slate-100"
            >
              🤝 Connect
            </button>
          </div>
        </div>

        {/* ───────── column B ───────── */}
        <Image
          src={heroImage}
          alt={altText}
          width={960}
          height={640}
          priority
          className="rounded-xl object-cover w-full h-auto"
        />
      </div>
    </section>
  );
}
