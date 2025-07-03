// CareerPaths block component
export type Role = { title: string; icon?: string };
export type CareerPathsProps = {
  template : "careerPaths";
  heading  : string;
  roles    : Role[];
};

export default function CareerPaths({ heading, roles }: CareerPathsProps) {
  if (!roles?.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">{heading}</h2>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {roles.map((r, i) => (
            <div key={i} className="space-y-3">
              {r.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.icon} alt="" className="h-12 mx-auto" aria-hidden />
              )}
              <p className="font-medium">{r.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
