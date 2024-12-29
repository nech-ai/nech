import { Nav } from "@/components/nav";

export default function LegalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col">
			<Nav />
			<main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex-1">
				<div className="prose prose-invert prose-gray max-w-none py-24 md:py-32">
					<div className="rounded-lg border border-gray-800 bg-black/50 backdrop-blur-xl p-8">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
