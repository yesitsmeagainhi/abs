// Testimonials block component
export type Testimonial = { quote: string; name: string; avatar?: string };
export type TestimonialsProps = {
  template : "testimonials";
  heading  : string;
  items    : Testimonial[];
};

export default function Testimonials({ heading, items }: TestimonialsProps) {
  if (!items?.length) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {items.map((t, i) => (
            <figure key={i} className="bg-white shadow rounded-2xl p-6">
              <blockquote className="italic text-gray-700 mb-4">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-3">
                {t.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                )}
                <span className="font-medium">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
