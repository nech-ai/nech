import type { ReactNode } from "react";
import { Nav } from "@/components/nav";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div
			className="fixed inset-0 flex min-h-screen flex-col overflow-hidden bg-black text-white"
			suppressHydrationWarning
		>
			<div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
				<header className="sticky top-0 z-50 border-white/5 border-b">
					<Nav />
				</header>
				<main className="flex-1">{children}</main>
				<footer className="border-gray-800 border-t py-12">
					<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
							<div className="flex items-center space-x-2">
								<img
									src="/logo-inverted.png"
									alt="Nech"
									width={20}
									height={20}
								/>
								<span className="text-gray-400 text-sm">
									© 2024 Nech. All rights reserved.
								</span>
							</div>
							<nav className="flex gap-6">
								<a
									href="/terms"
									className="text-gray-400 text-sm transition-colors hover:text-white"
								>
									Terms
								</a>
								<a
									href="/privacy"
									className="text-gray-400 text-sm transition-colors hover:text-white"
								>
									Privacy
								</a>
								<a
									href="/cookies"
									className="text-gray-400 text-sm transition-colors hover:text-white"
								>
									Cookies
								</a>
							</nav>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
