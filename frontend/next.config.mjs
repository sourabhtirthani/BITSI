/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'example.com'], // Add 'example.com' here
    },
    generateEtags: false,
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    }
};

export default nextConfig;
