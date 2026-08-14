// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import type { AnalyticsSettings } from '@/lib/settings';

// Use require() so Next.js file tracing bundles this file for serverless.
// Wrapped in try-catch so the document still renders if the file is missing.
let analytics: AnalyticsSettings = {};
try {
  analytics = require('../content/settings.json');
} catch {
  // settings.json not found — continue without CMS scripts
}

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var img = new Image();
            img.onerror = function(){
              var link = document.querySelector('link[rel="icon"]');
              if(link) link.href = '/favicon_fallback.png';
            };
            img.src = '/favicon.png';
          })();
        `}} />

        {/* ---------- Netlify Identity widget ---------- */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

        {/* ---------- CMS-managed <head> scripts ---------- */}
        {analytics?.headerScripts && (
          <script
            dangerouslySetInnerHTML={{ __html: analytics.headerScripts }}
          />
        )}
      </Head>

      <body>
        {/* ---------- CMS-managed <body>-start scripts ---------- */}
        {analytics?.bodyStartScripts && (
          <script
            dangerouslySetInnerHTML={{ __html: analytics.bodyStartScripts }}
          />
        )}

        {/* ---------- Next.js markup ---------- */}
        <Main />
        <NextScript />

        {/* ---------- Netlify Identity auto-redirect ---------- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on('init', user => {
                  if (!user) {
                    window.netlifyIdentity.on('login', () => {
                      document.location.href = '/admin/';
                    });
                  }
                });
              }
            `,
          }}
        />

        {/* ---------- CMS-managed footer / <body>-end scripts ---------- */}
        {analytics?.footerScripts && (
          <script
            dangerouslySetInnerHTML={{ __html: analytics.footerScripts }}
          />
        )}
      </body>
    </Html>
  );
}
