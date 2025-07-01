// components/AlumniMarquee.tsx
import React from "react";

const logos = [
  { src: "/uploads/package/1.png", alt: "Cipla" },
  { src: "/uploads/package/2.png", alt: "Apollo" },
  { src: "/uploads/package/3.png", alt: "Sun Pharma" },
  { src: "/uploads/package/4.png", alt: "Pfizer" },
  { src: "/uploads/package/5.png", alt: "Lupin" },
  { src: "/uploads/package/6.png", alt: "Glenmark" },
  { src: "/uploads/package/7.png", alt: "Reliance" },
  { src: "/uploads/package/8.png", alt: "Dr Reddy's" },
  { src: "/uploads/package/9.png", alt: "Biocon" },
  { src: "/uploads/package/10.png", alt: "Novartis" },
];

export default function AlumniMarquee() {
  return (
    <section id="alumni" className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Our Alumni are Making Their Mark
        </h3>
        <div className="overflow-hidden">
          {/* Marquee */}
          <div className="relative flex w-full items-end">
            <div className="marquee flex animate-marquee items-end">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-20  object-contain mx-6 flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Tailwind + custom styles */}
      <style jsx>{`
        .marquee {
          min-width: 100%;
          display: flex;
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
        }
      `}</style>
    </section>
  );
}