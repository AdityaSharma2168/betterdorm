/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0f7',
          100: '#e9ddee',
          200: '#d4bde0',
          300: '#b990cb',
          400: '#9d67b2',
          500: '#7D3C98',
          600: '#6a2f85',
          700: '#59246d',
          800: '#461e56',
          900: '#391b46',
          950: '#230d2c',
        },
        secondary: {
          50: '#fdf5ef',
          100: '#fbe8d9',
          200: '#f6cdb3',
          300: '#f1ad85',
          400: '#ec8f5d',
          500: '#E67E22',
          600: '#d4620d',
          700: '#ad4c0c',
          800: '#8d400f',
          900: '#733811',
          950: '#3f1905',
        },
        tertiary: {
          50: '#f3faf6',
          100: '#e1f3e9',
          200: '#c3e6d2',
          300: '#97d2b0',
          400: '#7DCEA0',
          500: '#4ab173',
          600: '#35925c',
          700: '#2d744c',
          800: '#295b3f',
          900: '#234b36',
          950: '#11291e',
        },
        navy: {
          50: '#f0f4f8',
          100: '#dbe4ed',
          200: '#bdcede',
          300: '#93b0c9',
          400: '#648daf',
          500: '#476f93',
          600: '#3a5a7b',
          700: '#334a65',
          800: '#2C3E50',
          900: '#263545',
          950: '#10171f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};