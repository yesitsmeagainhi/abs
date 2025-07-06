// components/FaqAccordion.tsx

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Item = { q: string; a: string };

export default function FaqAccordion({ items = [] }: { items?: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center mb-10">FAQ</h2>

      {items.map((it, i) => (
        <div key={i} className="border-b">
          <button
            className="flex w-full justify-between py-5 font-medium text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {it.q}
            <span className={`transition ${open === i ? 'rotate-180' : ''}`}>⌄</span>
          </button>

          {open === i && (
            <div className="pb-5 text-slate-600 prose prose-sm">
              <ReactMarkdown>{it.a}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
