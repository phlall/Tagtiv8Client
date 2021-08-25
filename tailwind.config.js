const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: () => ({
        "screen/1": "75vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      fontFamily: {
        roboto: ["Roboto"],
        fragilebombers: ["bombers"],
      },
      fontSize: {
        xslg: "0.82rem",
        smlg: "1.0rem",
        xlsm: "1.175rem",
        // xslg: {"font-size: 0.81rem", "line-height: 1.05rem"],
        // smlg: ["font-size: 1.0rem", "line-height: 1.25rem"],
        // xlsm: ["font-size: 1.175rem", "line-height: 1.25rem"],
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
