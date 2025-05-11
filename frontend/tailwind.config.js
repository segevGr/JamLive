/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#176939",
        primaryDark: "#14582f",
        primaryLight: "#1e8a4f",
        background: "#f2fdf6",
        input: "#e3f8ea",
        textMain: "#1a1a1a",
        textMuted: "#4b4b4b",
        textOnDark: "#ffffff",
        danger: "#dc2626",
        gold: "#B4A169",
        borderGray: "#d1d5db",
        placeholderGray: "#6b7280",
        errorText: "#dc2626",
      },
    },
  },
  plugins: [],
};
