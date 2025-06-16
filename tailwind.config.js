module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        theme: "#F4F4F4", // For light background
        "dark-blue": "#191B34", // For dark theme
        "light-blue": "#2B2D50", // For blue theme
      },
    },
  },
  plugins: [],
};
