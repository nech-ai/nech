"use client";

import { motion } from "motion/react";
import {
	Share2,
	Shield,
	Users,
	Server,
	MessageSquare,
	Users2,
	BookOpen,
	GitBranch,
	Key,
	Wallet,
	BarChart,
	LayoutDashboard,
	Sparkles,
} from "lucide-react";
import { Github } from "lucide-react";

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
		color: "text-[#D4A27F]",
	},
	{
		name: "xAI",
		icon: xAI,
		color: "text-[#FFFFFF]",
	},
	{
		name: "Mistral",
		icon: Mistral,
		color: "text-[#FF7000]",
	},
	{
		name: "Groq",
		icon: Groq,
		color: "text-[#F55036]",
	},
	{
		name: "Gemini",
		icon: Gemini,
		color: "text-yellow-400",
	},
];

const securityFeatures = [
	{
		name: "Open Source",
		icon: Github,
		color: "bg-purple-500",
		iconColor: "text-purple-400",
		textColor: "text-purple-400",
		description: "Fully auditable, community-driven",
	},
	{
		name: "Self Hostable",
		icon: Server,
		color: "bg-green-500",
		iconColor: "text-green-400",
		textColor: "text-green-400",
		description: "Run on your infrastructure",
	},
	{
		name: "Zero Trust",
		icon: Shield,
		color: "bg-blue-500",
		iconColor: "text-blue-400",
		textColor: "text-blue-400",
		description: "No implicit trust, verify everything",
	},
	{
		name: "Team Control",
		icon: Users,
		color: "bg-yellow-500",
		iconColor: "text-yellow-400",
		textColor: "text-yellow-400",
		description: "Fine-grained permissions",
	},
];

const collaborationFeatures = [
	{
		name: "Shared Context",
		icon: MessageSquare,
		color: "bg-purple-500",
		iconColor: "text-purple-400",
		textColor: "text-purple-400",
		description: "Team-wide chat history & insights",
	},
	{
		name: "Role Switching",
		icon: Users2,
		color: "bg-green-500",
		iconColor: "text-green-400",
		textColor: "text-green-400",
		description: "Switch personas instantly",
	},
	{
		name: "Knowledge Base",
		icon: BookOpen,
		color: "bg-blue-500",
		iconColor: "text-blue-400",
		textColor: "text-blue-400",
		description: "Build shared prompt library",
	},
	{
		name: "Version Control",
		icon: GitBranch,
		color: "bg-yellow-500",
		iconColor: "text-yellow-400",
		textColor: "text-yellow-400",
		description: "Track prompt evolution",
	},
];

