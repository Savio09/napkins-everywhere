import type { NextConfig } from 'next';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';
const strapiParsed = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiParsed.protocol.replace(':', '') as 'http' | 'https',
        hostname: strapiParsed.hostname,
        port: strapiParsed.port || undefined,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
