export type FeatureItem = { icon?: string; title: string; description: string };
export type FeaturesGridProps = {
  template : "featuresGrid";
  heading  : string;
  items    : FeatureItem[];
};

export default function FeaturesGrid({ heading, items }: FeaturesGridProps) {
  if (!items?.length) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((f, i) => (
            <article key={i} className="text-center space-y-3">
              {f.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.icon} alt="" className="h-12 mx-auto" aria-hidden />
              )}
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
