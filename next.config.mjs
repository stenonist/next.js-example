/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
	images: {
		domains: ["lh3.googleusercontent.com",'utfs.io'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'utfs.io',
              port: ''
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: ''
            }
          ]
	},
    webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
    }
};

export default nextConfig;
