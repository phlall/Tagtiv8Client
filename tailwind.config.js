const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // fontFamily: {
    //   sans: ["FragileBombers"],
    //   serif: ["FragileBombers"],
    //   mono: ["FragileBombers"],
    // },
    extend: {
      height: () => ({
        "screen/1": "75vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      fontFamily: {
        sans: ["FragileBombers", "Roboto", "Helvetica", "Arial", "sans-serif"],
        roboto: ["Roboto"],
      },
      fontSize: {
        navxs: "0.70rem",
        xslg: "0.82rem",
        nav: "0.92rem",
        smlg: "1.0rem",
        xlsm: "1.175rem",
        xl2sm: "1.7rem",
        bomberssm: "2rem",
        bombers: "2.4rem",
        bombersHeading: "2.6rem",
        // xslg: {"font-size: 0.81rem", "line-height: 1.05rem"],
        // smlg: ["font-size: 1.0rem", "line-height: 1.25rem"],
        // xlsm: ["font-size: 1.175rem", "line-height: 1.25rem"],
      },
      colors: {
        buttonblue: {
          DEFAULT: "#02A8DA",
        },
        buttonblueHover: {
          DEFAULT: "#1BBDF5",
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
