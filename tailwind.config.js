const colors = require("tailwindcss/colors");

module.exports = {
    purge: {
        content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            purple: {
                100: "#F2E7FE",
                200: "#CCADEB",
                300: "#A984DB",
                400: "#9568CF",
                DEFAULT: "#814BB8",
                600: "#602A93",
                700: "#4B1970",
                800: "#390656",
                900: "#2D004D",
            },
            orange: {
                100: "#FFEACC",
                200: "#FFD694",
                300: "#FFBF66",
                400: "#FFAF4C",
                DEFAULT: "#FFA317",
                600: "#C77800",
                700: "#B25F00",
                800: "#804000",
                900: "#4B2002",
            },
            gray: {
                100: "#EBE9ED",
                200: "#CCC7D1",
                300: "#B2ABBA",
                400: "#998FA3",
                DEFAULT: "#756A81",
                600: "#61576B",
                700: "#4D4554",
                800: "#332E38",
                900: "#1F1C22",
            },
            white: colors.white,
            green: colors.green["600"],
            red: colors.red["600"],
        },
    },
    variants: {},
    plugins: [],
};
