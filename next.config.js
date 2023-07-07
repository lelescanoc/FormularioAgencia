/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const nextConfig = {
  reactStrictMode: true,
}

//module.exports = nextConfig
module.exports = Object.assign({}, withImages(), nextConfig);