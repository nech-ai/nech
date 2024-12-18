"use client";

import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

export function CTASection() {
	return (
		<section className="relative py-32">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="relative"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={{
						animate: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					{/* Content Container */}
					<motion.div
						className="relative z-10 flex flex-col items-center text-center"
						variants={fadeIn}
					>
						<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur">
							<span className="font-mono">Limited Time</span>
							<Sparkles className="ml-2 h-4 w-4" />
						</div>

						<h2 className="mt-8 max-w-3xl text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Ready to Transform Your AI Workflow?
						</h2>

						<p className="mt-6 max-w-2xl text-xl text-gray-400">
							Join the waitlist to be among the first to use Nech and streamline
							your work with ChatGPT, Claude, LLama, Mistral, and more.
						</p>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<Button
								size="lg"
								className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
							>
								Join Beta Waitlist
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</motion.div>

					{/* Background Elements */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="absolute h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
						<div className="absolute h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl" />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
