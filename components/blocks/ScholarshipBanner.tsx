// ScholarshipBanner block component
export type ScholarshipProps = {
  template : "scholarship";
  heading  : string;
  subText  : string;
  ctaLabel : string;
  ctaLink  : string;
};

export default function ScholarshipBanner({
  heading, subText, ctaLabel, ctaLink,
}: ScholarshipProps) {
  return (
    <section className="py-12 bg-amber-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-2">{heading}</h2>
      <p className="mb-4">{subText}</p>
      <a
        href={ctaLink}
        className="inline-block bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
