// components/blocks/index.ts
// Map a short “type” string → React component

import Hero from './Hero';
import FeaturesGrid from './FeaturesGrid';
import CourseStats from './CourseStats';
import Testimonials from './Testimonials';
import CareerPaths from './CareerPaths';
import CourseOverviewTable from './CourseOverviewTable';
import GalleryCarousel from './GalleryCarousel';
import VideoBlock from './VideoBlock';
import CallToActionBanner from './CallToActionBanner';
import FaqAccordion from './FaqAccordion';
import ContactForm from './ContactForm';
import ScholarshipBanner from './ScholarshipBanner';
import StickyButtons from './StickyButtons';
import BranchInfo from './BranchInfo';
// Add new imports above this line as needed

export const BLOCKS = {
  hero: Hero,
  featuresGrid: FeaturesGrid,
  courseStats: CourseStats,
  testimonials: Testimonials,
  careerPaths: CareerPaths,
  courseOverviewTable: CourseOverviewTable,
  galleryCarousel: GalleryCarousel,
  videoBlock: VideoBlock,
  callToActionBanner: CallToActionBanner,
  faqAccordion: FaqAccordion,
  contactForm: ContactForm,
  scholarshipBanner: ScholarshipBanner,
  stickyButtons: StickyButtons,
  branchInfo: BranchInfo,
  
  // Add new mappings above this line as needed
} as const;

export type BlockType = keyof typeof BLOCKS;
export type BlockData = { type: BlockType; [key: string]: any };
