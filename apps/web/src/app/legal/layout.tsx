import { Nav } from "@/components/nav";

export default function LegalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-black">
			<Nav />
			<main className="container mx-auto max-w-4xl px-4 pt-32 pb-24">
				<div className="prose prose-invert prose-gray max-w-none">
					<div className="rounded-lg border border-gray-800 bg-black/50 backdrop-blur-xl p-8">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
