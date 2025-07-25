<<<<<<< HEAD
// components/Layout.tsx
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import Head from 'next/head';

// Import settings from CMS
let settings: any = {};
try {
  settings = require('../content/settings.json');
} catch (error) {
  console.log('Settings file not found');
}
=======
import SiteHeader from './SiteHeader';
import Footer from './Footer';
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
<<<<<<< HEAD
      <Head>
        {/* Inject header scripts from CMS */}
        {settings.headerScripts && (
          <script
            dangerouslySetInnerHTML={{
              __html: settings.headerScripts.replace(/<script[^>]*>|<\/script>/g, '')
            }}
          />
        )}
      </Head>

      {/* Inject body start scripts */}
      {settings.bodyStartScripts && (
        <div
          dangerouslySetInnerHTML={{
            __html: settings.bodyStartScripts
          }}
        />
      )}

      <SiteHeader />
      <main>{children}</main>
      <Footer />

      {/* Inject footer scripts */}
      {settings.footerScripts && (
        <div
          dangerouslySetInnerHTML={{
            __html: settings.footerScripts
          }}
        />
      )}
    </>
  );
}
=======
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
