// components/WhyChooseABS.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function WhyChooseABS() {
  // Data for the cards
  const features = [
    { icon: "✅", text: "15+ Years Expertise" },
    { icon: "🏛️", text: "100 % PCI-Approved Colleges" },
    { icon: "💵", text: "Low Fees & 0 % EMI" },
    { icon: "💼", text: "Placement Opportunities" },
    { icon: "🤝", text: "End-to-End Guidance" },
  ];

  return (
    <section className="bg-[#fafbfc] py-14 px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#20232c] mb-12 tracking-tight">
        Why 12,000+ Students Choose ABS
      </h2>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-[#ececec] flex flex-col items-center justify-center px-4 py-6 w-full max-w-[200px] h-[140px] transition hover:shadow-md"
            role="region"
            aria-label={f.text}
          >
            <div className="text-[2rem] mb-2" aria-hidden>
              {f.icon}
            </div>
            <div className="text-base font-medium text-[#222c38] text-center leading-tight">
              {f.text}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={20} // Space between the slides
          slidesPerView={2.5} // Show 2.5 slides at once, so the next slide is visible
          centeredSlides={true} // Center the active slide
          breakpoints={{
            320: { slidesPerView: 1.2 }, // 1.2 slides on smaller screens
            480: { slidesPerView: 1.5 }, // 1.5 slides for small mobile
            640: { slidesPerView: 2 }, // 2 slides for medium screens
            768: { slidesPerView: 2.5 }, // 2.5 slides for larger mobile screens
          }}
          className="swiper-container"
        >
          {features.map((f, i) => (
            <SwiperSlide key={i}>
              <div
                className="bg-white rounded-2xl shadow-sm border border-[#ececec] flex flex-col items-center justify-center px-4 py-6 w-full h-[140px] transition hover:shadow-md"
                role="region"
                aria-label={f.text}
              >
                <div className="text-[2rem] mb-2" aria-hidden>
                  {f.icon}
                </div>
                <div className="text-sm font-medium text-[#222c38] text-center leading-tight">
                  {f.text}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}