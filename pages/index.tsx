<<<<<<< HEAD
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
=======
// // pages/index.tsx
// import Head from 'next.head';
// import { GetServerSideProps } from 'next';
// import path from 'path';
// import fs from 'fs/promises';
// import JoinUs from '../components/JoinUs';
// import Branches from '../components/Branches';
// import WhyChooseABS from '../components/WhyChooseABS';
// import AlumniMarquee from '../components/AlumniMarquee';
// import Hero from '../components/Hero';
// import Goals from '../components/Goals';
// import StickyButton from '../components/StickyButton';
// import ContactForm from '../components/ContactForm';
// import Gallery from '../components/Gallery';
// import { HeaderSettings } from '../types/navigation';

// interface HomeProps {
//   headerData: HeaderSettings | null;
// }

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>ABS Edu – Home</title>
//       </Head>
//       {/* Page Content */}
//       <Hero />
//       <Goals />
//       <JoinUs />
//       <Gallery />
//       <Branches />
//       <WhyChooseABS />
//       <AlumniMarquee />
//       <StickyButton />
//       <ContactForm />
//     </>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const filePath = path.join(process.cwd(), 'content/settings/header.json');
//     const fileContents = await fs.readFile(filePath, 'utf8');
//     const headerData: HeaderSettings = JSON.parse(fileContents);
//     return {
//       props: {
//         headerData,
//       },
//     };
//   } catch (error) {
//     console.error('Error loading header:', error);
//     return {
//       props: {
//         headerData: null,
//       },
//     };
//   }
// };

// NEW COMING SOON PAGE
// pages/index.tsx
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set your launch date here
    const launchDate = new Date('2025-12-31T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ABS Edu
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Something amazing is coming soon
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-blue-400">
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base text-gray-300">Days</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">
              {timeLeft.hours}
            </div>
            <div className="text-sm md:text-base text-gray-300">Hours</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-indigo-400">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-gray-300">Minutes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-gray-300">Seconds</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            We're working hard to bring you an amazing educational experience. 
            Get ready for innovative learning solutions and comprehensive educational resources.
          </p>
        </div>

        {/* Email Signup */}
        <div className="max-w-md mx-auto">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
