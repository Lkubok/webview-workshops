/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable proper error checking during builds
  eslint: {
    dirs: ['app', 'components', 'lib', 'types'],
  },
  typescript: {
    // Only ignore specific build errors if needed, but report them
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    root: '/Users/lukaszkubok/workshops/webview-workshops',
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
