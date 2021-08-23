const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        fragilebombers: ["bombers"],
      },
      colors: {
        buttonblue: {
          DEFAULT: "#02A8DA",
        },
        headerblue: {
          DEFAULT: "#005FAB",
        },
        bgblue: {
          DEFAULT: "#E3EDF8",
        },
        gridrowblue: {
          DEFAULT: "#98D9F0",
        },
        gridrowbluedark: {
          DEFAULT: "#44b9e4",
        },
        gridrowbluehover: {
          DEFAULT: "#72b0da",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.4xl") },
        h2: { fontSize: theme("fontSize.2xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
