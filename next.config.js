/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      // 클라이언트 사이드에서만 필요하지 않은 polyfill을 제거
      config.resolve.alias['@polyfill'] = false;
    }

    // moment.js 로케일 중에 필요한 것만 포함
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko|en/));

    return config;
  },
};

module.exports = nextConfig;
