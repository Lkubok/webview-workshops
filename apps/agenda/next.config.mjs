/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable proper error checking during builds
  eslint: {
    dirs: ['app', 'components', 'lib', 'types'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig