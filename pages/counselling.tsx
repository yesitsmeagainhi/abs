import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function CounsellingPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        // Override min-height:100vh so scrollHeight reports true content height
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
        <title>Career Counselling Tool — ABS Educational Solution</title>
        <meta
          name="description"
          content="India's most comprehensive career guidance system for 12th Science students. Get personalised course recommendations with a 5-year industry outlook."
        />
      </Head>

      <iframe
        ref={iframeRef}
        src="/counselling-tool.html"
        title="ABS Career Counselling Tool"
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
