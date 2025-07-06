// components/RenderBlocks.tsx – robust mapper for every block

import Hero                from './blocks/Hero';
import CourseStats         from './blocks/CourseStats';
import Testimonials        from './blocks/Testimonials';
import FeaturesGrid        from './blocks/FeaturesGrid';
import CareerPaths         from './blocks/CareerPaths';
import CourseOverviewTable from './blocks/CourseOverviewTable';
import GalleryCarousel     from './blocks/GalleryCarousel';
import VideoBlock          from './blocks/VideoBlock';
import CallToActionBanner  from './blocks/CallToActionBanner';
import FaqAccordion        from './blocks/FaqAccordion';
import ContactForm         from './blocks/ContactForm';
import ScholarshipBanner   from './blocks/ScholarshipBanner';
import StickyButtons       from './blocks/StickyButtons';
import BranchInfo          from './blocks/BranchInfo';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';

/* ───────── types ───────── */
type RawBlock = { template?: string; type?: string } & Record<string, any>;

/* ───────── normalisers ───────── */
function normaliseHero(b: RawBlock) {
  return {
    template: "hero",
    headline: String(b.headline ?? ""),
    subText: String(b.subText ?? b.subtext ?? b.text ?? ""),
    image: String(b.image ?? b.imageUrl ?? ""),
    imageAlt: String(b.imageAlt ?? b.headline ?? ""),
    ctaLabel: b.ctaLabel ? String(b.ctaLabel) : undefined,
    ctaLink: b.ctaLink ? String(b.ctaLink) : undefined,
    align: ["left", "right", "center"].includes(b.align) ? b.align : "center",
  };
}

function normaliseStats(b: RawBlock) {
  const stats: { label: string; value: string }[] =
    Array.isArray(b.stats) && b.stats.length > 0
      ? b.stats.map((s) =>
          typeof s === "object"
            ? {
                label: String(s.label ?? ""),
                value: String(s.value ?? ""),
              }
            : { label: "", value: String(s) }
        )
      : [];

  return {
    template: "course-stats",
    headline: b.headline || "",
    subtext: b.subtext || "",
    stats,
  };
}

function normaliseTestimonials(b: RawBlock) {
  const items = Array.isArray(b.items)
    ? b.items
    : [];

  return {
    template: "testimonials",
    heading: String(b.heading ?? "What our students say"),
    items,
  };
}

function normaliseFeaturesGrid(b: RawBlock) {
  return {
    template: "features-grid",
    heading: String(b.heading ?? ""),
    items: Array.isArray(b.items)
      ? b.items.map((item) => ({
          icon: item.icon ?? "",
          title: item.title ?? "",
          description: item.description ?? "",
        }))
      : [],
  };
}

function normaliseCareerPaths(b: RawBlock) {
  return {
    template: "career-paths",
    heading: String(b.heading ?? ""),
    roles: Array.isArray(b.roles)
      ? b.roles.map((r) => ({
          title: r.title ?? "",
          icon: r.icon ?? "",
        }))
      : [],
  };
}

function normaliseOverviewTable(b: RawBlock) {
  return {
    template: "course-overview",
    heading: String(b.heading ?? ""),
    rows: Array.isArray(b.rows)
      ? b.rows.map((r) => ({
          label: r.label ?? "",
          value: r.value ?? "",
        }))
      : [],
  };
}

function normaliseGallery(b: RawBlock) {
  return {
    template: "gallery-carousel",
    heading: String(b.heading ?? ""),
    images: Array.isArray(b.images)
      ? b.images.map((img) => ({
          image: img.image ?? "",
          alt: img.alt ?? "",
        }))
      : [],
  };
}

function normaliseVideo(b: RawBlock) {
  return {
    template: "video-block",
    heading: String(b.heading ?? ""),
    videoUrl: String(b.videoUrl ?? ""),
  };
}

function normaliseCTA(b: RawBlock) {
  return {
    template: "cta-banner",
    text: String(b.text ?? ""),
    buttonLabel: String(b.buttonLabel ?? ""),
    buttonLink: String(b.buttonLink ?? ""),
  };
}

function normaliseFAQ(b: RawBlock) {
  return {
    template: "faq-accordion",
    heading: String(b.heading ?? "FAQs"),
    items: Array.isArray(b.items)
      ? b.items.map((i) => ({
          question: i.question ?? "",
          answer: i.answer ?? "",
        }))
      : [],
  };
}

function normaliseForm(b: RawBlock) {
  return {
    template: "contact-form",
    headline: String(b.headline ?? ""),
  };
}

function normaliseScholarship(b: RawBlock) {
  return {
    template: "scholarship" as const, // Fix: Use const assertion to make it literal type
    heading: String(b.heading ?? ""),
    subtext: String(b.subtext ?? ""),
    cta: String(b.cta ?? ""),
  };
}

function normaliseSticky(b: RawBlock) {
  return {
    template: "sticky-buttons",
    items: Array.isArray(b.items)
      ? b.items.map((btn) => ({
          type: btn.type ?? "",
          icon: btn.icon ?? "",
          link: btn.link ?? "",
        }))
      : [],
  };
}

