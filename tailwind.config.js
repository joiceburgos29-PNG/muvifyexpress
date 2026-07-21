/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#FF9A00',
          'yellow-light': '#FFC107',
          'yellow-dark': '#E68800',
          navy: '#0D1B2A',
          'navy-light': '#1a2d42',
          bg: '#F5F7FA',
        },
      },
      boxShadow: {
        soft: '0 2px 20px rgba(13,27,42,0.08)',
        card: '0 4px 24px rgba(13,27,42,0.10)',
        'card-hover': '0 8px 40px rgba(13,27,42,0.16)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
