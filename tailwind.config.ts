import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'content-w': '76rem',
      },
    },
    colors: {
      gray: {
        100: '#e1e3e5',
        200: '#c4c7cc',
        300: '#8d9199',
        400: '#7c818a',
        500: '#505359',
        600: '#323438',
        700: '#292b2e',
        800: '#202124',
        900: '#17181a',
        950: '#0e0e0f',
      },
      blue: {
        light: '#528fff',
        mid: '#4a80e5',
        dark: '#3e6bbf',
      },
    },
  },
  plugins: [],
};
export default config;
