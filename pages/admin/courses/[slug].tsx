import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import AdminLayout from '../../../components/admin/AdminLayout';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) return { redirect: { destination: '/admin/login', permanent: false } };
  return { props: {} };
};

type OverviewItem = { label: string; value: string };
type FaqItem = { question: string; answer: string };
type AccordionItem = { title: string; body: string };
type RoleItem = { name: string; href: string };
type BranchItem = { name: string; location: string; map: string; phone: string; whatsapp: string };

export default function EditCoursePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'overview' | 'faqs' | 'accordions' | 'roles' | 'branches' | 'body'>('basic');

  const [form, setForm] = useState({
    title: '', slug: '', tagline: '', domain: '', eligibility: '', salary: '',
    heroImage: '', heroAlt: '', ctaLabel: '', ctaLink: '', rolesHeading: '', shortDescription: '',
  });
  const [content, setContent] = useState('');
  const [fullFrontmatter, setFullFrontmatter] = useState<Record<string, any>>({});

  // Structured frontmatter sections
  const [overview, setOverview] = useState<OverviewItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [accordions, setAccordions] = useState<AccordionItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/courses/${slug}`);
      if (res.ok) {
        const data = await res.json();
        const fm = data.frontmatter || {};
        setForm({
          title: fm.title || '', slug: fm.slug || '', tagline: fm.tagline || '',
          domain: fm.domain || '', eligibility: fm.eligibility || '', salary: fm.salary || '',
          heroImage: fm.heroImage || '', heroAlt: fm.heroAlt || '',
          ctaLabel: fm.ctaLabel || '', ctaLink: fm.ctaLink || '',
          rolesHeading: fm.rolesHeading || 'Common Job Roles',
          shortDescription: fm.shortDescription || '',
        });
        setContent(data.content || '');
        setFullFrontmatter(fm);
        setOverview(Array.isArray(fm.overview) ? fm.overview : []);
        setFaqs(Array.isArray(fm.faqs) ? fm.faqs : []);
        setAccordions(Array.isArray(fm.detailAccordions) ? fm.detailAccordions : []);
        setRoles(Array.isArray(fm.roles) ? fm.roles : []);
        setBranches(Array.isArray(fm.branches) ? fm.branches : []);
      } else {
        setError('Course not found');
      }
      setLoading(false);
    })();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { setError('Title is required'); return; }

    setSaving(true);
    setError('');
    setSuccess('');

    const frontmatter = {
      ...fullFrontmatter,
      title: form.title, slug: form.slug, tagline: form.tagline, domain: form.domain,
      eligibility: form.eligibility, salary: form.salary, heroImage: form.heroImage,
      heroAlt: form.heroAlt, ctaLabel: form.ctaLabel, ctaLink: form.ctaLink,
      rolesHeading: form.rolesHeading, shortDescription: form.shortDescription,
      overview, faqs, detailAccordions: accordions, roles, branches,
    };

    const res = await fetch(`/api/admin/courses/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frontmatter, content }),
    });

    if (res.ok) {
      setSuccess('Course saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save course');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const tabs = [
    { key: 'basic' as const, label: 'Basic Info' },
    { key: 'overview' as const, label: `Overview (${overview.length})` },
    { key: 'faqs' as const, label: `FAQs (${faqs.length})` },
    { key: 'accordions' as const, label: `Accordions (${accordions.length})` },
    { key: 'roles' as const, label: `Roles (${roles.length})` },
    { key: 'branches' as const, label: `Branches (${branches.length})` },
    { key: 'body' as const, label: 'Body' },
  ];

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/courses')} className="text-gray-500 hover:text-gray-700 text-sm">
              Back to list
            </button>
            <button onClick={handleSubmit} disabled={saving}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">{success}</div>}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition whitespace-nowrap ${
                activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── Basic Info ── */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">Basic Info</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input type="text" name="slug" value={form.slug} onChange={handleChange} className={`${inputClass} font-mono`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                  <input type="text" name="tagline" value={form.tagline} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                    <select name="domain" value={form.domain} onChange={handleChange} className={inputClass}>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="nursing">Nursing</option>
                      <option value="medical">Medical</option>
                      <option value="paramedical">Paramedical</option>
                      <option value="Physiotherapy">Physiotherapy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                    <input type="text" name="eligibility" value={form.eligibility} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                    <input type="text" name="salary" value={form.salary} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                    <input type="text" name="ctaLink" value={form.ctaLink} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">Hero Image</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
                  <input type="text" name="heroImage" value={form.heroImage} onChange={handleChange} className={inputClass} placeholder="/uploads/course-image.png" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                  <input type="text" name="heroAlt" value={form.heroAlt} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* ── Overview Table ── */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Overview Table ({overview.length} rows)</h2>
                <button type="button" onClick={() => setOverview([...overview, { label: '', value: '' }])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Row</button>
              </div>
              {overview.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Row {i + 1}</span>
                    <button type="button" onClick={() => setOverview(overview.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                    <input type="text" value={item.label} className={inputClass}
                      onChange={(e) => { const arr = [...overview]; arr[i] = { ...arr[i], label: e.target.value }; setOverview(arr); }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                    <textarea value={item.value} rows={2} className={inputClass}
                      onChange={(e) => { const arr = [...overview]; arr[i] = { ...arr[i], value: e.target.value }; setOverview(arr); }} />
                  </div>
                </div>
              ))}
              {overview.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                  No overview rows. Click "+ Add Row" to start.
                </div>
              )}
            </div>
          )}

          {/* ── FAQs ── */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">FAQs ({faqs.length})</h2>
                <button type="button" onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add FAQ</button>
              </div>
              {faqs.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">FAQ {i + 1}</span>
                    <button type="button" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                    <input type="text" value={item.question} className={inputClass}
                      onChange={(e) => { const arr = [...faqs]; arr[i] = { ...arr[i], question: e.target.value }; setFaqs(arr); }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                    <textarea value={item.answer} rows={4} className={inputClass}
                      onChange={(e) => { const arr = [...faqs]; arr[i] = { ...arr[i], answer: e.target.value }; setFaqs(arr); }} />
                  </div>
                </div>
              ))}
              {faqs.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                  No FAQs. Click "+ Add FAQ" to start.
                </div>
              )}
            </div>
          )}

          {/* ── Detail Accordions ── */}
          {activeTab === 'accordions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Detail Accordions ({accordions.length})</h2>
                <button type="button" onClick={() => setAccordions([...accordions, { title: '', body: '' }])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Accordion</button>
              </div>
              {accordions.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Accordion {i + 1}</span>
                    <button type="button" onClick={() => setAccordions(accordions.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                    <input type="text" value={item.title} className={inputClass}
                      onChange={(e) => { const arr = [...accordions]; arr[i] = { ...arr[i], title: e.target.value }; setAccordions(arr); }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Body (Markdown)</label>
                    <textarea value={item.body} rows={4} className={inputClass}
                      onChange={(e) => { const arr = [...accordions]; arr[i] = { ...arr[i], body: e.target.value }; setAccordions(arr); }} />
                  </div>
                </div>
              ))}
              {accordions.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                  No accordions. Click "+ Add Accordion" to start.
                </div>
              )}
            </div>
          )}

          {/* ── Roles ── */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Job Roles ({roles.length})</h2>
                <button type="button" onClick={() => setRoles([...roles, { name: '', href: '/blog' }])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Role</button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Section Heading</label>
                  <input type="text" name="rolesHeading" value={form.rolesHeading} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              {roles.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Role Name</label>
                      <input type="text" value={item.name} className={inputClass}
                        onChange={(e) => { const arr = [...roles]; arr[i] = { ...arr[i], name: e.target.value }; setRoles(arr); }} />
                    </div>
                    <div className="w-40">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Link</label>
                      <input type="text" value={item.href} className={inputClass}
                        onChange={(e) => { const arr = [...roles]; arr[i] = { ...arr[i], href: e.target.value }; setRoles(arr); }} />
                    </div>
                    <button type="button" onClick={() => setRoles(roles.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-700 mt-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {roles.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                  No roles. Click "+ Add Role" to start.
                </div>
              )}
            </div>
          )}

          {/* ── Branches ── */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Branches ({branches.length})</h2>
                <button type="button" onClick={() => setBranches([...branches, { name: '', location: '', map: '', phone: '9702836946', whatsapp: '' }])}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Branch</button>
              </div>
              {branches.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Branch {i + 1}</span>
                    <button type="button" onClick={() => setBranches(branches.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                      <input type="text" value={item.name} className={inputClass}
                        onChange={(e) => { const arr = [...branches]; arr[i] = { ...arr[i], name: e.target.value }; setBranches(arr); }} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                      <input type="text" value={item.phone} className={inputClass}
                        onChange={(e) => { const arr = [...branches]; arr[i] = { ...arr[i], phone: e.target.value }; setBranches(arr); }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                    <input type="text" value={item.location} className={inputClass}
                      onChange={(e) => { const arr = [...branches]; arr[i] = { ...arr[i], location: e.target.value }; setBranches(arr); }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Map URL</label>
                      <input type="text" value={item.map} className={inputClass}
                        onChange={(e) => { const arr = [...branches]; arr[i] = { ...arr[i], map: e.target.value }; setBranches(arr); }} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp Link</label>
                      <input type="text" value={item.whatsapp} className={inputClass}
                        onChange={(e) => { const arr = [...branches]; arr[i] = { ...arr[i], whatsapp: e.target.value }; setBranches(arr); }} />
                    </div>
                  </div>
                </div>
              ))}
              {branches.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
                  No branches. Click "+ Add Branch" to start.
                </div>
              )}
            </div>
          )}

          {/* ── Body Content ── */}
          {activeTab === 'body' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Body Content</h2>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={450}
                  preview="live"
                />
              </div>
            </div>
          )}

          {/* Save button at bottom */}
          <div className="flex items-center gap-3 mt-6">
            <button type="submit" disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => router.push('/admin/courses')}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
