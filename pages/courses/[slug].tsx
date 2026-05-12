// pages/courses/[slug].tsx
// -------------------------------------------------------------
// • Generates static paths from each MDX file’s *front-matter*  slug
// • Falls back to the filename if a slug is missing (prevents
//   “slug undefined” build errors)
// • Renders your full SEO block (keywords, JSON-LD, OG, Twitter)
// -------------------------------------------------------------

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';

import CourseLanding, { Front } from '../../components/CourseLanding';
import RenderBlocks from '../../components/RenderBlocks';



/* ────────────────────────────────────────────────────────────
   CONSTANTS & UTILITIES
   ──────────────────────────────────────────────────────────── */

const COURSES_DIR = path.join(process.cwd(), 'content/courses');

// If the MDX front-matter lacks `slug`, fall back to the filename.
const deriveSlug = (frontSlug: unknown, fileName: string) =>
  typeof frontSlug === 'string' && frontSlug.trim().length
    ? frontSlug.trim()
    : path.parse(fileName).name;

const stringifyDates = <T,>(obj: T): T => {
  if (obj instanceof Date) return (obj.toISOString().split('T')[0] as unknown) as T;
  if (Array.isArray(obj)) return obj.map(stringifyDates) as unknown as T;
  if (obj && typeof obj === 'object') {
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) o[k] = stringifyDates(v);
    return o as T;
  }
  return obj;
};

/* ────────────────────────────────────────────────────────────
   ADVANCED SEO HELPERS (unchanged from your original version)
   ──────────────────────────────────────────────────────────── */

const generateAdvancedKeywords = (front: Front): string => {
  const primaryCluster = [
    front.title,
    `${front.title} admission 2025`,
    `${front.title} Mumbai`,
    `${front.title} fees`,
  ];

  const intentClusters = {
    admission: [
      `${front.title} direct admission`,
      `${front.title} no entrance exam`,
      `${front.title} eligibility criteria`,
      `how to apply ${front.title}`,
    ],
    location: [
      `${front.title} colleges Mumbai`,
      `best ${front.title} college Bhiwandi`,
      `${front.title} near me`,
      `top ${front.title} institute Maharashtra`,
    ],
    career: [
      `${front.title} career scope`,
      `${front.title} job opportunities 2025`,
      `${front.title} salary prospects`,
      `${front.title} placement assistance`,
    ],
    comparison: [
      `${front.title} vs other courses`,
      `why choose ${front.title}`,
      `${front.title} benefits`,
      `is ${front.title} worth it`,
    ],
  };

  const allKeywords = [
    ...primaryCluster,
    ...intentClusters.admission.slice(0, 4),
    ...intentClusters.location.slice(0, 4),
    ...intentClusters.career.slice(0, 4),
    ...intentClusters.comparison.slice(0, 3),
    ...(front.keywords || []).slice(0, 6),
  ];

  return allKeywords.filter(Boolean).slice(0, 25).join(', ');
};

