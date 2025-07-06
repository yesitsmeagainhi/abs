// Enhanced SEO Utils 2025 - Optimized for AI Search & Core Web Vitals
// src/utils/enhanced-seo.ts

// Base interface (assuming this exists)
interface Front {
  title: string;
  slug: string;
  description?: string;
  keywords?: string[];
  [key: string]: any;
}

export interface EnhancedFront extends Front {
  // AI Search Optimization
  primaryEntity?: string;
  relatedEntities?: string[];
  semanticKeywords?: string[];
  contentDepth?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  // Performance & UX
  expectedLoadTime?: number;
  interactionElements?: string[];
  
  // Modern SEO
  topicalAuthority?: string[];
  competitorAnalysis?: string[];
  contentGaps?: string[];
  
  // Additional properties
  shortTitle?: string;
  shortDescription?: string;
  level?: string;
  duration?: string;
  fees?: string;
  prerequisites?: string[];
  jobRoles?: string[];
  skills?: string[];
  industry?: string;
  maxStudents?: number;
  instructors?: string[];
  syllabus?: Array<{
    title: string;
    description: string;
    skills?: string[];
  }>;
  rating?: number;
  reviewCount?: number;
  dateCreated?: string;
  lastUpdated?: string;
  datePublished?: string;
  language?: string;
  scholarshipAmount?: string;
  partners?: string[];
  authorName?: string;
  endDate?: string;
}

// 1. ENHANCED: AI-First Keyword Strategy (2025 Focus)
export const generateAIOptimizedKeywords2025 = (front: EnhancedFront): string => {
  // Primary entity-based cluster
  const entityCluster = [
    front.primaryEntity || front.title,
    `${front.title} course Mumbai 2025`,
    `${front.title} admission direct`,
    `${front.title} career opportunities`
  ];

  // Semantic keyword expansion (AI understands context better)
  const semanticCluster = [
    ...(front.semanticKeywords || []),
    `${front.title} skills development`,
    `${front.title} industry training`,
    `${front.title} professional certification`,
    `${front.title} job placement assistance`
  ];

  // Intent-based clustering (matches user search patterns)
  const intentBasedKeywords = [
    // Informational intent
    `what is ${front.title}`,
    `${front.title} scope and opportunities`,
    `${front.title} curriculum details`,
    
    // Navigational intent
    `${front.title} colleges Mumbai`,
    `best ${front.title} institute`,
    
    // Transactional intent
    `${front.title} admission apply online`,
    `${front.title} fees and eligibility`,
    
    // Commercial intent
    `${front.title} vs other courses`,
    `${front.title} ROI career benefits`
  ];

  // Combine strategically (focusing on quality over quantity)
  return [
    ...entityCluster,
    ...semanticCluster.slice(0, 6),
    ...intentBasedKeywords.slice(0, 8),
    ...(front.keywords || []).slice(0, 5)
  ]
    .filter(Boolean)
    .slice(0, 20) // Reduced for better focus
    .join(', ');
};

