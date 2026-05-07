// components/Footer.tsx
import React, { useEffect, useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';
import Modal  from './Modal';

/* ─────────── interface now includes every field we render ─────────── */
interface FooterData {
  banner_heading:   string;
  banner_subheading:string;
  button_text:      string;

  whatsapp_link: string;
  phone_link:    string;
  phone_display: string;
  email:         string;

  quick_links: { text: string; url: string }[];
  resources:   { text: string; url: string }[];

  logo?:       string;   // ← added
  about_text?: string;   // ← added
}

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footerData, setFooterData]   = useState<FooterData | null>(null);

  /* fetch JSON once on mount */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/footer');
        const data = await res.json();
        setFooterData(data);
      } catch (err) {
        console.error('Failed to load footer data:', err);
      }
    })();
  }, []);

  if (!footerData) return null;         // still loading

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <footer className="bg-gray-50 text-gray-700 pt-16 border-t">
      {/* ── CTA banner ── */}
      <div className="bg-gradient-to-b from-[#004e92] to-[#000428] text-white py-16 text-center">
        <h2 className="text-xl md:text-2xl font-semibold">
          {footerData.banner_heading}
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          {footerData.banner_subheading}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          {footerData.button_text}
        </button>
      </div>

      {/* ── Footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
        <div>
          {footerData.logo && (
            <Image
              src={footerData.logo}
              alt="ABS Edu"
              width={256}
              height={256}
              className="h-14 w-auto mb-4"
            />
          )}
          {footerData.about_text && (
            <p className="text-sm">{footerData.about_text}</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {footerData.quick_links.map((l, i) => (
              <li key={i}>
                <Link href={l.url}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            {footerData.resources.map((l, i) => (
              <li key={i}>
                <Link href={l.url}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm">
            <li>📞 {footerData.phone_display}</li>
            <li>✉️ {footerData.email}</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4 pb-4">
        © {new Date().getFullYear()} ABS Educational Solution. All rights reserved.
      </div>

      {/* ── Modal ── */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Connect with an Expert
        </h2>
        <p className="text-center">
          We&apos;re just a call or message away to assist you with your admission process.
        </p>

        <div className="flex flex-col items-center space-y-4 mt-6">
          <a
            href={footerData.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            💬 Chat on WhatsApp
          </a>
          <a
            href={footerData.phone_link}
            className="w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            📞 Call Now
          </a>
        </div>
      </Modal>
    </footer>
  );
}
