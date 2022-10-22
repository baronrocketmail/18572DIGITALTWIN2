/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  async redirects() {
    return [
      {
        source: '/viewlease',
        destination: 'https://storage.googleapis.com/viewlease/ls%20copy.pdf',
        permanent: false,
        basePath: false
      },
    ]
  },
};