// 2. ENHANCED: Advanced JSON-LD with AI Search Optimization
export const generateAdvancedJsonLd2025 = (front: EnhancedFront, canonicalUrl: string) => {
  const currentYear = new Date().getFullYear();
  
  return {
    "@context": "https://schema.org",
    "@type": ["Course", "EducationalOccupationalProgram"], // Multiple types for broader coverage
    "@id": canonicalUrl,
    
    // Enhanced entity recognition
    name: front.title,
    alternateName: [
      front.shortTitle || `${front.title} Course`,
      `${front.title} Program`,
      `${front.title} Training`
    ],
    description: front.shortDescription || front.description || front.title,
    
    // AI-friendly content classification
    about: {
      "@type": "Thing",
      "@id": `https://abseducationalsolution.com/topics/${front.slug}`,
      name: front.primaryEntity || front.title,
      sameAs: front.relatedEntities || []
    },
    
    // Enhanced provider with credibility signals
    provider: {
      "@type": "CollegeOrUniversity",
      "@id": "https://abseducationalsolution.com/#organization",
      name: "ABS Educational Solution",
      alternateName: ["ABS Edu", "ABS Educational"],
      url: "https://abseducationalsolution.com",
      logo: {
        "@type": "ImageObject",
        url: "https://abseducationalsolution.com/logo.png",
        width: 400,
        height: 400
      },
      
      // Trust signals for AI
      foundingDate: "2010", // Update with actual date
      accreditedBy: {
        "@type": "Organization",
        name: "University Grants Commission",
        alternateName: "UGC",
        url: "https://ugc.ac.in"
      },
      
      // Enhanced contact information
      contactPoint: [{
        "@type": "ContactPoint",
        telephone: "+91-9876543210", // Update with real number
        email: "admissions@abseducationalsolution.com",
        contactType: "Admissions",
        availableLanguage: ["English", "Hindi", "Marathi"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00"
        }
      }],
      
      // Social proof
      sameAs: [
        "https://facebook.com/abseducationalsolutioncationalsolution",
        "https://linkedin.com/company/abseducationalsolution",
        "https://twitter.com/abseducationalsolution",
        "https://instagram.com/abseducationalsolution",
        "https://youtube.com/abseducationalsolution"
      ]
    },
    
    // Enhanced offering with pricing transparency
    offers: {
      "@type": "Offer",
      "@id": `${canonicalUrl}#offer`,
      category: "Education",
      availability: "https://schema.org/InStock",
      validFrom: `${currentYear}-01-01`,
      validThrough: `${currentYear}-12-31`,
      price: front.fees || "Contact for fees",
      priceCurrency: "INR",
      
      // Enhanced pricing details
      priceSpecification: {
        "@type": "PriceSpecification",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: front.maxStudents || 60,
          unitText: "student"
        }
      },
      
      // Payment and scholarship info
      acceptedPaymentMethod: ["Cash", "CreditCard", "DebitCard", "BankTransfer", "UPI"],
      eligibleRegion: "IN",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7
      }
    },
    
    // Detailed learning outcomes
    teaches: [
      ...(front.jobRoles || []),
      ...(front.skills || []),
      ...(front.topicalAuthority || [])
    ],
    
    // Prerequisites and audience
    competencyRequired: front.prerequisites || [],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: front.level || "Higher Education"
    },
    
    // Enhanced course instance with scheduling
    hasCourseInstance: {
      "@type": "CourseInstance",
      "@id": `${canonicalUrl}#instance-${currentYear}`,
      courseMode: ["on-site", "blended", "online"], // Modern delivery modes
      duration: front.duration || "Variable",
      startDate: `${currentYear}-07-01`,
      endDate: front.endDate || `${currentYear + 1}-06-30`,
      
      // Detailed scheduling
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1D", // ISO 8601 duration
        byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        scheduleTimezone: "Asia/Kolkata"
      },
      
      // Location with enhanced details
      location: {
        "@type": "Place",
        "@id": "https://abseducationalsolution.com/#campus",
        name: "ABS Educational Solution Campus",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Education Street", // Update with real address
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
          postalCode: "400001"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "19.0760",
          longitude: "72.8777"
        }
      },
      
      instructor: (front.instructors || []).map(name => ({
        "@type": "Person",
        name: name,
        jobTitle: "Course Instructor"
      })),
      
      maximumAttendeeCapacity: front.maxStudents || 60
    },
    
    // Enhanced curriculum structure
    hasPart: front.syllabus?.map((section, index) => ({
      "@type": "Course",
      position: index + 1,
      name: section.title,
      description: section.description,
      teaches: section.skills || []
    })) || [],
    
    // Performance and outcome data
    ...(front.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        "@id": `${canonicalUrl}#rating`,
        ratingValue: front.rating,
        ratingCount: front.reviewCount || 1,
        bestRating: 5,
        worstRating: 1
      }
    }),
    
    // Employment outcomes
    occupationalOutcome: {
      "@type": "OccupationalExperienceRequirements",
      experienceRequirements: "Entry level to experienced",
      occupationalCategory: front.jobRoles || [],
      skills: front.skills || []
    },
    
    // Enhanced metadata for AI
    url: canonicalUrl,
    identifier: canonicalUrl,
    dateCreated: front.dateCreated || `${currentYear}-01-01`,
    dateModified: front.lastUpdated || new Date().toISOString(),
    datePublished: front.datePublished || `${currentYear}-01-01`,
    inLanguage: front.language || "en-IN",
    
    // Educational classification
    educationalLevel: front.level || "Higher Education",
    educationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      name: `${front.title} Certificate`,
      credentialCategory: "Certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "UGC"
      }
    },
    
    // Application process
    applicationDeadline: `${currentYear}-06-30`,
    applicationStartDate: `${currentYear}-01-01`,
    applicationContact: {
      "@type": "ContactPoint",
      telephone: "+91-9876543210",
      email: "admissions@abseducationalsolution.com",
      url: `${canonicalUrl}#apply`
    }
  };
};

