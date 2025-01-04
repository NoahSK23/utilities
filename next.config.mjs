/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/utilities',
  assetPrefix: '/utilities',
  skipTrailingSlashRedirects: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
