/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Tajawal, monospace',
    },
    extend: {
      colors: {
        forExample: '#FF69B4',
      },
      fontSize: {
        huge: ['20rem', { lineHeight: '1' }],
        tiny: ['0.5rem'],
      },
      height: {
        screen: '100dvh',
      },
    },
  },

  plugins: [],
};
