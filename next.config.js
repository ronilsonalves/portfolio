const withNextIntl = require('next-intl/plugin')(
    './lib/i18n.ts',
);
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'c.ronilsonalves.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io'
            }
        ]
    }
}

module.exports = withNextIntl(nextConfig)