const platformFeatures = [
	{
		name: "One Dashboard",
		icon: LayoutDashboard,
		color: "bg-purple-500",
		iconColor: "text-purple-400",
		textColor: "text-purple-400",
		description: "Single interface for all AI needs",
	},
	{
		name: "API Keys",
		icon: Key,
		color: "bg-green-500",
		iconColor: "text-green-400",
		textColor: "text-green-400",
		description: "Bring your own credentials",
	},
	{
		name: "Cost Control",
		icon: Wallet,
		color: "bg-blue-500",
		iconColor: "text-blue-400",
		textColor: "text-blue-400",
		description: "Track usage and spending",
	},
	{
		name: "Analytics",
		icon: BarChart,
		color: "bg-yellow-500",
		iconColor: "text-yellow-400",
		textColor: "text-yellow-400",
		description: "Insights across all models",
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
					{/* 1. Model Support - Start with what users care about most */}
					<motion.div className="flex flex-col-reverse lg:flex-row items-center gap-12">
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
								<span className="font-mono">Model Support</span>
								<Sparkles className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								All Your Favorite Models
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								From ChatGPT to Claude, Mistral to Gemini—use any model you
								want. Switch between them seamlessly while keeping your workflow
								consistent.
							</p>
						</div>

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
									{models.map((model, i) => {
										const Icon = model.icon;
										return (
											<motion.div
												key={model.name}
												custom={i}
												variants={modelVariants}
												whileHover="hover"
												className="aspect-square rounded-xl border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm
													flex items-center justify-center group cursor-pointer
													hover:border-gray-700 transition-colors"
											>
												<div className="flex flex-col items-center gap-3">
													<div className="w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center">
														<Icon className={`h-8 w-8 ${model.color}`} />
													</div>
												</div>
											</motion.div>
										);
									})}
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* 2. Open Source & Security - Build trust early */}
					<motion.div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12">
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
								<span className="font-mono">Open Source</span>
								<Github className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								Open & Secure by Design
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Built with transparency at its core. Self-host for complete
								control, audit every line of code, and keep your API keys
								private with our zero-knowledge architecture.
							</p>
						</div>

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="grid grid-cols-2 gap-4">
									{securityFeatures.map((feature, i) => (
										<motion.div
											key={feature.name}
											custom={i}
											variants={modelVariants}
											whileHover="hover"
											className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm p-4"
										>
											<div className="flex flex-col space-y-3">
												<div
													className={`w-2 h-2 rounded-full ${feature.color}`}
												/>
												<div className="flex items-center space-x-2">
													<feature.icon
														className={`h-4 w-4 ${feature.iconColor}`}
													/>
													<span
														className={`text-sm font-mono ${feature.textColor}`}
													>
														{feature.name}
													</span>
												</div>
												<p className="text-xs text-gray-400">
													{feature.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* 3. Team Collaboration - Show how it helps teams */}
					<motion.div className="flex flex-col-reverse lg:flex-row items-center gap-12">
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
								<span className="font-mono">Team Collaboration</span>
								<Share2 className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								Build Together
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Share prompts, track changes, and build your team's AI knowledge
								base. Collaborate on prompt engineering and share successful
								patterns across your organization.
							</p>
						</div>

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="grid grid-cols-2 gap-4">
									{collaborationFeatures.map((feature, i) => (
										<motion.div
											key={feature.name}
											custom={i}
											variants={modelVariants}
											whileHover="hover"
											className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm p-4"
										>
											<div className="flex flex-col space-y-3">
												<div
													className={`w-2 h-2 rounded-full ${feature.color}`}
												/>
												<div className="flex items-center space-x-2">
													<feature.icon
														className={`h-4 w-4 ${feature.iconColor}`}
													/>
													<span
														className={`text-sm font-mono ${feature.textColor}`}
													>
														{feature.name}
													</span>
												</div>
												<p className="text-xs text-gray-400">
													{feature.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* 4. Platform Features - Close with the complete solution */}
					<motion.div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12">
						<div className="flex-1 space-y-6">
							<div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
								<span className="font-mono">Platform Features</span>
								<LayoutDashboard className="ml-2 h-4 w-4" />
							</div>
							<h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								One Platform, All Features
							</h3>
							<p className="text-gray-400 text-xl leading-relaxed">
								Manage everything in one place—from API keys to usage analytics.
								Get the insights you need to optimize your AI operations.
							</p>
						</div>

						<div className="flex-1">
							<motion.div
								className="relative p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur"
								variants={fadeInUp}
							>
								<div className="grid grid-cols-2 gap-4">
									{platformFeatures.map((feature, i) => (
										<motion.div
											key={feature.name}
											custom={i}
											variants={modelVariants}
											whileHover="hover"
											className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm p-4"
										>
											<div className="flex flex-col space-y-3">
												<div
													className={`w-2 h-2 rounded-full ${feature.color}`}
												/>
												<div className="flex items-center space-x-2">
													<feature.icon
														className={`h-4 w-4 ${feature.iconColor}`}
													/>
													<span
														className={`text-sm font-mono ${feature.textColor}`}
													>
														{feature.name}
													</span>
												</div>
												<p className="text-xs text-gray-400">
													{feature.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
