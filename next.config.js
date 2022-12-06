/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
