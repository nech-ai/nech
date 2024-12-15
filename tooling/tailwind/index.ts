import variablesPlugin from "@mertasan/tailwindcss-variables";
import containerQueryPlugin from "@tailwindcss/container-queries";
import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			boxShadow: {
				sm: "0 2px 8px 0 rgb(0, 0, 0, 0.025), 0 0 1px rgba(0,0,0,0.1)",
				DEFAULT: "0 4px 16px 0 rgb(0, 0, 0, 0.05), 0 0 1px rgba(0,0,0,0.1)",
				md: "0 6px 24px 0 rgb(0, 0, 0, 0.075), 0 0 1px rgba(0,0,0,0.1)",
				lg: "0 8px 32px 0 rgb(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.1)",
				xl: "0 12px 48px 0 rgb(0, 0, 0, 0.125), 0 0 1px rgba(0,0,0,0.1)",
				"2xl": "0 16px 64px 0 rgb(0, 0, 0, 0.15), 0 0 1px rgba(0,0,0,0.1)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				cal: ["var(--font-cal)", ...defaultTheme.fontFamily.sans],
				sans: [
					"-apple-system",
					"var(--font-sans)",
					...defaultTheme.fontFamily.sans,
				],
				heading: ["var(--font-heading)"],
			},
			keyframes: {
				"fade-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"80%": {
						opacity: "0.6",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				"fade-down": {
					"0%": {
						opacity: "0",
						transform: "translateY(-10px)",
					},
					"80%": {
						opacity: "0.6",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.5s",
				"fade-down": "fade-down 0.5s",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			borderColor: {
				DEFAULT: "hsl(var(--border) / <alpha-value>)",
			},
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)",
				},
			},
		},
	},
	plugins: [
		formsPlugin({
			strategy: "base",
		}),
		typographyPlugin,
		animatePlugin,
		containerQueryPlugin,
		variablesPlugin({
			colorVariables: true,
		}),
	],
} satisfies Config;
