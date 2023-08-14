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
  experimental: {
    modularizeImports: {
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
  },
}
