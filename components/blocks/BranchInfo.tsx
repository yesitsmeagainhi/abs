// BranchInfo block component
export type Branch = { name: string; location: string; phone: string; maps: string };
export type BranchInfoProps = {
  template : "branchInfo";
  heading  : string;
  branches : Branch[];
};

export default function BranchInfo({ heading, branches }: BranchInfoProps) {
  if (!branches?.length) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {branches.map((b, i) => (
            <address
              key={i}
              className="not-italic bg-white rounded-2xl shadow p-6 space-y-2"
            >
              <h3 className="font-semibold text-lg">{b.name}</h3>
              <p className="text-gray-600">{b.location}</p>

              <div className="flex gap-3 pt-2">
                <a
                  href={`tel:${b.phone}`}
                  className="text-blue-600 underline text-sm"
                >
                  Call
                </a>
                <a
                  href={b.maps}
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                >
                  Open Map
                </a>
              </div>
            </address>
          ))}
        </div>
      </div>
    </section>
  );
}
