import "@nech/ui/globals.css";
import { cn } from "@nech/ui/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import PlausibleProvider from "next-plausible";
import { AnalyticsProvider } from "@nech/analytics/client";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: {
		absolute: "Nech",
		default: "Nech",
		template: "%s | Nech",
	},
	description: "Nech",
	openGraph: {
		title: "Nech",
		description: "Nech",
		url: "https://nech.ai",
		siteName: "Nech",
		images: [
			{
				url: "https://nech.ai/opengraph-image.png",
				width: 800,
				height: 600,
				alt: "Nech",
			},
		],
		locale: "en_GB",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nech",
		description: "Nech",
		images: [
			{
				url: "https://nech.ai/twitter-image.png",
			},
		],
	},
};

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<PlausibleProvider domain="nech.ai" />
			</head>
			<body
				className={cn(
					"min-h-screen bg-black text-white antialiased",
					GeistSans.className,
				)}
			>
				<div className="relative min-h-screen flex flex-col">
					<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
						<div className="absolute top-1/4 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-purple-500/10 blur-3xl opacity-50" />
						<div className="absolute bottom-1/4 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/10 blur-3xl opacity-50" />
					</div>
					{children}
					<Footer />
				</div>
				<AnalyticsProvider />
			</body>
		</html>
	);
}
