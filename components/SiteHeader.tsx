import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type SubItem = { label: string; url: string };
type NavItem = { 
  label: string; 
  url: string; 
  subitems?: SubItem[];
};
type HeaderContent = {
  logo: string;
  announcement?: string;
  nav: NavItem[];
  cta: { label: string; url: string };
};

export default function SiteHeader() {
  const [data, setData] = useState<HeaderContent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/header')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <header className="bg-white sticky top-0 z-50">
      {data.announcement && (
        <div className="bg-yellow-100 text-center text-sm py-1">{data.announcement}</div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <img src={data.logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium relative">
          {data.nav.map((item, i) => (
            <div key={i} className="group relative">
              <Link href={item.url} className="hover:text-blue-600">{item.label}</Link>
              {item.subitems && item.subitems.length > 0 && (
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all z-50">
                  {item.subitems.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.url}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href={data.cta.url} className="bg-blue-600 text-white px-5 py-2 rounded">
            {data.cta.label}
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          {data.nav.map((item, i) => (
            <div key={i}>
              <Link href={item.url} className="block py-2" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
              {item.subitems && item.subitems.length > 0 && (
                <div className="ml-4">
                  {item.subitems.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.url}
                      className="block py-1 text-sm text-gray-600"
                      onClick={() => setOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href={data.cta.url} className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded text-center">
            {data.cta.label}
          </Link>
        </div>
      )}
    </header>
  );
}