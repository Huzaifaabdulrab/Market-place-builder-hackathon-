import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
	 colors: {
        topNavColor: "#1A202C",
        logo: "#3563E9",
        screenBg: "#F6F7F9",
        btnBg: "#3563E9",
        pickUpText: "#90A3BF",
        iconsCard: "#90A3BF",
        sideNav: "#90A3BF",
        lablelTxt: "#90A3BF",
        inputInerText: "#1A202C",
        rotateLine: "#C3D4E966",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "360px", // Extra small devices
        sm: "640px", // Small devices (landscape phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices
        "2xl": "1536px", // 2X extra large devices
		'md-custom': '820px', // Custom breakpoint for 820px
        'lg-custom': '1180px', // Custom breakpoint for 1180px
     
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
