// components/CourseOverviewSection.tsx
import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

/* ── Absolute-safe module resolver ────────────────────────── */
function resolveComponent(mod: unknown, name: string) {
  // #1 direct function? (CJS default export)
  if (typeof mod === 'function') {
    console.info(`[debug] ${name} resolved as function via module itself`);
    return mod as unknown as (...args: any[]) => any;
  }
  // #2 namespace object with .default?
  if (mod && typeof (mod as any).default === 'function') {
    console.info(`[debug] ${name} resolved via .default property`);
    return (mod as any).default;
  }
  console.error(`[debug] ${name} import result`, mod);
  throw new Error(
    `${name} import did not resolve to a React component function.\n` +
      'Check that the package is installed and your bundler supports its module format.'
  );
}

/* ── Imports & resolution ─────────────────────────────────── */
import * as ReactMarkdownImport from 'react-markdown';
import * as RemarkGfmImport from 'remark-gfm';

// pick the correct export no matter what style
const ReactMarkdown = resolveComponent(ReactMarkdownImport, 'react-markdown');
const remarkGfm = resolveComponent(RemarkGfmImport, 'remark-gfm');

/* ── Local types ──────────────────────────────────────────── */
type DetailAccordion = { title: string; body: string };
type CourseOverviewProps = {
  courseName: string;
  overviewTable: { label: string; value: string }[];
  detailAccordions: DetailAccordion[];
};

/* ── Component ────────────────────────────────────────────── */
export default function CourseOverviewSection({
  courseName,
  overviewTable,
  detailAccordions,
}: CourseOverviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i]);

  // Convert newlines to <br> tags and sanitize HTML content
  const processAndSanitizeHTML = (html: string) => {
    // First, convert newlines to <br> tags
    const htmlWithBreaks = html.replace(/\n/g, '<br>');
    
    // Then sanitize the HTML
    return DOMPurify.sanitize(htmlWithBreaks, {
      ALLOWED_TAGS: ['br', 'strong', 'b', 'em', 'i', 'u', 'span', 'p', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
      ALLOWED_URI_REGEXP: /^https?:\/\/|^mailto:|^tel:/
    });
  };

  return (
    <section className="max-w-6xl mx-auto my-10 bg-white rounded-xl shadow">
      {/* Tabs */}
      <div className="flex border-b">
        {(['overview', 'details'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-lg font-semibold transition ${
              activeTab === tab
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-700 border-b-4 border-transparent hover:text-blue-600'
            }`}
          >
            {tab === 'overview' ? `${courseName} Course Overview` : 'Read More'}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="p-6">
        {/* Overview */}
        {activeTab === 'overview' && (
          <table className="w-full text-left">
            <tbody>
              {overviewTable.map((row, index) => (
                <tr key={`${row.label}-${index}`}>
                  <th 
                    className="pr-4 py-2 font-medium text-gray-700 whitespace-nowrap align-top"
                    dangerouslySetInnerHTML={{ __html: processAndSanitizeHTML(row.label) }}
                  />
                  <td 
                    className="py-2 align-top"
                    dangerouslySetInnerHTML={{ __html: processAndSanitizeHTML(row.value) }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Details / Accordion */}
        {activeTab === 'details' && (
          <div>
            {detailAccordions.map((item, i) => (
              <div key={item.title} className="border-b mb-2">
                <button
                  className="w-full flex justify-between py-3 font-semibold text-left"
                  onClick={() => toggle(i)}
                >
                  {item.title}
                  <span
                    className={`transition-transform ${
                      open.includes(i) ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {open.includes(i) && (
                  <div className="pb-3 pl-1 text-gray-600 prose prose-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.body}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}