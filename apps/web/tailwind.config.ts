import baseConfig from "@nech/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config = {
	content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
	presets: [baseConfig as Partial<Config>],
	theme: {
		extend: {
			animation: {
				marquee: "marquee 25s linear infinite",
				marquee2: "marquee2 25s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
		},
	},
} satisfies Config;

export default config;
