import { Nav } from "@/components/nav";

export default function UpdatesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col">
			<Nav />
			<main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
				{children}
			</main>
		</div>
	);
}
