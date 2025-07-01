// next.config.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  async headers() {
    // Only attach CSP in prod
    if (!isProd) return [];

    return [
      {
        source: '/(.*)',          // apply everywhere
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src  'self' 'unsafe-inline'",
              'img-src    * data:',
              'connect-src *',
            ].join('; '),
          },
        ],
      },
    ];
  },
};
