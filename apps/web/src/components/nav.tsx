"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nech/ui/components/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Nav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const href = e.currentTarget.getAttribute("href");

		if (href?.startsWith("#")) {
			const targetId = href.substring(1);
			const element = document.getElementById(targetId);

			if (element) {
				const navHeight = 80;
				const elementPosition =
					element.getBoundingClientRect().top + window.scrollY;
				const offsetPosition = elementPosition - navHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	};

	return (
		<motion.nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-black/80 backdrop-blur-lg border-b border-gray-800" : ""
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<Image src="/logo-inverted.png" alt="Nech" width={32} height={32} />
						<span className="font-semibold text-xl">nech</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="#features"
							onClick={scrollToSection}
							className="text-gray-300 hover:text-white transition-colors"
						>
							Features
						</Link>
						<Link
							href="#pricing"
							onClick={scrollToSection}
							className="text-gray-300 hover:text-white transition-colors"
						>
							Pricing
						</Link>
						<Link
							href="#about"
							onClick={scrollToSection}
							className="text-gray-300 hover:text-white transition-colors"
						>
							About
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							disabled
							className="text-gray-300 hover:text-white hover:bg-white/10"
						>
							Sign in
						</Button>
						<Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity">
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</motion.nav>
	);
}
