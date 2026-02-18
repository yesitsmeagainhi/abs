// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { getAnalytics } from '@/lib/settings';   // <-- reads content/settings.json

export default function MyDocument() {
  const analytics = getAnalytics();             // can safely run on the server

  return (
    <Html lang="en">
      <Head>
        {/* ---------- Netlify Identity widget ---------- */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

        {/* ---------- Meta Pixel Code ---------- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1268233681838186');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1268233681838186&ev=PageView&noscript=1"
          />
        </noscript>
        {/* ---------- End Meta Pixel Code ---------- */}

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
