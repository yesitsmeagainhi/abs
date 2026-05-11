// components/Hero.tsx
import Image from 'next/image';
import React, { useState } from 'react';

const heroImages = [
  { src: "/uploads/pharmacy college in mumbai.jpeg", alt: "d pharmacy college admission in mumbai" },
  { src: "/uploads/pharmacy college admission in mumbai.jpeg", alt: "d pharmacy college admission in mumbai" },
  // Add more images here if needed
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % heroImages.length);
  const prev = () => setCurrent((c) => (c - 1 + heroImages.length) % heroImages.length);

  /* Touch-swipe support */
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) next();
    else if (touchEndX > touchStartX + 40) prev();
  };

  return (
    <header className="flex flex-col items-center text-center px-4 pt-4">
      {/* Badge */}
      <span className="inline-flex items-center gap-2 bg-green-100 text-sm font-medium text-green-700 py-1.5 px-4 rounded-full mb-6">
        <Image src="/uploads/abs-logo.png" alt="" width={18} height={18} />
        Free Career Counselling
      </span>

      {/* Headings */}
      <h1 className="font-bold text-3xl md:text-6xl leading-tight max-w-3xl">
        <span className="text-green-600">ABS</span> EDUCATIONAL SOLUTION<br />
        Get Paramedical Admission In Mumbai
      </h1>
      <h2 className="text-lg md:text-xl text-gray-600 mt-4 font-medium">
        Get Admission in Top Pharmacy & Paramedical Colleges in Mumbai</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
        Start your journey in D.Pharm, B.Pharm, Nursing, or Allied Health courses with expert
        admission support across Mumbai, Thane, Andheri, Malad, Kurla, Nalasopara &amp; Bhayandar.
      </p>

      {/* CTA buttons (Apply Now removed) */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* Call */}
        <a
          href="tel:9702836946"
          className="flex items-center gap-2 border rounded-lg py-3 px-6 hover:bg-gray-50 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>

          <div className="text-left">
            <p className="font-semibold">Call +91&nbsp;970&nbsp;283&nbsp;6946</p>
            <p className="text-xs text-gray-500">Talk With Counsellor</p>
          </div>
        </a>

        {/* WhatsApp chat */}
        <a
          href="https://wa.me/9702836946?text=I%20visited%20your%20website%20and%20am%20interested%20in%20learning%20more%20about%20the%20courses."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border rounded-lg py-3 px-6 hover:bg-green-100 transition"
        >
          <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.733 5.463 2.017 7.788L0 32l8.4-2.182A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.771 23.771c-.373 1.044-2.16 1.97-2.976 2.096-.76.115-1.713.163-2.76-.175a24.57 24.57 0 0 1-2.556-1.12c-4.511-1.974-7.452-6.555-7.687-6.86-.235-.307-1.84-2.445-1.84-4.665 0-2.219 1.161-3.311 1.574-3.758.412-.447.898-.559 1.198-.559.3 0 .6.003.859.015.28.012.649-.105 1.017.777.374.898 1.274 3.116 1.387 3.344.112.228.186.496.037.803-.149.306-.224.495-.448.763-.224.267-.472.598-.673.803-.224.224-.457.468-.196.915.261.448 1.159 1.915 2.492 3.103 1.713 1.572 3.16 2.063 3.609 2.287.449.224.711.187.973-.112.261-.298 1.119-1.303 1.418-1.749.299-.447.598-.373.998-.224.374.15 2.366 1.118 2.767 1.322.374.19.623.286.711.448.087.162.087.934-.286 1.978z" />
          </svg>

          Chat With Us on WhatsApp
        </a>
      </div>

      {/* Hero carousel */}
      <div className="mt-12 w-full max-w-2xl relative flex items-end justify-center">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition z-10"
        >
          <svg width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20 8l-8 8 8 8" />
          </svg>
        </button>

        {/* Images */}
        <div
          className="overflow-hidden rounded-3xl flex w-full"
          style={{ minHeight: 320 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {heroImages.map((img, idx) => (
            <div
              key={`hero-image-${idx}`}
              className={`w-full flex-shrink-0 transition-transform duration-700 ease-in-out ${idx === current ? 'translate-x-0' : idx < current ? '-translate-x-full' : 'translate-x-full'
                } ${idx === current ? 'block' : 'hidden'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={940}
                className="object-cover w-full h-52 md:h-96 rounded-3xl"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition z-10"
        >
          <svg width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 8l8 8-8 8" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {heroImages.map((_, idx) => (
          <button
            key={`hero-dot-${idx}`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-green-600 border-green-600' : 'bg-white border-gray-400'
              }`}
          />
        ))}
      </div>
    </header>
  );
}
