// CourseOverviewTable block component
export type Row = { label: string; value: string };
export type CourseOverviewTableProps = {
  template : "courseOverview";
  heading  : string;
  rows     : Row[];
};

export default function CourseOverviewTable({ heading, rows }: CourseOverviewTableProps) {
  if (!rows?.length) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b">
                  <th className="py-3 px-4 font-medium bg-slate-100 w-48">{r.label}</th>
                  <td className="py-3 px-4">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
