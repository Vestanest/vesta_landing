import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vestanest.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/auth/*',
          '/favorites',
          '/compare',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/private/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/auth/*',
          '/favorites',
          '/compare',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/private/*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/auth/*',
          '/favorites',
          '/compare',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/private/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
