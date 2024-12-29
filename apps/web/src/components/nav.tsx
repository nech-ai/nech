"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@nech/ui/components/button";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SubscribeModal } from "./subscribe-modal";

const navItems: { href: string; label: string }[] = [
	{ href: "/about", label: "About" },
	{ href: "/updates", label: "Updates" },
];

export function Nav() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<motion.div
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/40 backdrop-blur-md"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<nav className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2 z-50">
						<div className="relative h-8 w-8">
							<Image
								src="/logo-inverted.png"
								alt="Nech"
								fill
								className="object-contain"
								priority
							/>
						</div>
						<span className="font-semibold text-xl">nech</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-gray-300 hover:text-white transition-colors relative group"
							>
								{item.label}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full" />
							</Link>
						))}
					</div>

					<div className="hidden md:flex items-center space-x-4">
						<Button
							variant="ghost"
							disabled
							className="text-gray-300 hover:text-white hover:bg-white/10"
						>
							Sign in
						</Button>
						<Button
							className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
							onClick={() => setIsModalOpen(true)}
						>
							Get Started
						</Button>
					</div>

					<button
						type="button"
						className="md:hidden relative z-50 p-2 text-gray-300 hover:text-white"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>
			</nav>

			{mobileMenuOpen && (
				<motion.div
					className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex flex-col items-center justify-center h-full space-y-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-2xl text-gray-300 hover:text-white transition-colors"
							>
								{item.label}
							</Link>
						))}
						<div className="flex flex-col space-y-4 pt-8">
							<Button
								variant="ghost"
								disabled
								className="text-gray-300 hover:text-white hover:bg-white/10"
							>
								Sign in
							</Button>
							<Button
								className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
								onClick={() => setIsModalOpen(true)}
							>
								Get Started
							</Button>
						</div>
					</div>
				</motion.div>
			)}

			<SubscribeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</motion.div>
	);
}
