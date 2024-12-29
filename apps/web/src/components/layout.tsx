import { Nav } from "./nav";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />
			<main className="flex-1 overflow-hidden">{children}</main>
		</>
	);
}
