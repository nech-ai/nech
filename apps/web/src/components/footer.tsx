export function Footer() {
	return (
		<footer className="fixed bottom-8 flex w-full flex-col items-center justify-center space-y-6 font-mono text-xs">
			<span className="text-[#878787]">Featuring</span>

			<div className="relative flex space-x-6 overflow-x-hidden">
				<div className="flex animate-marquee items-center space-x-6 whitespace-nowrap lg:animate-none" />

				<div className="absolute top-0 flex animate-marquee2 items-center space-x-6 whitespace-nowrap lg:hidden" />
			</div>
		</footer>
	);
}
