/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', `${process.env.NEXT_PUBLIC_API_URL}`],
  },
};

export default nextConfig;
