/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // experimental: { esmExternals: true },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bubble-chart',
        permanent: true,
      },
    ]
  },
}
