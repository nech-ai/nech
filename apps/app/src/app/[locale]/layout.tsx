import { Toaster } from "@nech/ui/components/toaster";
import { cn } from "@nech/ui/utils";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@nech/ui/globals.css";
import { config } from "@config";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
	title: {
		absolute: "Nech.AI",
		default: "Nech.AI",
		template: "%s | Nech.AI",
	},
};

const sansFont = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
});

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)" },
		{ media: "(prefers-color-scheme: dark)" },
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans text-foreground antialiased overflow-hidden",
					sansFont.variable,
				)}
			>
				<NextTopLoader color="var(--colors-primary)" />

				<ThemeProvider
					attribute="class"
					disableTransitionOnChange
					enableSystem
					defaultTheme={config.ui.defaultTheme}
					themes={config.ui.enabledThemes}
				>
					<JotaiProvider>
						<NuqsAdapter>{children}</NuqsAdapter>
					</JotaiProvider>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}