function normaliseBranches(b: RawBlock) {
  return {
    template: "branch-info",
    branches: Array.isArray(b.branches)
      ? b.branches.map((br) => ({
          name: br.name ?? "",
          location: br.location ?? "",
          phone: br.phone ?? "",
          maps: br.maps ?? "",
        }))
      : [],
  };
}

/* ---------- MAIN RENDERER ---------- */
export default function RenderBlocks({ blocks = [] as RawBlock[] }) {
  return (
    <>
      {blocks.map((blk, i) => {
        const id = String(blk.template ?? blk.type ?? '').toLowerCase();

        switch (id) {
          /* ── HERO ─────────────────────────────────────────────── */
          case 'hero': {
            const props = normaliseHero(blk) as Parameters<typeof Hero>[0];
            return <Hero key={i} {...props} />;
          }

          /* ── COURSE-STATS ─────────────────────────────────────── */
          case 'course-stats':
          case 'coursestats': {
            const props = normaliseStats(blk) as Parameters<typeof CourseStats>[0];
            return <CourseStats key={i} {...props} />;
          }

          /* ── TESTIMONIALS ─────────────────────────────────────── */
          case 'testimonials': {
            const props = normaliseTestimonials(blk) as Parameters<typeof Testimonials>[0];
            return <Testimonials key={i} {...props} />;
          }

          /* ── FEATURES GRID ────────────────────────────────────── */
          case 'features-grid':
          case 'featuresgrid': {
            const props = normaliseFeaturesGrid(blk) as Parameters<typeof FeaturesGrid>[0];
            return <FeaturesGrid key={i} {...props} />;
          }

          /* ── CAREER PATHS ─────────────────────────────────────── */
          case 'career-paths':
          case 'careerpaths': {
            const props = normaliseCareerPaths(blk) as Parameters<typeof CareerPaths>[0];
            return <CareerPaths key={i} {...props} />;
          }

          /* ── COURSE OVERVIEW ──────────────────────────────────── */
          case 'course-overview':
          case 'courseoverview':
          case 'courseoverviewtable': {
            const props = normaliseOverviewTable(blk) as Parameters<typeof CourseOverviewTable>[0];
            return <CourseOverviewTable key={i} {...props} />;
          }

          /* ── GALLERY ──────────────────────────────────────────── */
          case 'gallery-carousel':
          case 'gallerycarousel': {
            const props = normaliseGallery(blk) as Parameters<typeof GalleryCarousel>[0];
            return <GalleryCarousel key={i} {...props} />;
          }

          /* ── VIDEO BLOCK ──────────────────────────────────────── */
          case 'video-block':
          case 'videoblock': {
            const props = normaliseVideo(blk) as Parameters<typeof VideoBlock>[0];
            return <VideoBlock key={i} {...props} />;
          }

          /* ── CTA BANNER ───────────────────────────────────────── */
          case 'cta-banner':
          case 'ctabanner': {
            const props = normaliseCTA(blk) as Parameters<typeof CallToActionBanner>[0];
            return <CallToActionBanner key={i} {...props} />;
          }

          /* ── FAQ ACCORDION ───────────────────────────────────── */
          case 'faq-accordion':
          case 'faqaccordion': {
            const props = normaliseFAQ(blk) as Parameters<typeof FaqAccordion>[0];
            return <FaqAccordion key={i} {...props} />;
          }

          /* ── CONTACT FORM ────────────────────────────────────── */
          case 'contact-form':
          case 'contactform': {
            const props = normaliseForm(blk) as Parameters<typeof ContactForm>[0];
            return <ContactForm key={i} {...props} />;
          }

          /* ── SCHOLARSHIP BANNER ─────────────────────────────── */
          case 'scholarship-banner':
          case 'scholarshipbanner': {
            const base = normaliseScholarship(blk);
            
            const props = {
              heading: base.heading,
              subText: String(blk.subText ?? blk.subtext ?? ''),
              ctaLabel: String(blk.ctaLabel ?? base.cta ?? 'Apply now'),
              ctaLink: String(blk.ctaLink ?? '#'),
            };

            return <ScholarshipBanner key={i} {...(props as any)} />;
          }

          /* ── STICKY BUTTONS ─────────────────────────────────── */
          case 'sticky-buttons':
          case 'stickybuttons': {
            const base = normaliseSticky(blk);

            const props = {
              items: base.items || [],
            };

            return <StickyButtons key={i} {...(props as any)} />;
          }

          /* ── BRANCH INFO ──────────────────────────────────────── */
          case 'branch-info':
          case 'branchinfo': {
            const props = normaliseBranches(blk) as Parameters<typeof BranchInfo>[0];
            return <BranchInfo key={i} {...props} />;
          }

          /* ── FALLBACK ─────────────────────────────────────────── */
          default:
            return (
              <pre key={i} className="my-12 bg-rose-100 text-xs p-4 rounded">
                Unknown block: {JSON.stringify(blk, null, 2)}
              </pre>
            );
        }
      })}
    </>
  );
}