/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail.image.rakuten.co.jp',
      },
      {
        protocol: 'https',
        hostname: 'cover.openbd.jp',
      },
      {
        protocol: 'https',
        hostname: '*.rakuten.co.jp',
      },
      {
        protocol: 'https',
        hostname: '*.r10s.jp',
      },
    ],
  },
}

module.exports = nextConfig
