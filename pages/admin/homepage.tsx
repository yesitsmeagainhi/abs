import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import AdminLayout from '../../components/admin/AdminLayout';

type Branch = {
  id: number;
  name: string;
  locality: string;
  mapUrl: string;
  aboutUrl: string;
  contactUrl: string;
  whatsappUrl: string;
};

type Alumni = {
  src: string;
  alt: string;
  name: string;
};

type HomepageData = {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    phone: string;
    whatsapp: string;
    images: { src: string; alt: string }[];
  };
  branches: Branch[];
  alumni: Alumni[];
  contactForm: {
    heading: string;
    subheading: string;
    urgencyText: string;
    phone: string;
    whatsapp: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) return { redirect: { destination: '/admin/login', permanent: false } };
  return { props: {} };
};

export default function HomepageEditor() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'branches' | 'alumni' | 'contact'>('hero');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/homepage');
      if (res.ok) setData(await res.json());
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setError('');
    setSuccess('');

    const res = await fetch('/api/admin/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSuccess('Homepage data saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Failed to save');
    }
    setSaving(false);
  };

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const tabs = [
    { key: 'hero' as const, label: 'Hero Section' },
    { key: 'branches' as const, label: 'Branches' },
    { key: 'alumni' as const, label: 'Alumni' },
    { key: 'contact' as const, label: 'Contact Form' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Homepage Editor</h1>
            <p className="text-gray-500 text-sm mt-1">Edit content displayed on the homepage</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">{success}</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Hero Text</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={data.hero.badge}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                <textarea
                  value={data.hero.heading}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, heading: e.target.value } })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                <input
                  type="text"
                  value={data.hero.subheading}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subheading: e.target.value } })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={data.hero.phone}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, phone: e.target.value } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={data.hero.whatsapp}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, whatsapp: e.target.value } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Hero Images</h2>
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      hero: {
                        ...data.hero,
                        images: [...data.hero.images, { src: '', alt: '' }],
                      },
                    })
                  }
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  + Add Image
                </button>
              </div>
              {data.hero.images.map((img, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Image Path</label>
                    <input
                      type="text"
                      value={img.src}
                      onChange={(e) => {
                        const images = [...data.hero.images];
                        images[i] = { ...images[i], src: e.target.value };
                        setData({ ...data, hero: { ...data.hero, images } });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Alt Text</label>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => {
                        const images = [...data.hero.images];
                        images[i] = { ...images[i], alt: e.target.value };
                        setData({ ...data, hero: { ...data.hero, images } });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const images = data.hero.images.filter((_, j) => j !== i);
                      setData({ ...data, hero: { ...data.hero, images } });
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {activeTab === 'branches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Branches ({data.branches.length})</h2>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    branches: [
                      ...data.branches,
                      {
                        id: data.branches.length + 1,
                        name: '',
                        locality: '',
                        mapUrl: '',
                        aboutUrl: '',
                        contactUrl: 'tel:+919702836946',
                        whatsappUrl: '',
                      },
                    ],
                  })
                }
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                + Add Branch
              </button>
            </div>

            {data.branches.map((branch, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 text-sm">Branch {i + 1}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const branches = data.branches.filter((_, j) => j !== i);
                      setData({ ...data, branches });
                    }}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      value={branch.name}
                      onChange={(e) => {
                        const branches = [...data.branches];
                        branches[i] = { ...branches[i], name: e.target.value };
                        setData({ ...data, branches });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">About URL</label>
                    <input
                      type="text"
                      value={branch.aboutUrl}
                      onChange={(e) => {
                        const branches = [...data.branches];
                        branches[i] = { ...branches[i], aboutUrl: e.target.value };
                        setData({ ...data, branches });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    value={branch.locality}
                    onChange={(e) => {
                      const branches = [...data.branches];
                      branches[i] = { ...branches[i], locality: e.target.value };
                      setData({ ...data, branches });
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Map URL</label>
                    <input
                      type="text"
                      value={branch.mapUrl}
                      onChange={(e) => {
                        const branches = [...data.branches];
                        branches[i] = { ...branches[i], mapUrl: e.target.value };
                        setData({ ...data, branches });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Contact URL</label>
                    <input
                      type="text"
                      value={branch.contactUrl}
                      onChange={(e) => {
                        const branches = [...data.branches];
                        branches[i] = { ...branches[i], contactUrl: e.target.value };
                        setData({ ...data, branches });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp URL</label>
                    <input
                      type="text"
                      value={branch.whatsappUrl}
                      onChange={(e) => {
                        const branches = [...data.branches];
                        branches[i] = { ...branches[i], whatsappUrl: e.target.value };
                        setData({ ...data, branches });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alumni */}
        {activeTab === 'alumni' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Alumni ({data.alumni.length})</h2>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    alumni: [...data.alumni, { src: '', alt: '', name: '' }],
                  })
                }
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                + Add Alumni
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600 text-xs">#</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600 text-xs">Name</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600 text-xs">Image Path</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600 text-xs">Alt Text</th>
                    <th className="px-4 py-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.alumni.map((alumnus, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 text-gray-400 text-xs">{i + 1}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={alumnus.name}
                          onChange={(e) => {
                            const alumni = [...data.alumni];
                            alumni[i] = { ...alumni[i], name: e.target.value };
                            setData({ ...data, alumni });
                          }}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={alumnus.src}
                          onChange={(e) => {
                            const alumni = [...data.alumni];
                            alumni[i] = { ...alumni[i], src: e.target.value };
                            setData({ ...data, alumni });
                          }}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-sm font-mono focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={alumnus.alt}
                          onChange={(e) => {
                            const alumni = [...data.alumni];
                            alumni[i] = { ...alumni[i], alt: e.target.value };
                            setData({ ...data, alumni });
                          }}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => {
                            const alumni = data.alumni.filter((_, j) => j !== i);
                            setData({ ...data, alumni });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Contact Form Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                value={data.contactForm.heading}
                onChange={(e) =>
                  setData({ ...data, contactForm: { ...data.contactForm, heading: e.target.value } })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
              <input
                type="text"
                value={data.contactForm.subheading}
                onChange={(e) =>
                  setData({ ...data, contactForm: { ...data.contactForm, subheading: e.target.value } })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Text</label>
              <input
                type="text"
                value={data.contactForm.urgencyText}
                onChange={(e) =>
                  setData({ ...data, contactForm: { ...data.contactForm, urgencyText: e.target.value } })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.contactForm.phone}
                  onChange={(e) =>
                    setData({ ...data, contactForm: { ...data.contactForm, phone: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={data.contactForm.whatsapp}
                  onChange={(e) =>
                    setData({ ...data, contactForm: { ...data.contactForm, whatsapp: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save button at bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
