// GalleryCarousel block component
/* A simple snap-scroll carousel (no extra libs) */
export type GalleryProps = {
  template : "gallery";
  heading  : string;
  images   : { image: string; alt?: string }[];
};

export default function GalleryCarousel({ heading, images }: GalleryProps) {
  if (!images?.length) return null;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>

      <div className="flex gap-6 overflow-x-auto px-4 snap-x scroll-pl-4">
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.image}
            alt={img.alt || `Gallery image ${i + 1}`}
            className="h-60 w-auto rounded-2xl snap-center object-cover"
          />
        ))}
      </div>
    </section>
  );
}