const generateAdvancedJsonLd = (front: Front, canonicalUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': canonicalUrl,
  name: front.title,
  alternateName: front.shortTitle || `${front.title} Course`,
  description: front.shortDescription ?? front.description ?? front.title,

  provider: {
    '@type': 'CollegeOrUniversity',
    '@id': 'https://abseducationalsolution.com/#organization',
    name: 'ABS Educational Solution',
    alternateName: ['ABS Edu', 'ABS Educational'],
    url: 'https://abseducationalsolution.com',
    logo: 'https://abseducationalsolution.com/logo.png',
    sameAs: [
      'https://facebook.com/absedu',
      'https://linkedin.com/company/absedu',
      'https://twitter.com/absedu',
      'https://instagram.com/absedu',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address', // TODO
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
      postalCode: '400001',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-XXXXXXXXXX', // TODO
        contactType: 'Admissions',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
    foundingDate: '2010',
    accreditedBy: {
      '@type': 'Organization',
      name: 'University Grants Commission',
      alternateName: 'UGC',
      url: 'https://ugc.ac.in',
    },
  },

  offers: {
    '@type': 'Offer',
    '@id': `${canonicalUrl}#offer`,
    category: 'Education',
    availability: 'https://schema.org/InStock',
    validFrom: '2025-01-01',
    validThrough: '2025-12-31',
    price: front.fees || 'Contact for fees',
    priceCurrency: 'INR',
    acceptedPaymentMethod: ['Cash', 'CreditCard', 'DebitCard', 'BankTransfer'],
    eligibleRegion: 'IN',
    discount: front.scholarshipAmount || 'Scholarships available',
  },

  teaches: [...(front.jobRoles || []), ...(front.skills || [])],
  competencyRequired: front.prerequisites || [],

  hasCourseInstance: {
    '@type': 'CourseInstance',
    '@id': `${canonicalUrl}#instance-2025`,
    courseMode: ['on-site', 'blended'],
    duration: front.duration || 'Variable',
    startDate: '2025-07-01',
    endDate: front.endDate || '2026-06-30',
    courseSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'Daily',
      byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    location: {
      '@type': 'Place',
      '@id': 'https://abseducationalsolution.com/#campus',
      name: 'ABS Educational Solution Campus',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    instructor: front.instructors || [],
    maximumAttendeeCapacity: front.maxStudents || 60,
  },

  url: canonicalUrl,
  identifier: canonicalUrl,
  dateCreated: front.dateCreated || '2025-01-01',
  dateModified: front.lastUpdated || new Date().toISOString(),
  datePublished: front.datePublished || '2025-01-01',
  inLanguage: front.language || 'en-IN',
  educationalLevel: front.level || 'Higher Education',
  educationalCredentialAwarded: {
    '@type': 'EducationalOccupationalCredential',
    name: `${front.title} Degree`,
    credentialCategory: 'Degree',
    recognizedBy: {
      '@type': 'Organization',
      name: 'UGC',
    },
  },

  syllabusSections:
    front.syllabus?.map((s: any, i: number) => ({
      '@type': 'Syllabus',
      position: i + 1,
      name: s.title,
      description: s.description,
    })) || [],

  ...(front.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': `${canonicalUrl}#rating`,
      ratingValue: front.rating,
      ratingCount: front.reviewCount || 1,
      bestRating: 5,
      worstRating: 1,
    },
  }),

  applicationDeadline: '2025-06-30',
  applicationStartDate: '2025-01-01',
  applicationContact: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX', // TODO
    email: 'admissions@abseducationalsolution.com',
    url: `${canonicalUrl}#apply`,
  },
});

const generateCTROptimizedDescription = (front: Front): string => {
  const year = new Date().getFullYear();
  const benefits = [
    'Direct Admission',
    'No Entrance Exam',
    '100% Placement',
    'Scholarship Available',
  ];
  return `🎓 ${front.title} Admission ${year} Mumbai | ${benefits.join(
    ' • ',
  )} | Industry-Ready Curriculum at ABS Educational Solution. Apply Now & Secure Your Future! ⚡`;
};

const generateVoiceSearchFAQ = (front: Front) => [
  {
    '@type': 'Question',
    name: `What is ${front.title} course?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${front.title} at ABS Educational Solution is ${front.shortDescription || 'a comprehensive program'
        } designed for career success in ${front.industry || 'various industries'}.`,
    },
  },
  {
    '@type': 'Question',
    name: `What are the fees for ${front.title}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${front.title} fees at ABS Educational Solution are ${front.fees || 'competitive and affordable'
        } with scholarship opportunities and flexible payment options available.`,
    },
  },
  {
    '@type': 'Question',
    name: `Can I get direct admission to ${front.title}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `Yes! ABS Educational Solution offers direct admission to ${front.title} without entrance exams. We focus on your potential and passion for learning.`,
    },
  },
  {
    '@type': 'Question',
    name: `What jobs can I get after ${front.title}?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `After completing ${front.title}, you can work as ${(
        front.jobRoles || ['various professional roles']
      )
        .slice(0, 3)
        .join(', ')} with excellent career growth prospects.`,
    },
  },
];

/* ────────────────────────────────────────────────────────────
   1️⃣  getStaticPaths  – builds every /courses/<slug>
   ──────────────────────────────────────────────────────────── */
export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir(COURSES_DIR);

  const paths = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(COURSES_DIR, file), 'utf8');
      const { data } = matter(raw);
      return { params: { slug: deriveSlug(data.slug, file) } };
    }),
  );

  return { paths, fallback: 'blocking' };
};

