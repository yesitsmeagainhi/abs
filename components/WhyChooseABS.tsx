// components/WhyChooseABS.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const icons: Record<string, JSX.Element> = {
  check: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>,
  building: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"/></svg>,
  currency: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>,
  briefcase: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/></svg>,
  handshake: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>,
};

export default function WhyChooseABS() {
  // Data for the cards
  const features = [
    { icon: "check", text: "15+ Years Expertise" },
    { icon: "building", text: "100 % PCI-Approved Colleges" },
    { icon: "currency", text: "Low Fees & 0 % EMI" },
    { icon: "briefcase", text: "Placement Opportunities" },
    { icon: "handshake", text: "End-to-End Guidance" },
  ];

  return (
    <section className="bg-[#fafbfc] py-14 px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#20232c] mb-12 tracking-tight">
        Why 12,000+ Students Choose ABS
      </h2>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid max-w-7xl mx-auto lg:grid-cols-5 gap-5 justify-items-center">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-[#ececec] flex flex-col items-center justify-center px-4 py-6 w-full max-w-[200px] h-[140px] transition hover:shadow-md"
            role="region"
            aria-label={f.text}
          >
            <div className="text-blue-600 mb-2 flex items-center justify-center" aria-hidden>
              {icons[f.icon]}
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
          spaceBetween={20}
          slidesPerView={2.5}
          centeredSlides={true}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
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
                <div className="text-blue-600 mb-2 flex items-center justify-center" aria-hidden>
                  {icons[f.icon]}
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