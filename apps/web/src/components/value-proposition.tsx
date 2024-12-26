"use client";

import { motion } from "motion/react";
import { Lock, Layers, Share2 } from "lucide-react";

import { OpenAI, Anthropic, Gemini, Mistral, Groq, xAI } from "@nech/ui/icons";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.2, 0.15, 0.25, 1] },
	},
};

const modelVariants = {
	initial: { opacity: 0, scale: 0.95 },
	animate: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			delay: i * 0.1,
			ease: [0.2, 0.15, 0.25, 1],
		},
	}),
	hover: {
		scale: 1.05,
		transition: { duration: 0.2 },
	},
};

// Add model interface for better type safety
interface AIModel {
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const models: AIModel[] = [
	{
		name: "GPT",
		icon: OpenAI,
		color: "text-emerald-400",
	},
	{
		name: "Claude",
		icon: Anthropic,
		color: "text-purple-400",
	},
	{
		name: "xAI",
		icon: xAI,
		color: "text-blue-400",
	},
	{
		name: "Mistral",
		icon: Mistral,
		color: "text-cyan-400",
	},
	{
		name: "Groq",
		icon: Groq,
		color: "text-green-400",
	},
	{
		name: "Gemini",
		icon: Gemini,
		color: "text-yellow-400",
	},
];

export function ValueProposition() {
	return (
		<section className="relative py-32">
			<motion.div
				className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, margin: "-100px" }}
			>
				<div className="flex flex-col space-y-24">
					{/* Model Management */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row items-center gap-12"
						variants={fadeInUp}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
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

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="flex flex-col items-center space-y-8">
									<div className="relative h-20 w-20 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
										<Layers className="h-10 w-10 text-purple-400" />
									</div>

									<div className="grid grid-cols-3 gap-4">
										{models.map((model, i) => {
											const Icon = model.icon;
											return (
												<motion.div
													key={model.name}
													custom={i}
													variants={modelVariants}
													whileHover="hover"
													className="h-16 w-16 rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm
														flex items-center justify-center group cursor-pointer"
												>
													<div className="w-10 h-10 rounded-lg bg-gray-800/50 flex flex-col items-center justify-center gap-1">
														<Icon className={`h-5 w-5 ${model.color}`} />
													</div>
												</motion.div>
											);
										})}
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Security */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12"
						variants={fadeInUp}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
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

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="flex flex-col items-center space-y-8">
									<div className="relative h-20 w-20 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
										<Lock className="h-10 w-10 text-blue-400" />
									</div>

									<div className="w-full space-y-3">
										<div className="relative w-full h-12 rounded-lg border border-gray-800 bg-black/30 backdrop-blur-sm p-3">
											<div className="flex items-center space-x-3">
												<div className="w-2 h-2 rounded-full bg-green-500" />
												<div className="text-xs text-green-400 font-mono">
													Encryption Active
												</div>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Collaboration */}
					<motion.div
						className="flex flex-col-reverse lg:flex-row items-center gap-12"
						variants={fadeInUp}
					>
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
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

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="flex flex-col items-center space-y-8">
									<div className="relative h-20 w-20 rounded-full border border-gray-800 bg-black/80 flex items-center justify-center">
										<Share2 className="h-10 w-10 text-purple-400" />
									</div>

									<div className="flex -space-x-3">
										{[...Array(5)].map((_, i) => (
											<div
												key={i}
												className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-900 flex items-center justify-center"
											>
												<div className="w-6 h-6 rounded-full bg-gray-800" />
											</div>
										))}
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
