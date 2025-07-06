// components/ScholarshipBanner.tsx
type Props = {
  course: string;
  onOpen: () => void;
};

export default function ScholarshipBanner({ course, onOpen }: Props) {
  return (
    <section className="
  relative overflow-hidden
  bg-gradient-to-r from-sky-600 to-sky-500 text-white py-5 px-6 text-center
  w-screen max-w-none left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] translate-x-[0%]
">
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 to-sky-500 text-white py-16 px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Check scholarship eligibility – get up to ₹20 000 for {course}
      </h2>
      <p className="max-w-2xl mx-auto mb-8">
        Scholarships available for a limited time. Many students have already
        claimed their benefit – don’t miss your chance!
      </p>
      <button
        onClick={onOpen}
        className="inline-block bg-white text-sky-700 font-medium rounded-lg py-3 px-8 hover:bg-slate-50"
      >
        Get scholarship details
      </button>
    </section>
    </section>
  );
}
