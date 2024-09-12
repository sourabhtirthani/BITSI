/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    generateEtags: false,
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
      }
};

// module.exports = {
//     generateEtags: false,
//   }

export default nextConfig;
