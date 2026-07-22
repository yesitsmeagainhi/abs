// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');
  const noLayout = ['/pharmacy-dpharm-bpharm'];
  const skipLayout = isAdmin || noLayout.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {/* ---------- Google Analytics (GA4) ---------- */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DTTQGQNGWN"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTTQGQNGWN');
          `,
        }}
      />
      {/* ---------- End Google Analytics ---------- */}

      {/* ---------- Meta Pixel Code ---------- */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
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

      {skipLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
