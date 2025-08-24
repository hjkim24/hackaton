import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // sw: 'firebase-messaging-sw.js',
  // buildExcludes: [/firebase-messaging-sw\.js$/],
});

export default nextConfig;
