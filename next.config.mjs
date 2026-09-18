/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hedera SDK ships prebuilt node-gyp-free artifacts; no special webpack config needed.
  transpilePackages: ["@hashgraph/sdk"],
};

export default nextConfig;
