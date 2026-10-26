/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: process.env.TAILSCALE_HOST
    ? [process.env.TAILSCALE_HOST]
    : [],
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/utilities' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/utilities' : '',
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
};

export default nextConfig;
