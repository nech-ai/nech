import "@nech/ui/globals.css";
import { cn } from "@nech/ui/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import PlausibleProvider from "next-plausible";
import { AnalyticsProvider } from "@nech/analytics/client";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: {
		absolute: "Nech - Open Source AI Management Platform for Teams",
		default: "Nech - AI Management Platform for Teams",
		template: "%s | Nech",
	},
	applicationName: "Nech",
	description:
		"Nech is an open-source platform that unifies ChatGPT, Claude, LLaMA, Mistral and other AI models in one secure interface. Built for teams to collaborate, manage and optimise AI workflows.",
	openGraph: {
		title: "Nech - Open Source AI Model Management Platform",
		description:
			"Unify all AI models in one secure, collaborative platform. Manage ChatGPT, Claude, LLaMA, Mistral and more with enterprise-grade security and team features.",
		url: "https://nech.ai",
		siteName: "Nech",
		images: [
			{
				url: "https://nech.ai/opengraph-image.png",
				width: 800,
				height: 600,
				alt: "Nech AI Platform Interface",
			},
		],
		locale: "en_GB",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nech - Open Source AI Model Management Platform",
		description:
			"The open-source platform for teams to manage, collaborate and optimize their AI model usage across ChatGPT, Claude, LLaMA, Mistral and more.",
		images: [
			{
				url: "https://nech.ai/twitter-image.png",
			},
		],
		creator: "@vahaah",
		site: "@nechai_",
	},
	metadataBase: new URL("https://nech.ai"),

	alternates: {
		canonical: "/",
		languages: {
			"en-GB": "/en-gb",
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	authors: [{ name: "Alex Vakhitov" }],
	creator: "Alex Vakhitov",
	publisher: "Alex Vakhitov",
	keywords: [
		"AI platform",
		"ChatGPT management",
		"Claude AI",
		"LLaMA",
		"Mistral AI",
		"team collaboration",
		"AI workflow",
		"enterprise AI",
		"open source AI",
	],
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	other: {
		"twitter:label1": "Open Source",
		"twitter:data1": "Yes",
		"twitter:label2": "Available for",
		"twitter:data2": "Teams & Enterprise",
	},
};

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
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "SoftwareApplication",
							name: "Nech",
							applicationCategory: "BusinessApplication",
							operatingSystem: "Web",
							description:
								"Open-source platform that unifies ChatGPT, Claude, LLaMA, Mistral and other AI models in one secure interface",
							offers: {
								"@type": "Offer",
								price: "0",
								priceCurrency: "USD",
							},
							aggregateRating: {
								"@type": "AggregateRating",
								ratingValue: "5",
								ratingCount: "1",
							},
							url: "https://nech.ai",
							image: "https://nech.ai/icon.png",
							applicationSuite: "AI Management",
							featureList:
								"ChatGPT Integration, Claude Integration, LLaMA Integration, Team Collaboration, Enterprise Security",
							softwareVersion: "1.0",
							author: {
								"@type": "Person",
								name: "Alex Vakhitov",
							},
							provider: {
								"@type": "Organization",
								name: "Nech",
								url: "https://nech.ai",
								sameAs: [
									"https://github.com/nech-ai",
									"https://twitter.com/nechai_",
								],
							},
							category: "AI Tools",
							applicationSubCategory: "Team Collaboration",
							releaseNotes: "https://nech.ai/updates",
						}),
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