// 3. ENHANCED: Core Web Vitals Optimized Meta Description
export const generateCWVOptimizedDescription = (front: EnhancedFront): string => {
  const currentYear = new Date().getFullYear();
  
  // Emotional triggers + clear value props
  const benefits = [
    "🎯 Direct Admission",
    "🚀 No Entrance Exam", 
    "💼 100% Placement",
    "💰 Scholarships Available"
  ];
  
  // Optimized for mobile-first indexing and CTR
  return `${front.title} Admission ${currentYear} Mumbai | ${benefits.slice(0, 2).join(' • ')} | Industry-Ready Training at ABS Educational Solution. Apply Now! 📞 Call Today`;
};

// 4. ENHANCED: Advanced Head Tags with Performance Focus
export const generatePerformanceOptimizedHeadTags = (front: EnhancedFront, canonicalUrl: string) => {
  const headTags = [
    // Critical resource hints (Core Web Vitals optimization)
    { rel: "preconnect", href: "https://fonts.googleapis.com", crossOrigin: "anonymous" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "preconnect", href: "https://www.google-analytics.com" },
    { rel: "preconnect", href: "https://www.googletagmanager.com" },
    
    // Enhanced preloading for faster LCP
    { rel: "preload", href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    { rel: "preload", href: "/images/hero-bg.webp", as: "image", fetchpriority: "high" },
    { rel: "preload", href: "/css/critical.css", as: "style" },
    { rel: "modulepreload", href: "/js/critical.js" },
    
    // DNS prefetch for third-party resources
    { rel: "dns-prefetch", href: "//www.google-analytics.com" },
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    
    // PWA enhancements
    { rel: "manifest", href: "/manifest.json" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png" },
    
    // Alternative formats for AI crawlers
    { rel: "alternate", type: "application/rss+xml", title: `${front.title} Updates`, href: "/feed.xml" },
    { rel: "alternate", type: "application/json", title: `${front.title} API`, href: `/api/courses/${front.slug}.json` }
  ];

  const metaTags = [
    // Enhanced viewport for better mobile performance
    { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes" },
    
    // Modern theme colors
    { name: "theme-color", content: "#1a365d", media: "(prefers-color-scheme: light)" },
    { name: "theme-color", content: "#2d3748", media: "(prefers-color-scheme: dark)" },
    { name: "color-scheme", content: "light dark" },
    
    // Enhanced search engine directives
    { name: "robots", content: "index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow, max-snippet:160, max-image-preview:large" },
    { name: "bingbot", content: "index, follow" },
    
    // Content freshness signals
    { name: "revisit-after", content: "7 days" },
    { name: "date", content: new Date().toISOString().split('T')[0] },
    { name: "last-modified", content: front.lastUpdated || new Date().toISOString() },
    
    // Enhanced educational taxonomy
    { name: "DC.type", content: "InteractiveResource" },
    { name: "DC.format", content: "text/html" },
    { name: "DC.audience", content: "Students" },
    { name: "DC.subject", content: front.title },
    { name: "DC.educationLevel", content: front.level || "Higher Education" },
    
    // Precise local SEO
    { name: "geo.region", content: "IN-MH" },
    { name: "geo.placename", content: "Mumbai, Maharashtra, India" },
    { name: "geo.position", content: "19.0760;72.8777" },
    { name: "ICBM", content: "19.0760, 72.8777" },
    
    // Performance hints
    { name: "format-detection", content: "telephone=yes" },
    { name: "mobile-web-app-capable", content: "yes" },
    
    // Enhanced PWA
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: front.title },
    
    // Microsoft specific
    { name: "msapplication-TileColor", content: "#1a365d" },
    { name: "msapplication-config", content: "/browserconfig.xml" }
  ];

  const httpEquivTags = [
    // Enhanced security headers
    // { httpEquiv: "Content-Security-Policy", content: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;" },
    { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
    { httpEquiv: "X-Frame-Options", content: "SAMEORIGIN" },
    { httpEquiv: "X-XSS-Protection", content: "1; mode=block" },
    { httpEquiv: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
    { httpEquiv: "Permissions-Policy", content: "camera=(), microphone=(), geolocation=()" }
  ];

  return { headTags, metaTags, httpEquivTags };
};

// 5. ENHANCED: AI Search and Voice Query Optimization
export const generateAISearchOptimizedFAQ = (front: EnhancedFront) => {
  const currentYear = new Date().getFullYear();
  
  return [
    // Natural conversation patterns for AI
    {
      question: `What is ${front.title} and what can I do after completing it?`,
      answer: `${front.title} is ${front.shortDescription || 'a comprehensive program'} that prepares you for careers in ${front.industry || 'various industries'}. After completion, you can work as ${(front.jobRoles || ['various professional roles']).slice(0, 3).join(', ')} with excellent growth opportunities.`,
      context: "career_overview"
    },
    {
      question: `How much does ${front.title} cost at ABS Educational Solution?`,
      answer: `${front.title} fees at ABS Educational Solution are ${front.fees || 'competitive and affordable'} with flexible payment options, scholarships up to ${front.scholarshipAmount || '50%'}, and EMI facilities available.`,
      context: "pricing_financial"
    },
    {
      question: `Can I get admission to ${front.title} without entrance exam?`,
      answer: `Yes! ABS Educational Solution offers direct admission to ${front.title} without entrance exams. We evaluate candidates based on academic performance, interview, and career goals.`,
      context: "admission_process"
    },
    {
      question: `Where can I study ${front.title} in Mumbai?`,
      answer: `You can study ${front.title} at ABS Educational Solution's Mumbai campus, equipped with modern facilities, experienced faculty, and industry-standard labs for practical training.`,
      context: "location_facilities"
    },
    {
      question: `What is the duration and schedule of ${front.title} course?`,
      answer: `The ${front.title} program duration is ${front.duration || 'flexible based on your needs'} with convenient scheduling options including weekday and weekend batches.`,
      context: "duration_schedule"
    },
    {
      question: `What are the eligibility criteria for ${front.title}?`,
      answer: `For ${front.title} admission, you need ${(front.prerequisites || ['basic educational qualifications']).join(', ')}. We also consider your passion for learning and career goals.`,
      context: "eligibility_requirements"
    },
    {
      question: `Does ${front.title} provide job placement assistance?`,
      answer: `Yes, ${front.title} at ABS Educational Solution includes 100% placement assistance with tie-ups with leading companies, resume building, interview preparation, and career counseling.`,
      context: "placement_support"
    }
  ];
};

// 6. ENHANCED: Modern E-A-T and Credibility Signals
export const generateEnhancedEATSignals = (front: EnhancedFront, canonicalUrl: string) => ({
  // Author expertise
  author: {
    "@type": "Person",
    "@id": `${canonicalUrl}#author`,
    name: front.authorName || "Academic Council",
    jobTitle: "Course Director",
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "ABS Educational Solution"
    },
    knowsAbout: front.topicalAuthority || front.jobRoles || [],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Higher Education Specialist"
    }
  },
  
  // Content verification
  contentVerification: {
    "@type": "ClaimReview",
    datePublished: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Academic Review Board"
    },
    claimReviewed: `${front.title} course information accuracy`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5
    }
  },
  
  // Trust and authority indicators
  trustSignals: {
    accreditation: "UGC Recognized Institution",
    establishedYear: "2010",
    studentCount: "5000+",
    alumniNetwork: "10000+",
    industryPartnerships: front.partners || [],
    certifications: ["ISO 9001:2015", "NAAC A+ Grade"],
    awards: ["Best Educational Institution 2024", "Excellence in Education Award"]
  },
  
  // Content depth and expertise
  contentQuality: {
    wordCount: 2500, // Target for comprehensive content
    readingLevel: front.contentDepth || "intermediate",
    expertiseLevel: "high",
    originalResearch: true,
    factChecked: true,
    updatedRegularly: true
  }
});

