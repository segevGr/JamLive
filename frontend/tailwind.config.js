/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        primaryDark: "#C2410C",
        primaryLight: "#FDBA74",
        background: "#FFF7ED",
        input: "#FFEEDD",
        textMain: "#1F2937",
        textSubtle: "#7C2D12",
        textOnDark: "#FFFFFF",
        danger: "#DC2626",
        accent: "#FACC15",
        borderGray: "#D6BCA8",
        borderCard: "#E7CBB4",
        hoverCard: "#FFE1BC",
        placeholderGray: "#9CA3AF",
        errorText: "#DC2626",
        green: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
