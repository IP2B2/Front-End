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
   }
};

export default nextConfig;
