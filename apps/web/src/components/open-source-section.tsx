"use client";

import { motion } from "motion/react";
import { GitHubButton } from "./github-button";
import { Code2, Star } from "lucide-react";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

export function OpenSourceSection() {
	return (
		<section id="about" className="relative border-gray-800 border-t py-32">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={{
						animate: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					<motion.div className="flex flex-col space-y-8" variants={fadeIn}>
						<div className="inline-flex items-center self-start rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur">
							<span className="font-mono">Open Source</span>
							<Code2 className="ml-2 h-4 w-4" />
						</div>

						<h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Built in Public,
							<br />
							Powered by Community
						</h2>

						<p className="text-xl text-gray-400 leading-relaxed">
							Nech is born from a community-driven ethos. Inspect the code,
							suggest improvements, and shape the future of your AI workflows
							with a transparent and flexible platform.
						</p>

						<div className="flex flex-row gap-4">
							<GitHubButton size="lg">View on GitHub</GitHubButton>
							<motion.a
								href="https://github.com/nech-ai/nech/stargazers"
								className="inline-flex items-center justify-center rounded-lg border border-gray-800 bg-black/50 px-6 py-3 text-sm font-medium text-gray-300 backdrop-blur hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
								whileHover={{ y: -2 }}
							>
								<Star className="mr-2 h-4 w-4" />
								Star on GitHub
							</motion.a>
						</div>
					</motion.div>

					<motion.div variants={fadeIn} className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
						<div className="relative rounded-2xl border border-gray-800 bg-black/50 p-8 backdrop-blur">
							<div className="mt-8 rounded-xl border border-gray-800 bg-black/50 p-4">
								<div className="flex items-center space-x-3">
									<div className="h-3 w-3 rounded-full bg-red-500" />
									<div className="h-3 w-3 rounded-full bg-yellow-500" />
									<div className="h-3 w-3 rounded-full bg-green-500" />
								</div>
								<div className="mt-4 font-mono text-sm">
									<div className="text-gray-400">
										$ git clone https://github.com/nech-ai/nech.git
									</div>
									<div className="text-gray-400">$ cd nech</div>
									<div className="text-purple-400">$ bun install</div>
									<div className="text-green-400">Ready to contribute! 🚀</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Background gradients */}
				<div className="absolute top-1/3 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute bottom-1/3 right-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
			</div>
		</section>
	);
}
