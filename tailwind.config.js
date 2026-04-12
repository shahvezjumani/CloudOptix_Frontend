/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#8b85ff",
          500: "#6c63ff",
          600: "#5a50e8",
          700: "#4840cc",
        },
        dark: {
          900: "#0a0a0f",
          800: "#0f0f1a",
          700: "#141420",
          600: "#1a1a2e",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        aurora: "aurora 12s ease-in-out infinite",
        gradient: "gradient 6s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-slow": "fadeIn 1.4s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        particle: "particle 20s linear infinite",
        orb: "orb 8s ease-in-out infinite",
        scan: "scan 4s ease-in-out infinite",
        counter: "counter 1s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%", opacity: "0.8" },
          "50%": { backgroundPosition: "100% 50%", opacity: "1" },
          "100%": { backgroundPosition: "0% 50%", opacity: "0.8" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(108,99,255,0.3), 0 0 40px rgba(108,99,255,0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(0,210,255,0.2)",
          },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        particle: {
          "0%": {
            transform: "translateY(100vh) translateX(0) rotate(0deg)",
            opacity: "0",
          },
          "5%": { opacity: "1" },
          "95%": { opacity: "0.8" },
          "100%": {
            transform: "translateY(-5vh) translateX(60px) rotate(360deg)",
            opacity: "0",
          },
        },
        orb: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
      backgroundSize: {
        "200%": "200%",
        "300%": "300%",
        "400%": "400%",
      },
    },
  },
  plugins: [],
};
