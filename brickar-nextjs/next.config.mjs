/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_URL, // Ensure this variable contains only the hostname
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;
