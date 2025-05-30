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
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
    IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET,
   },
   allowedDevOrigins: [
    'ismauaic.com',
   ],
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      }
    ],
   },
   headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://ismauaic.com'
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS'
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization'
        },
      ]
    }
   ],
   experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: [
        'ismauaic.com',
      ]
    }
   },
   compiler: {
    removeConsole: false
   }
};

export default nextConfig;
