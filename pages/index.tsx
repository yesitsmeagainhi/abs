// pages/index.tsx

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs/promises';

import JoinUs from '../components/JoinUs';
import Branches from '../components/Branches';
import WhyChooseABS from '../components/WhyChooseABS';
import AlumniMarquee from '../components/AlumniMarquee';
import Hero from '../components/Hero';
import Goals from '../components/Goals';
import StickyButton from '../components/StickyButton';
import ContactForm from '../components/ContactForm';
import Gallery from '../components/Gallery';

import { HeaderSettings } from '../types/navigation';

interface HomeProps {
  headerData: HeaderSettings | null;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>ABS Edu – Home</title>
      </Head>

      {/* Page Content */}
      <Hero />
      <Goals />
      <JoinUs />
      <Gallery />
      <Branches />
      <WhyChooseABS />
      <AlumniMarquee />
      <StickyButton />
      <ContactForm />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/header.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const headerData: HeaderSettings = JSON.parse(fileContents);

    return {
      props: {
        headerData,
      },
    };
  } catch (error) {
    console.error('Error loading header:', error);
    return {
      props: {
        headerData: null,
      },
    };
  }
};
