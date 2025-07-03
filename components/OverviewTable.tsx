import React, { useCallback } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export interface Row {
  label: string;
  value: string;
}
interface Props {
  heading?: string;
  rows: Row[];
}

export default function OverviewTable({
  heading = 'Course overview',
  rows,
}: Props) {
  const clean = useCallback((raw: string) => {
    const withBreaks = raw.replace(/(\r\n|\n|\r)/g, '<br>');
    return DOMPurify.sanitize(withBreaks, {
      ALLOWED_TAGS: [
        'br',
        'b',
        'strong',
        'em',
        'i',
        'u',
        'span',
        'p',
        'ul',
        'ol',
        'li',
        'a',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
      ALLOWED_URI_REGEXP: /^(?:https?:\/\/|mailto:|tel:)/i,
    });
  }, []);

  return (
    <>
      <style jsx>{`
        .overview-table {
          table-layout: fixed !important;
          width: 100% !important;
        }
        .overview-table th,
        .overview-table td {
          width: 50% !important;
          max-width: 50% !important;
          word-wrap: break-word;
          white-space: normal;
          vertical-align: top;
        }
        .overview-table th {
          width: 50% !important;
          max-width: 50% !important;
        }
        .overview-table td {
          width: 50% !important;
          max-width: 50% !important;
        }
        @media (max-width: 768px) {
          .overview-table th,
          .overview-table td {
            width: auto !important;
            max-width: none !important;
          }
        }
      `}</style>

      <section className="w-full py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 md:text-2xl">
            {heading}
          </h2>

          {/* --- MOBILE (cards) --- */}
          <div className="block space-y-4 md:hidden">
            {rows.map(({ label, value }, idx) => (
              <article
                key={idx}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                itemScope
                itemType="https://schema.org/TableRow"
              >
                <h3
                  className="border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700"
                  itemProp="about"
                  dangerouslySetInnerHTML={{ __html: clean(label) }}
                />
                <div
                  className="px-4 py-3 text-sm leading-relaxed text-gray-900"
                  itemProp="description"
                  dangerouslySetInnerHTML={{ __html: clean(value) }}
                />
              </article>
            ))}
          </div>

          {/* --- DESKTOP (table) --- */}
          <div className="hidden overflow-x-auto md:block">
            <table
              className="overview-table rounded-lg border border-slate-200 bg-white text-sm shadow-sm"
              itemScope
              itemType="https://schema.org/Table"
            >
              <tbody>
                {rows.map(({ label, value }, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors even:bg-slate-50 hover:bg-slate-50"
                    itemScope
                    itemType="https://schema.org/TableRow"
                  >
                    <th
                      scope="row"
                      className="align-top border-r border-slate-200 bg-slate-100 px-4 py-4 font-medium text-left text-slate-700"
                      itemProp="about"
                      dangerouslySetInnerHTML={{ __html: clean(label) }}
                    />
                    <td
                      className="align-top px-4 py-4 leading-relaxed text-gray-900"
                      itemProp="description"
                      dangerouslySetInnerHTML={{ __html: clean(value) }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