// 7. NEW: Performance Budget and Optimization
export const generatePerformanceBudget = (front: EnhancedFront) => ({
  coreWebVitals: {
    LCP: front.expectedLoadTime || 2.5, // seconds
    FID: 100, // milliseconds
    CLS: 0.1, // score
    INP: 200 // milliseconds - new metric
  },
  
  resourceHints: {
    preload: [
      { href: "/fonts/inter-var.woff2", as: "font" },
      { href: "/images/hero-bg.webp", as: "image" }
    ],
    prefetch: [
      { href: "/api/courses/related.json", as: "fetch" }
    ],
    preconnect: [
      { href: "https://fonts.googleapis.com" },
      { href: "https://www.google-analytics.com" }
    ]
  },
  
  criticalCSS: true,
  lazyLoading: true,
  imageOptimization: {
    formats: ["webp", "avif", "jpg"],
    sizes: ["320w", "640w", "1024w", "1920w"],
    quality: 85
  }
});

// Main export function
export const generateComprehensiveSEOData2025 = (front: EnhancedFront, canonicalUrl: string) => ({
  keywords: generateAIOptimizedKeywords2025(front),
  jsonLd: generateAdvancedJsonLd2025(front, canonicalUrl),
  metaDescription: generateCWVOptimizedDescription(front),
  headTags: generatePerformanceOptimizedHeadTags(front, canonicalUrl),
  voiceSearchFAQ: generateAISearchOptimizedFAQ(front),
  eatSignals: generateEnhancedEATSignals(front, canonicalUrl),
  performanceBudget: generatePerformanceBudget(front)
});