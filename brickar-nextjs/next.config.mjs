/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bkar-images.s3.ap-south-1.amazonaws.com', // Add your S3 bucket hostname
      'localhost',
    ],
    loader: 'default', // Use Next.js built-in optimization
    path: '/_next/image', // Keep default image path
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
