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
    <header className="flex flex-col items-center text-center px-4 pt-14">
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
      <h2>Get Admission in Top Pharmacy & Paramedical Colleges in Mumbai</h2>
      <p>
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
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3c3 9 9 15 18 18l3-3-4-6-5 2c-2-1-5-4-6-6l2-5L5 0 2 3z" />
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
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 4v10m5-5H4" />
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
              className={`w-full flex-shrink-0 transition-transform duration-700 ease-in-out ${
                idx === current ? 'translate-x-0' : idx < current ? '-translate-x-full' : 'translate-x-full'
              } ${idx === current ? 'block' : 'hidden'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={940}
                className="object-cover w-full h-50 md:h-96 rounded-3xl"
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
            className={`w-3 h-3 rounded-full border-2 ${
              idx === current ? 'bg-green-600 border-green-600' : 'bg-white border-gray-400'
            }`}
          />
        ))}
      </div>
    </header>
  );
}
