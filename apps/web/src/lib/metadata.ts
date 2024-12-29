import type { Metadata } from "next";

interface GenerateMetadataProps {
	title?: string;
	description?: string;
	path?: string;
	ogImage?: string;
	noIndex?: boolean;
}

export function generateMetadata({
	title,
	description,
	path = "",
	ogImage = "/opengraph-image.png",
	noIndex = false,
}: GenerateMetadataProps = {}): Metadata {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nech.ai";

	// Ensure path starts with a slash and normalize it
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const fullUrl = `${baseUrl}${normalizedPath}`;

	const defaultTitle = "Nech - Open Source AI Management Platform for Teams";
	const defaultDescription =
		"Nech is an open-source platform that unifies ChatGPT, Claude, LLaMA, Mistral and other AI models in one secure interface. Built for teams to collaborate, manage and optimise AI workflows.";

	const defaultKeywords = [
		"AI platform",
		"ChatGPT management",
		"Claude AI",
		"LLaMA",
		"Mistral AI",
		"team collaboration",
		"AI workflow",
		"enterprise AI",
		"open source AI",
	];

	return {
		metadataBase: new URL(baseUrl),
		title: {
			absolute: title || defaultTitle,
			default: defaultTitle,
			template: "%s | Nech",
		},
		applicationName: "Nech",

		description: description || defaultDescription,
		alternates: {
			canonical: normalizedPath,
			languages: {
				"en-GB": normalizedPath,
			},
		},
		openGraph: {
			title: title || defaultTitle,
			description: description || defaultDescription,
			url: fullUrl,
			siteName: "Nech",
			images: [
				{
					url: ogImage,
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
			title: title || defaultTitle,
			description: description || defaultDescription,
			images: [{ url: ogImage }],
			creator: "@vahaah",
			site: "@nechai_",
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		authors: [{ name: "Alex Vakhitov" }],
		creator: "Alex Vakhitov",
		publisher: "Alex Vakhitov",
		keywords: defaultKeywords,
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
}

export const jsonLd = {
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
		sameAs: ["https://x.com/vahaah"],
	},
	provider: {
		"@type": "Organization",
		name: "Nech",
		url: "https://nech.ai",
		sameAs: ["https://github.com/nech-ai", "https://x.com/nechai_"],
	},
	category: "AI Tools",
	applicationSubCategory: "Team Collaboration",
	releaseNotes: "https://nech.ai/updates",
};
