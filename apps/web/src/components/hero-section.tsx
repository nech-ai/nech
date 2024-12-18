"use client";

import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";
import { GitHubButton } from "@/components/github-button";
import { Zap } from "lucide-react";
import { useState } from "react";
import { SubscribeModal } from "./subscribe-modal";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

export function HeroSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section className="relative min-h-[90vh] flex items-center pt-32 pb-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex max-w-[720px] flex-col items-start space-y-8"
					initial="initial"
					animate="animate"
					variants={{
						animate: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					<motion.div
						className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur"
						variants={fadeIn}
					>
						<span className="font-mono">Coming Soon: Open Beta</span>
						<Zap className="ml-2 h-4 w-4" />
					</motion.div>

					<motion.h1
						className="font-bold text-5xl tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
						variants={fadeIn}
					>
						All AI models in one place for your team.
					</motion.h1>

					<motion.p
						className="text-gray-400 text-xl leading-relaxed"
						variants={fadeIn}
					>
						Bring every AI model—ChatGPT, Claude, LLaMA, Mistral, and
						beyond—together in one secure, open-source platform. Empower your
						entire organisation to switch models, share insights, and refine
						results as a team, all in real time.
					</motion.p>

					<motion.div className="flex flex-row gap-4 pt-4" variants={fadeIn}>
						<Button
							size="lg"
							className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
							onClick={() => setIsModalOpen(true)}
						>
							Join the Waitlist
						</Button>
						<GitHubButton size="lg">Explore on GitHub</GitHubButton>
					</motion.div>
				</motion.div>

				{/* Animated background gradients */}
				<motion.div
					className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-1/3 right-1/3 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.4, 0.6, 0.4],
					}}
					transition={{
						duration: 6,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			</div>

			<SubscribeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</section>
	);
}
