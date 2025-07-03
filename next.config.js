// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  async headers() {
    if (!isProd) return []          // no CSP in dev; keeps HMR painless

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // allow GA / GTM inline & eval + Netlify Identity
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://identity.netlify.com",
              "style-src  'self' 'unsafe-inline'",
              // allow fonts from same site *and* data: URIs
              "font-src   'self' data:",
              "img-src    * data:",
              "connect-src *",
            ].join('; ')
          }
        ]
      }
    ]
  },
  // if you still see 404s from <Image>, you can disable optimisation
  images: {
    unoptimized: true
  }
}