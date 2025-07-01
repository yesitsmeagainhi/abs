// FaqAccordion block component
export type QA = { question: string; answer: string };
export type FaqProps = {
  template : "faq";
  heading  : string;
  items    : QA[];
};

export default function FaqAccordion({ heading, items }: FaqProps) {
  if (!items?.length) return null;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {items.map((qa, i) => (
          <details key={i} className="border rounded-lg">
            <summary className="cursor-pointer py-3 px-4 font-medium">
              {qa.question}
            </summary>
            <div className="px-4 pb-4 text-gray-700">{qa.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
