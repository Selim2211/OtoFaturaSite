/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e6f0f9',
          100: '#bdd6f0',
          200: '#90b9e5',
          300: '#619cd9',
          400: '#3a85d0',
          500: '#0f6ec8',
          600: '#0c61b3',
          700: '#005B9F',
          800: '#07459a',
          900: '#052e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
