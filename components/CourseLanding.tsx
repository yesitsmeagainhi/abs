// components/CourseLanding.tsx - TAILWIND ONLY VERSION
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

// Import SEO utilities
import { 
  generateComprehensiveSEOData2025, 
  type EnhancedFront 
} from '../lib/seo';

import CourseHero             from './CourseHero';
import CourseOverviewSection  from './CourseOverviewSection';
import CareerGrid             from './CareerGrid';
import ScholarshipBanner      from './ScholarshipBanner';
import BranchesSection        from './BranchesSection';
import PlacementCarousel      from './PlacementCarousel';
import Modal                  from './Modal';
import FAQSection, { FAQ }    from './FAQsection';
import Gallery from './Gallery';

export type Branch = {
  name: string;
  location: string;
  map: string;
  phone: string;
  whatsapp: string;
};

export type DetailAccordion = {
  title: string;
  body: string;
};

export type Front = EnhancedFront & {
  title:       string;
  tagline:     string;
  domain:      string;
  eligibility: string;
  salary:      string;
  heroImage:   string;
  heroAlt?:    string;
  ctaLabel:    string;
  ctaLink:     string;
  brochureLink?: string;
  slug:        string;
  overview: { label: string; value: string }[];
  rolesHeading: string;
  roles: { name: string; href: string }[];
  branches: Branch[];
  detailAccordions: DetailAccordion[];
  faqs?: FAQ[];
  sections?: {
    hero?:           boolean;
    placement?:      boolean;
    overview?:       boolean;
    enquiryCta?:     boolean;
    career?:         boolean;
    scholarship?:    boolean;
    body?:           boolean;
    branches?:       boolean;
    faq?:            boolean;
    footerCta?:      boolean;
  };
};

type Props = {
  front: Front;
  Body:  React.ComponentType;
};

type PopupType = 'apply-now' | 'thank-you' | 'enquiry-counsellor' | 'scholarship' | 'branch-contact' | 'footer-contact' | null;

