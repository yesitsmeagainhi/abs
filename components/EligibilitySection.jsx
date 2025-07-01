// components/EligibilitySection.jsx
export default function EligibilitySection() {
  return (
    <section className="w-full bg-[#e52429] py-20 flex flex-col items-center text-center">
      <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Want to see if you qualify for<br />these programs?
      </h2>
      <p className="text-white text-lg mb-8 max-w-xl mx-auto">
        Talk to our counselor to check your<br />
        eligibility and know more about our programs.
      </p>
      <a
        href="#eligibility"
        className="inline-block px-7 py-3 rounded-xl bg-white text-[#e52429] font-semibold text-lg shadow hover:bg-gray-100 transition"
      >
        Check your eligibility
      </a>
    </section>
  );
}
