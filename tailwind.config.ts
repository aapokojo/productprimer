import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'shippori': ['"Shippori Mincho"', 'serif'],
        'inter': ['Inter', 'serif'],
      },
      colors: {
        'primary-text': '#c99',
        'footer-text': '#422',
      },
      width: {
        '50': '12.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
