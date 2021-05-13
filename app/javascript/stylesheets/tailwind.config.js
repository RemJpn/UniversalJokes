module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    width: ['responsive', 'group-hover', 'focus'],
    padding: ['responsive', 'group-hover', 'focus'],
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
