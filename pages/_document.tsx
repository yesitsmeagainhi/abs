// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
<<<<<<< HEAD
import { getAnalytics } from '@/lib/settings';   // <-- reads content/settings.json

export default function MyDocument() {
  const analytics = getAnalytics();             // can safely run on the server

  return (
    <Html lang="en">
      <Head>
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
=======

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Netlify Identity Widget - handles invite tokens on any page */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Auto-redirect to /admin after login */}
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
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
<<<<<<< HEAD

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
=======
      </body>
    </Html>
  );
}
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
