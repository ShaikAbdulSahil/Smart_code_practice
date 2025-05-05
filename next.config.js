
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Define environment variables for client-side
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  }
}

module.exports = nextConfig
