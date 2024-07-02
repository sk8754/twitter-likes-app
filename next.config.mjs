/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    serverActions: false, // Server Actionsを無効にする
  },
};

export default nextConfig;
