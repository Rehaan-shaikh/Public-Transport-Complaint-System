/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb", // or "50mb"
    },
  },
}

export default nextConfig;
