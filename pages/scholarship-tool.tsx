import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function ScholarshipToolPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.body.style.minHeight = '0';
        doc.documentElement.style.height = 'auto';
        const height = doc.body.scrollHeight;
        iframe.style.height = height + 'px';
      } catch {
        // cross-origin fallback
      }
    };

    iframe.addEventListener('load', syncHeight);
    const poll = setInterval(syncHeight, 300);

    return () => {
      iframe.removeEventListener('load', syncHeight);
      clearInterval(poll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Maharashtra Scholarship Decision Tool — ABS Educational Solution</title>
        <meta
          name="description"
          content="60-second diagnostic to find matching Maharashtra scholarships for SC/ST/OBC/Minority/EWS students. 50+ schemes mapped to your profile — state, central, and private."
        />
      </Head>

      <iframe
        ref={iframeRef}
        src="/scholarship-tool.html"
        title="Maharashtra Scholarship Decision Tool"
        style={{
          width: '100%',
          minHeight: '900px',
          border: 'none',
          display: 'block',
          overflow: 'hidden',
        }}
      />
    </>
  );
}
