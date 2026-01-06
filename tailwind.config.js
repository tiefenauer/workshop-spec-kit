/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,tsx}',
    './site/components/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        accent: '#FF6B6B',
        purple: '#7C5CFF',
        light: '#F5F5F5',
        dark: '#1A1A1A',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
  },
  plugins: [],
};

