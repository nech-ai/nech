"use client";
import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";

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

export function CTASection() {
	return (
		<section className="relative py-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex flex-col items-center space-y-8 text-center"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2
						className="font-bold text-3xl sm:text-4xl"
						variants={fadeIn}
					>
						Ready to Simplify Your AI Workflow?
					</motion.h2>
					<motion.p
						className="max-w-[600px] text-gray-400 text-xl"
						variants={fadeIn}
					>
						Join the waitlist to be among the first to use Nech and streamline
						your work with ChatGPT, Claude, LLama, Mistral, and more.
					</motion.p>
					<motion.div variants={fadeIn}>
						<Button
							disabled
							size="lg"
							className="bg-white text-black hover:bg-gray-200"
						>
							Join Waitlist
						</Button>
					</motion.div>
				</motion.div>
				<div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
			</div>
		</section>
	);
}
