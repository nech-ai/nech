"use client";

import { motion } from "motion/react";
import { GitHubButton } from "./github-button";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const staggerChildren = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export function OpenSourceSection() {
	return (
		<section id="about" className="relative border-gray-800 border-t py-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.div className="flex flex-col space-y-6" variants={fadeIn}>
						<h2 className="font-bold text-3xl sm:text-4xl">
							Open-Source at Heart
						</h2>
						<p className="text-gray-400 text-xl">
							Nech is born from a community-driven ethos. Inspect the code,
							suggest improvements, and shape the future of your AI workflows
							with a transparent and flexible platform.
						</p>
						<div className="pt-2">
							<GitHubButton size="lg">View on GitHub</GitHubButton>
						</div>
					</motion.div>
				</motion.div>

				{/* Subtle background glow */}
				<div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
				<div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
			</div>
		</section>
	);
}
