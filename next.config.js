
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  // Polyfill buffer for client-side
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer/'),
      fs: false,
      path: false,
      os: false,
    };
    return config;
  }
}

module.exports = nextConfig
