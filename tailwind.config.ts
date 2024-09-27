import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blur: {
        'xsm': '1px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      zIndex: {
        '100': '100',
        '999': '999',
        'max': '2147483647',
      },
      padding: {
        '0.75': '3px',
        '0.5': '2px',
        '0.25': '1px',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'profile-bg': "#292929",
        'dock-icon-pressed-bg': "#8a8a8a",
        'dock-icon-pressed-fg': "#363535",
        'c-darkerr-gray': "#525252",
        'c-darker-gray': "#626262",
        'c-dark-gray': "#898989",
        'c-light-gray': "#adadad",
        'c-light-blue': "#1d6b6e",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
