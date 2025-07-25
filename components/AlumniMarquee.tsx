// components/AlumniMarquee.tsx
import React from "react";

const alumni = [
  { src: "/uploads/package/1.png", alt: "Alumni 1", name: "John Doe" },
  { src: "/uploads/package/2.png", alt: "Alumni 2", name: "Jane Smith" },
  { src: "/uploads/package/3.png", alt: "Alumni 3", name: "Mike Johnson" },
  { src: "/uploads/package/4.png", alt: "Alumni 4", name: "Sarah Wilson" },
  { src: "/uploads/package/5.png", alt: "Alumni 5", name: "David Brown" },
  { src: "/uploads/package/6.png", alt: "Alumni 6", name: "Lisa Davis" },
  { src: "/uploads/package/7.png", alt: "Alumni 7", name: "Tom Miller" },
  { src: "/uploads/package/8.png", alt: "Alumni 8", name: "Anna Garcia" },
  { src: "/uploads/package/9.png", alt: "Alumni 9", name: "Chris Lee" },
  { src: "/uploads/package/10.png", alt: "Alumni 10", name: "Emma Taylor" },
];

export default function AlumniMarquee() {
  return (
    <section id="alumni" className="py-18 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-12">
          Our Alumni are Making Their Mark
        </h3>
        <div className="overflow-hidden">
          {/* Marquee */}
          <div className="relative flex w-full items-center py-8">
            <div className="marquee flex animate-marquee items-center">
              {[...alumni, ...alumni].map((person, i) => (
                <div
                  key={i}
                  className="alumni-item flex-shrink-0 mx-6"
                >
                  <img
                    src={person.src}
                    alt={person.alt}
                    className="alumni-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Simple approach - no cropping, full image display */}
      <style jsx>{`
        .marquee {
          min-width: 100%;
          display: flex;
          align-items: center;
        }
        
        .alumni-item {
          display: inline-block;
          text-align: center;
        }
        
        .alumni-image {
          /* Fixed width, auto height to maintain aspect ratio */
          width: clamp(120px, 15vw, 180px);
          height: auto;
          min-height: 150px;
          max-height: none;
          
          /* Preserve original image proportions */
          object-fit: contain;
          object-position: center;
          
<<<<<<< HEAD
          /* Styling - removed border-radius and box-shadow that might create white space */
          transition: all 0.3s ease;
          
          /* Ensure full image is visible with completely transparent background */
          display: block;
          background: none;
          background-color: transparent;
          
          /* Remove any potential white borders or outlines */
          border: none;
          outline: none;
          
          /* Blend mode to help with transparency */
          mix-blend-mode: normal;
        }
        
        /* Hover effects - removed box-shadow to avoid white backgrounds */
        .alumni-image:hover {
          transform: translateY(-5px) scale(1.02);
=======
          /* Styling */
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          
          /* Ensure full image is visible */
          display: block;
          background: white;
        }
        
        /* Hover effects */
        .alumni-image:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
        }
        
        @media (prefers-reduced-motion: no-preference) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        }
        
        /* Responsive sizing */
        @media (max-width: 1024px) {
          .alumni-image {
            width: clamp(80px, 10vw, 120px);
          }
          .alumni-item {
            margin: 0 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .alumni-image {
            width: clamp(70px, 15vw, 100px);
          }
          .alumni-item {
            margin: 0 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .alumni-image {
            width: clamp(60px, 18vw, 80px);
          }
          .alumni-item {
            margin: 0 0.75rem;
          }
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
          .marquee {
            overflow-x: auto;
            scrollbar-width: thin;
          }
          .alumni-image:hover {
            transform: none;
          }
        }
        
        .alumni-image:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}