/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "birthday-pink": "#FFD6E7",
        "birthday-yellow": "#FFF9C4",
        "birthday-blue": "#E3F2FD",
        "birthday-purple": "#F3E5F5",
      },
      fontFamily: {
        comic: ['"Comic Neue"', "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        typewriter: "typewriter 2s steps(11) forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        bounce: "bounce 1s infinite",
        shake: "shake 0.5s ease-in-out",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
