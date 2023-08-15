/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['covers.openlibrary.org']
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
