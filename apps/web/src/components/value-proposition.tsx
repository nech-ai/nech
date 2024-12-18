"use client";

import { motion } from "motion/react";
import { Lock, Layers, Share2 } from "lucide-react";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

export function ValueProposition() {
	return (
		<section className="relative py-32">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex flex-col space-y-24"
					initial="initial"
					animate="animate"
					variants={{
						animate: {
							transition: { staggerChildren: 0.2 },
						},
					}}
				>
					{/* Feature 1 */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row items-center gap-12"
						variants={fadeIn}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur">
								<span className="font-mono">Model Management</span>
								<Layers className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								One Platform, Many Models
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Centralise all your language model keys—ChatGPT, Claude, LLaMA,
								Mistral, and others—into a single interface, freeing your team
								from juggling multiple platforms.
							</p>
						</div>
						<div className="flex-1 relative">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
							<div className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur">
								<div className="flex flex-col items-center space-y-4">
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl" />
										<div className="relative h-16 w-16 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
											<Layers className="h-8 w-8 text-purple-400" />
										</div>
									</div>
									<div className="grid grid-cols-3 gap-3">
										{[...Array(6)].map((_, i) => (
											<div
												key={i}
												className="h-16 w-16 rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm
													flex items-center justify-center transform transition-transform hover:scale-105"
											>
												<div className="w-8 h-8 rounded bg-gray-800/50" />
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Feature 2 */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12"
						variants={fadeIn}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400 backdrop-blur">
								<span className="font-mono">Enterprise Security</span>
								<Lock className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								Secure & Compliant
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Advanced encryption and enterprise-grade security keep your
								keys, data, and conversations fully protected, helping you
								maintain trust within your organisation.
							</p>
						</div>
						<div className="flex-1 relative">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
							<div className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur">
								<div className="flex flex-col items-center space-y-4">
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
										<div className="relative h-16 w-16 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
											<Lock className="h-8 w-8 text-blue-400" />
										</div>
									</div>
									<div className="relative w-full h-24 rounded-lg border border-gray-800 bg-black/30 backdrop-blur-sm p-4">
										<div className="flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full bg-green-500" />
											<div className="h-2 w-24 rounded bg-gray-800" />
										</div>
										<div className="mt-3 grid grid-cols-4 gap-2">
											{[...Array(8)].map((_, i) => (
												<div key={i} className="h-2 rounded bg-gray-800/50" />
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Feature 3 */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row items-center gap-12"
						variants={fadeIn}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur">
								<span className="font-mono">Team Collaboration</span>
								<Share2 className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								Seamless Collaboration
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Shared chat histories, projects, and instant role-switching
								ensure that every team member, from interns to executives, can
								contribute insights and best practices effortlessly.
							</p>
						</div>
						<div className="flex-1 relative">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
							<div className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur">
								<div className="flex flex-col items-center space-y-4">
									<div className="relative">
										<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl" />
										<div className="relative h-16 w-16 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
											<Share2 className="h-8 w-8 text-purple-400" />
										</div>
									</div>
									<div className="flex -space-x-3">
										{[...Array(4)].map((_, i) => (
											<div
												key={i}
												className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-900/80
													flex items-center justify-center transform transition-transform hover:translate-y-[-2px]"
											>
												<div className="w-6 h-6 rounded-full bg-gray-800" />
											</div>
										))}
										<div
											className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-900/80
											flex items-center justify-center transform transition-transform hover:translate-y-[-2px]"
										>
											<span className="text-xs text-gray-400">+3</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Background gradients */}
				<div className="absolute top-1/3 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute top-2/3 right-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
			</div>
		</section>
	);
}
