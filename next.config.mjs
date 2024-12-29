/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [{ source: '/', destination: '/Home', permanent: false }]
  },
}

export default nextConfig
