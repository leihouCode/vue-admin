module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    fontSize: {
      sm: ['12px', '18px'],
      base: ['14px', '20px'],
      lg: ['16px', '24px'],
    },
  },
}
