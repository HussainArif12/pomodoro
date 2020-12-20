module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      primary: "#3b4252",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
    textColor: {
      primary: "#ebcb8b",

      secondary: "#d8dee9",

      sessionNumber: "#88c0d0",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
