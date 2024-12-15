"use client";

import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";
import { GitHubButton } from "@/components/github-button";
import { Zap } from "lucide-react";

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

export function HeroSection() {
	return (
		<section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex max-w-[720px] flex-col items-start space-y-8"
					initial="initial"
					animate="animate"
					variants={staggerChildren}
				>
					<motion.div
						className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm backdrop-blur"
						variants={fadeIn}
					>
						<span className="font-mono">Coming Soon: Open Beta</span>
						<Zap className="ml-2 h-4 w-4" />
					</motion.div>
					<motion.h1
						className="font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
						variants={fadeIn}
					>
						Empower Your Team's AI Collaboration
					</motion.h1>
					<motion.p className="text-gray-400 text-xl" variants={fadeIn}>
						Nech: The open-source platform that unites your team's AI efforts.
						Bring your own keys, manage multiple models like ChatGPT, Claude,
						LLama, and Mistral, and streamline your collaborative AI workflow.
					</motion.p>
					<motion.div
						className="flex flex-col gap-4 sm:flex-row"
						variants={fadeIn}
					>
						<Button
							disabled
							size="lg"
							className="bg-white text-black hover:bg-gray-200"
						>
							Join the Waitlist
						</Button>
						<GitHubButton size="lg">Explore on GitHub</GitHubButton>
					</motion.div>
				</motion.div>
				<motion.div
					className="-translate-y-1/2 absolute top-1/2 right-0 h-72 w-72 translate-x-1/2 transform rounded-full bg-white opacity-10 blur-3xl filter"
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
				/>
			</div>
		</section>
	);
}
