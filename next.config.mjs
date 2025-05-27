/** @type {import('next').NextConfig} */
const nextConfig = {
/*     async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: false
            }
        ]
    } */
   env: {
    BACKEND_URI: process.env.BACKEND_URI,
   },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      }
    ],
   }
};

export default nextConfig;
