// CourseStats block component
export type Stat = { label?: string; value: string };
export type CourseStatsProps = {
  template : "courseStats";
  headline?: string;
  subText ?: string;
  stats    : Stat[];
};

export default function CourseStats({ headline, subText, stats }: CourseStatsProps) {
  if (!stats?.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {headline && <h2 className="text-3xl font-bold mb-2">{headline}</h2>}
        {subText  && <p  className="text-gray-600 mb-10">{subText}</p>}

        <ul className="flex flex-wrap justify-center gap-8">
          {stats.map((s, i) => (
            <li
              key={i}
              className="w-40 h-24 rounded-2xl bg-blue-50 flex items-center justify-center flex-col p-2"
            >
              <span className="text-xl font-bold text-blue-600 break-words text-center">
                {s.value}
              </span>
              {s.label && (
                <span className="text-[13px] text-gray-500 break-words text-center">
                  {s.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