export default function CourseLanding({ front, Body }: Props) {
  const router = useRouter();
  const [currentPopup, setCurrentPopup] = useState<PopupType>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted for proper hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const canonicalUrl = `https://abseducationalsolution.com/courses/${front.slug}`;
  const seoData = generateComprehensiveSEOData2025(front, canonicalUrl);

  const show = {
    hero:        true,
    placement:   true,
    overview:    true,
    enquiryCta:  true,
    career:      true,
    scholarship: true,
    body:        true,
    branches:    true,
    faq:         true,
    footerCta:   true,
    ...front.sections,
  };

  const breadcrumbs = [
    { label: '🏠 Home', href: '/' },
    { label: 'Programs', href: '/courses' },
    { label: front.title },
  ];

  const handleGetBrochure = () => {
    const message = `I Am Interested In ${front.title} Please Share More Details And I Want The Brochure`;
    window.open(`https://wa.me/919702836946?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openWhatsAppForApplication = () => {
    const message = `I Am Interested In ${front.title} Please Share More Details And I Want To Apply For This Course`;
    window.open(`https://wa.me/919702836946?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openWhatsAppForScholarship = () => {
    const message = `I Am Interested In ${front.title} Please Share More Details And I Want To Apply For Scholarship`;
    window.open(`https://wa.me/919702836946?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openWhatsAppForCounsellor = () => {
    const message = `I Am Interested In ${front.title} Please Share More Details And I Want To Talk With Counsellor`;
    window.open(`https://wa.me/919702836946?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openWhatsAppForBranch = () => {
    const message = `I Am Interested In ${front.title} Please Share More Details And I Want To Visit Branch`;
    window.open(`https://wa.me/919702836946?text=${encodeURIComponent(message)}`, '_blank');
  };

  const renderPopupContent = () => {
    switch (currentPopup) {
      case 'apply-now':
        return (
          <div className="p-4 sm:p-6 text-center w-full max-w-md mx-auto">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 px-2">
                Apply for {front.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Get instant assistance for your application. We'll help you with admission requirements, course details, and the complete application process.
              </p>
            </div>
            
            <div className="space-y-3 px-2">
              <button
                onClick={() => {
                  setCurrentPopup(null);
                  openWhatsAppForApplication();
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>💬</span>
                <span className="truncate">Start Application on WhatsApp</span>
              </button>
              
              <button
                onClick={() => window.open('tel:+919702836946', '_self')}
                className="w-full border border-blue-600 text-blue-600 py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>📞</span>
                <span className="truncate">Call Now - +91 9702836946</span>
              </button>
              
              <button
                onClick={() => setCurrentPopup(null)}
                className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'scholarship':
        return (
          <div className="p-4 sm:p-6 text-center w-full max-w-md mx-auto">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 px-2">
                Apply for Scholarship
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Get up to ₹20,000 scholarship on {front.title}. Our team will help you check eligibility and complete the scholarship application process.
              </p>
            </div>
            
            <div className="space-y-3 px-2">
              <button
                onClick={() => {
                  setCurrentPopup(null);
                  openWhatsAppForScholarship();
                }}
                className="w-full bg-green-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>💬</span>
                <span className="truncate">Check Scholarship Eligibility</span>
              </button>
              
              <button
                onClick={() => window.open('tel:+919702836946', '_self')}
                className="w-full border border-green-600 text-green-600 py-3 px-4 sm:px-6 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>📞</span>
                <span className="truncate">Call for Scholarship Info</span>
              </button>
              
              <button
                onClick={() => setCurrentPopup(null)}
                className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'enquiry-counsellor':
        return (
          <div className="p-4 sm:p-6 text-center w-full max-w-md mx-auto">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 px-2">
                Talk to a Counsellor
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Get personalized guidance for {front.title}. Our expert counsellors will help you understand course details, career prospects, and choose the right path.
              </p>
            </div>
            
            <div className="space-y-3 px-2">
              <button
                onClick={() => {
                  setCurrentPopup(null);
                  openWhatsAppForCounsellor();
                }}
                className="w-full bg-purple-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>💬</span>
                <span className="truncate">Request Counselling Session</span>
              </button>
              
              <button
                onClick={() => window.open('tel:+919702836946', '_self')}
                className="w-full border border-purple-600 text-purple-600 py-3 px-4 sm:px-6 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>📞</span>
                <span className="truncate">Call for Immediate Help</span>
              </button>
              
              <button
                onClick={() => setCurrentPopup(null)}
                className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'branch-contact':
      case 'footer-contact':
        return (
          <div className="p-4 sm:p-6 text-center w-full max-w-md mx-auto">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 px-2">
                Visit Our Branch
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Get detailed information about {front.title} by visiting our branch. We'll provide you with complete course details, facility tours, and personal guidance.
              </p>
            </div>
            
            <div className="space-y-3 px-2">
              <button
                onClick={() => {
                  setCurrentPopup(null);
                  openWhatsAppForBranch();
                }}
                className="w-full bg-orange-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>💬</span>
                <span className="truncate">Get Branch Information</span>
              </button>
              
              <button
                onClick={() => window.open('tel:+919702836946', '_self')}
                className="w-full border border-orange-600 text-orange-600 py-3 px-4 sm:px-6 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>📞</span>
                <span className="truncate">Call for Directions</span>
              </button>
              
              <button
                onClick={() => setCurrentPopup(null)}
                className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'thank-you':
        return (
          <div className="p-4 sm:p-6 text-center w-full max-w-md mx-auto">
            <div className="mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-800 px-2">
                Thank You!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                We've received your interest in {front.title}. Our team will contact you soon to provide detailed information and assistance.
              </p>
            </div>
            
            <div className="space-y-3 px-2">
              <button
                onClick={() => window.open('tel:+919702836946', '_self')}
                className="w-full bg-slate-800 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>📞</span>
                <span className="truncate">Call Now - +91 9702836946</span>
              </button>
              
              <button
                onClick={() => window.open(`https://wa.me/919702836946?text=I Am Interested In ${encodeURIComponent(front.title)} Please Share More Details`, '_blank')}
                className="w-full border border-green-500 text-green-600 py-3 px-4 sm:px-6 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px]"
              >
                <span>💬</span>
                <span className="truncate">WhatsApp Us</span>
              </button>
              
              <button
                onClick={() => setCurrentPopup(null)}
                className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        {/* === CRITICAL VIEWPORT & RESPONSIVE SETUP === */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes, maximum-scale=5.0" />
        
        {/* === CRITICAL PERFORMANCE OPTIMIZATIONS === */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={front.heroImage} as="image" fetchPriority="high" />
        <link rel="preload" href="/css/critical.css" as="style" />
        
        {/* === ENHANCED DNS PREFETCH === */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* === MODERN THEME COLORS === */}
        <meta name="theme-color" content="#1a365d" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#2d3748" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        
        {/* === ENHANCED ROBOTS === */}
        <meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:160, max-image-preview:large" />
        
        {/* === PWA ENHANCEMENTS === */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={front.title} />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        
        {/* === SECURITY HEADERS === */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* === BASIC SEO === */}
        <title>{front.title} Admission 2025 | Direct Entry | ABS Educational Solution</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* === ENHANCED OPEN GRAPH === */}
        <meta property="og:title" content={`${front.title} Admission 2025 | ABS Educational Solution`} />
        <meta property="og:description" content={seoData.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://abseducationalsolution.com${front.heroImage}`} />
        <meta property="og:image:alt" content={front.heroAlt || front.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ABS Educational Solution" />
        <meta property="og:locale" content="en_IN" />
        
        {/* === ENHANCED TWITTER === */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${front.title} Admission 2025`} />
        <meta name="twitter:description" content={seoData.metaDescription} />
        <meta name="twitter:image" content={`https://abseducationalsolution.com${front.heroImage}`} />
        <meta name="twitter:image:alt" content={front.heroAlt || front.title} />
        
        {/* === ADDITIONAL HEAD TAGS === */}
{seoData.headTags.headTags.map((tag, index) => (
  <link key={index} {...(tag as any)} />
))}
{seoData.headTags.metaTags.map((tag, index) => (
  <meta key={index} {...(tag as any)} />
))}
{seoData.headTags.httpEquivTags.map((tag, index) => (
  <meta key={index} {...(tag as any)} />
))}

        
        {/* === STRUCTURED DATA === */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.jsonLd)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": seoData.voiceSearchFAQ.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </Head>

      {/* === MAIN CONTENT - FULLY RESPONSIVE (TAILWIND ONLY) === */}
      <div className="min-h-screen bg-white overflow-x-hidden">
        {show.hero && (
          <div className="w-full">
            <CourseHero
  {...front}
  breadcrumbs={breadcrumbs}
  onConnect={() => setCurrentPopup('apply-now')}
  onGetBrochure={handleGetBrochure}   // ❌ TS: prop not in type
/>

          </div>
        )}

        {show.placement && (
          <div className="w-full">
            <PlacementCarousel />
          </div>
        )}

        {show.overview && (
          <div className="w-full">
            <CourseOverviewSection
              courseName={front.title}
              overviewTable={front.overview}
              detailAccordions={front.detailAccordions}
            />
          </div>
        )}

        {show.enquiryCta && (
          <section className="w-full py-8 sm:py-12 md:py-14 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Want more details about {front.title}? Request a call-back
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                <button
                  onClick={() => setCurrentPopup('apply-now')}
                  className="w-full sm:w-auto rounded-lg bg-slate-900 text-white py-3 px-6 sm:px-8 hover:bg-slate-800 transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>📄</span>
                  <span>Apply Now</span>
                </button>
                <button
                  onClick={() => setCurrentPopup('enquiry-counsellor')}
                  className="w-full sm:w-auto rounded-lg border border-gray-300 text-gray-700 py-3 px-6 sm:px-8 hover:bg-slate-50 transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>🤝</span>
                  <span>Talk to a counsellor</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {show.career && (
          <div className="w-full">
            <CareerGrid heading={front.rolesHeading} roles={front.roles} />
          </div>
        )}

        {show.scholarship && (
          <div className="w-full">
            <ScholarshipBanner course={front.title} onOpen={() => setCurrentPopup('scholarship')} />
          </div>
        )}

        {show.body && (
          <section className="w-full py-8 sm:py-12 md:py-16">
            <div className="prose sm:prose-lg max-w-4xl mx-auto px-4 sm:px-6">
              <Body />
            </div>
          </section>
        )}

        {show.branches && (
          <div className="w-full">
            <BranchesSection branches={front.branches} onConnect={() => setCurrentPopup('branch-contact')} />
          </div>
        )}

        {show.faq && front.faqs && (
          <div className="w-full">
            <FAQSection faqs={front.faqs} />
          </div>
        )}

        {show.footerCta && (
          <section className="w-full bg-slate-900 text-white py-8 sm:py-12 md:py-14">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 leading-tight">
                Want more details about {front.title}?
              </h2>
              <p className="mb-4 sm:mb-6 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Visit any of our branches for free counselling and personalised guidance.
              </p>
              <button
                onClick={() => setCurrentPopup('footer-contact')}
                className="rounded-lg bg-white text-slate-900 font-medium py-3 px-6 sm:px-8 hover:bg-gray-100 transition-colors text-sm sm:text-base min-h-[44px]"
              >
                Find a branch
              </button>
            </div>
          </section>
        )}

        {/* === RESPONSIVE STICKY BOTTOM CTA (TAILWIND ONLY) === */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
          <div className="flex gap-2 max-w-sm sm:max-w-md mx-auto">
            <button
              onClick={() => window.open('tel:+919702836946', '_self')}
              className="flex-1 bg-slate-900 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm min-h-[44px]"
            >
              <span className="text-base sm:text-lg">📞</span>
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </button>
            <button
              onClick={() => window.open(`https://wa.me/919702836946?text=I Am Interested In ${encodeURIComponent(front.title)} Please Share More Details`, '_blank')}
              className="flex-1 bg-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm min-h-[44px]"
            >
              <span className="text-base sm:text-lg">💬</span>
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Chat</span>
            </button>
          </div>
        </div>

        {/* === BOTTOM SPACING FOR STICKY CTA === */}
        <div className="h-16 sm:h-20"></div>
      </div>

      {/* === RESPONSIVE MODAL (TAILWIND ONLY) === */}
      <Modal 
        isOpen={currentPopup !== null} 
        onClose={() => setCurrentPopup(null)}
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto">
          {renderPopupContent()}
        </div>
      </Modal>
    </>
  );
}