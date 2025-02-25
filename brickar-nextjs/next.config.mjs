/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: process.env.NEXT_PUBLIC_API_URL, // Ensure this variable contains only the hostname
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //   },
    // ],
    // unoptimized: true,
    loader: 'default', // Ensures Next.js uses its built-in optimization
    path: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/_next/image`, // Ensure correct path handling
    domains: [process.env.NEXT_PUBLIC_API_URL, 'localhost'],
  },
  output: undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
