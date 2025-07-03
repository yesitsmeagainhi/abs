import Image from "next/image";

export type HeroProps = {
  template : "hero";
  headline : string;
  subText  : string;
  image    : string;
  ctaLabel?: string;
  ctaLink ?: string;
  align?   : "left" | "right";
};

export default function Hero({
  headline, subText, image, ctaLabel, ctaLink, align = "right",
}: HeroProps) {
  return (
    <header className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* Text */}
      <div className={`flex-1 ${align === "left" ? "md:order-2" : ""}`}>
        <h1 className="text-4xl font-extrabold mb-4 max-w-2xl">{headline}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">{subText}</p>

        {ctaLabel && ctaLink && (
          <a
            href={ctaLink}
            className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-lg"
          >
            {ctaLabel}
          </a>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="flex-1">
          <Image
            src={image}
            alt={headline}
            width={640}
            height={420}
            className="rounded-2xl object-cover w-full h-auto"
            priority
          />
        </div>
      )}
    </header>
  );
}