/* ────────────────────────────────────────────────────────────
   2️⃣  getStaticProps  – fetches MDX that matches the slug
   ──────────────────────────────────────────────────────────── */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const requestedSlug = params!.slug as string;
  const files = await fs.readdir(COURSES_DIR);

  for (const file of files) {
    const raw = await fs.readFile(path.join(COURSES_DIR, file), 'utf8');
    const parsed = matter(raw);

    // 🔧 FIX: Safely construct the data object with null instead of undefined
    const data = {
      // Required Front properties with defaults
      title: parsed.data.title || "Untitled Course",
      tagline: parsed.data.tagline || "",
      domain: parsed.data.domain || "",
      eligibility: parsed.data.eligibility || "",
      salary: parsed.data.salary || "",
      heroImage: parsed.data.heroImage || "",
      heroAlt: parsed.data.heroAlt || null,        // ✅ null instead of undefined
      ctaLabel: parsed.data.ctaLabel || "Apply Now",
      ctaLink: parsed.data.ctaLink || "#",

      // 🔧 FIX: Convert undefined to null for serialization
      blocks: parsed.data.blocks || null,          // ✅ null instead of undefined
      slug: parsed.data.slug || null,              // ✅ null instead of undefined

      // Spread any additional properties, but ensure no undefined values
      ...Object.fromEntries(
        Object.entries(parsed.data).map(([key, value]) => [key, value ?? null])
      )
    };

    const actualSlug = deriveSlug(data.slug, file);
    if (actualSlug === requestedSlug) {
      const frontSafe = stringifyDates({ ...data, slug: actualSlug });

      marked.setOptions({ gfm: true, breaks: true });
      const bodyHtml = parsed.content.trim()
        ? (marked.parse(parsed.content) as string)
        : '';

      return { props: { front: frontSafe, bodyHtml }, revalidate: 60 };
    }
  }

  return { notFound: true };
};
/* ────────────────────────────────────────────────────────────
   3️⃣  PAGE COMPONENT
   ──────────────────────────────────────────────────────────── */
export default function CoursePage({
  front,
  bodyHtml,
}: {
  front: Front & { blocks?: any[] };
  bodyHtml: string;
}) {
  const canonicalUrl = `https://abseducationalsolution.com/courses/${front.slug}`;

  const metaDescription = generateCTROptimizedDescription(front);
  const keywords = generateAdvancedKeywords(front);
  const courseJsonLd = generateAdvancedJsonLd(front, canonicalUrl);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generateVoiceSearchFAQ(front),
  };

  return (
    <>
      <Head>
        {/* ───────── BASIC SEO ───────── */}
        <title>
          {front.title} Admission 2025 in Mumbai | Fees, Eligibility, ABS Edu
        </title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* ───────── PERFORMANCE PRECONNECTS ───────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* ───────── VIEWPORT & THEME ───────── */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1a365d" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#2d3748" media="(prefers-color-scheme: dark)" />

        {/* ───────── SEARCH ENGINE DIRECTIVES ───────── */}
        <meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:160" />

        {/* ───────── CLASSIFICATION TAGS ───────── */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="classification" content="Education" />

        {/* ───────── TEMPORAL TAGS ───────── */}
        <meta name="date" content={new Date().toISOString()} />
        <meta name="last-modified" content={front.lastUpdated || new Date().toISOString()} />

        {/* ───────── EDUCATIONAL TAXONOMY ───────── */}
        <meta name="DC.type" content="InteractiveResource" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.audience" content="Students" />
        <meta name="DC.educationLevel" content={front.level || 'Higher Education'} />

        {/* ───────── LOCAL SEO GEO TAGS ───────── */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />

        {/* ───────── OPEN GRAPH ───────── */}
        <meta property="og:title" content={`${front.title} - ABS Educational Solution`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ABS Educational Solution" />
        <meta property="og:locale" content="en_IN" />
        {front.image && <meta property="og:image" content={front.image} />}

        {/* ───────── TWITTER CARDS ───────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${front.title} - ABS Educational Solution`} />
        <meta name="twitter:description" content={metaDescription} />
        {front.image && <meta name="twitter:image" content={front.image} />}

        {/* ───────── JSON-LD (Course + FAQ) ───────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ───────── ORGANIZATION SCHEMA ───────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                '@context': 'https://schema.org',
                '@type': 'CollegeOrUniversity',
                '@id': 'https://abseducationalsolution.com/#organization',
                name: 'ABS Educational Solution',
                url: 'https://abseducationalsolution.com',
                logo: 'https://abseducationalsolution.com/logo.png',
                sameAs: [
                  'https://facebook.com/absedu',
                  'https://linkedin.com/company/absedu',
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Mumbai',
                  addressRegion: 'Maharashtra',
                  addressCountry: 'IN',
                },
              },
              null,
              2,
            ),
          }}
        />
      </Head>

      {/* ───────── PAGE CONTENT ───────── */}
      <CourseLanding front={front} Body={() => <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />} />
      {front.blocks && <RenderBlocks blocks={front.blocks} />}
    </>
  );
}
