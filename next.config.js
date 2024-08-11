/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = {};

module.exports = withPWA({
  nextConfig,
});
