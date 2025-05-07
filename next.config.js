
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Define environment variables for client-side
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  webpack: (config) => {
    // Polyfill buffer for client-side
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer/'),
      fs: false,
      path: false,
      os: false,
    };
    
    // Add __dirname polyfill
    config.plugins = [
      ...config.plugins,
    ];
    
    return config;
  }
}

module.exports = nextConfig
