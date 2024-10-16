/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GRAPHQL_GITHUB_API_URL: process.env.GRAPHQL_GITHUB_API_URL,
    TOKEN_GITHUB: process.env.TOKEN_GITHUB,
  },
  output: 'export',
};

export default nextConfig;
