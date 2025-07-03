import Link from 'next/link';

type Role = { name: string; href: string };
type Props = { heading: string; roles?: Role[] }; // roles now optional

export default function CareerGrid({ heading, roles = [] }: Props) {
  return (
    <section className="bg-white-50 py-16 px-4">
      <h2 className="text-center text-3xl font-semibold mb-12">{heading}</h2>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto">
        {roles.length > 0 ? (
          roles.map((r) => (
            <Link
              key={r.name}
              href={r.href}
              className="block rounded-lg border py-4 px-3 text-center text-slate-700 hover:bg-white hover:shadow transition"
            >
              {r.name}
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No roles available.
          </div>
        )}
      </div>
    </section>
  );
}
