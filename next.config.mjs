/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/utilities',
  // assetPrefix: '/utilities',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
