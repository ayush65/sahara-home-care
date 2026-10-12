/** @type {import('next').NextConfig} */

// `connect-src` is deliberately absent: no outbound XHR/fetch is needed from the
// browser. The contact form posts to our own /api/enquiry route (same origin).
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next injects inline bootstrap scripts + inline styles; 'unsafe-inline'
      // is required for both unless every value is nonce-based.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      // Google Maps embed used on /contact.
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  // Types are enforced in CI. `ignoreBuildErrors` was hiding a real error in
  // the root metadata (readonly keywords tuple).
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig