// CallToActionBanner block component
export type CtaBannerProps = {
  template   : "cta";
  text       : string;
  buttonLabel: string;
  buttonLink : string;
};

export default function CallToActionBanner({ text, buttonLabel, buttonLink }: CtaBannerProps) {
  return (
    <section className="py-12 bg-blue-600 text-white text-center px-4">
      <p className="text-xl font-medium mb-4">{text}</p>
      <a
        href={buttonLink}
        className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg"
      >
        {buttonLabel}
      </a>
    </section>
  );
}
