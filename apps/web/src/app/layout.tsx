import "@nech/ui/globals.css";
import { cn } from "@nech/ui/utils";
import { GeistSans } from "geist/font/sans";
import PlausibleProvider from "next-plausible";
import { AnalyticsProvider } from "@nech/analytics/client";
import { Footer } from "@/components/footer";
import { generateMetadata, jsonLd } from "@/lib/metadata";

export const metadata = generateMetadata();

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#000000" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
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
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: known good
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd),
					}}
				/>
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
