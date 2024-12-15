"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nech/ui/components/button";
import { useEffect } from "react";

export function Nav() {
	useEffect(() => {
		const handleSmoothScroll = (e: MouseEvent) => {
			e.preventDefault();
			const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
			if (href?.startsWith("#")) {
				const targetId = href.substring(1);
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					targetElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		};

		const links = document.querySelectorAll('nav a[href^="#"]');
		links.forEach((link) => {
			link.addEventListener("click", handleSmoothScroll as EventListener);
		});

		return () => {
			links.forEach((link) => {
				link.removeEventListener("click", handleSmoothScroll as EventListener);
			});
		};
	}, []);

	return (
		<nav
			className="flex w-full items-center justify-between"
			aria-label="Main navigation"
		>
			<div className="flex items-center space-x-12">
				<Link href="/" className="flex items-center space-x-2">
					<Image src="/logo-inverted.png" alt="Nech" width={24} height={24} />
					<span className="font-medium">nech</span>
				</Link>
				<div className="hidden items-center space-x-8 md:flex">
					<Link
						href="#features"
						className="text-gray-400 text-sm transition-colors hover:text-white"
					>
						Features
					</Link>
					<Link
						href="#why-choose"
						className="text-gray-400 text-sm transition-colors hover:text-white"
					>
						Why Choose
					</Link>
					<Link
						href="#pricing"
						className="text-gray-400 text-sm transition-colors hover:text-white"
					>
						Pricing
					</Link>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<Button
					disabled
					variant="ghost"
					className="text-gray-400 text-sm hover:bg-gray-900 hover:text-white"
				>
					Sign in
				</Button>
				<Button
					disabled
					variant="outline"
					className="border-gray-800 bg-black/50 text-gray-300 backdrop-blur hover:border-gray-700 hover:bg-gray-900 hover:text-white text-sm"
				>
					Get Started
				</Button>
			</div>
		</nav>
	);
}
