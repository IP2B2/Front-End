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
   allowedDevOrigins: [
    'ismauaic.com',
    'ismauaic.com:3101',
    'localhost:3100',
    'testing.ismauaic.com',
    'testing.ismauaic.com:3101'
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
   crossOrigin: 'anonymous',
   experimental: {
    serverActions: {
      allowedOrigins: [
        'ismauaic.com',
        '*.ismauaic.com',
        'ismauaic.com:3101',
        '*.ismauaic.com:3101'
      ]
    }
   }
};

export default nextConfig;
