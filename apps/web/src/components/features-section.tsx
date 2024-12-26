"use client";

import { motion } from "motion/react";
import {
	Zap,
	Cpu,
	Workflow,
	History,
	Bot,
	Keyboard,
	Terminal,
	Code2,
} from "lucide-react";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.2, 0.15, 0.25, 1] },
	},
};

const featureVariants = {
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
		scale: 1.02,
		transition: { duration: 0.2 },
	},
};

const features = [
	{
		name: "Smart Context",
		icon: Bot,
		color: "bg-purple-500",
		iconColor: "text-purple-400",
		textColor: "text-purple-400",
		description:
			"AI remembers previous conversations and adapts responses accordingly",
	},
	{
		name: "Prompt Library",
		icon: Terminal,
		color: "bg-blue-500",
		iconColor: "text-blue-400",
		textColor: "text-blue-400",
		description: "Save and reuse successful prompts across your organization",
	},
	{
		name: "Command Mode",
		icon: Keyboard,
		color: "bg-green-500",
		iconColor: "text-green-400",
		textColor: "text-green-400",
		description: "Power user shortcuts for rapid model and context switching",
	},
	{
		name: "Chat History",
		icon: History,
		color: "bg-yellow-500",
		iconColor: "text-yellow-400",
		textColor: "text-yellow-400",
		description:
			"Search and reference past conversations with advanced filtering",
	},
	{
		name: "Custom Workflows",
		icon: Workflow,
		color: "bg-red-500",
		iconColor: "text-red-400",
		textColor: "text-red-400",
		description: "Create automated sequences for repetitive AI interactions",
	},
	{
		name: "API Access",
		icon: Code2,
		color: "bg-indigo-500",
		iconColor: "text-indigo-400",
		textColor: "text-indigo-400",
		description: "Integrate AI capabilities directly into your applications",
	},
	{
		name: "Fast Response",
		icon: Zap,
		color: "bg-orange-500",
		iconColor: "text-orange-400",
		textColor: "text-orange-400",
		description: "Optimized for speed with parallel request processing",
	},
	{
		name: "Model Fine-tuning",
		icon: Cpu,
		color: "bg-pink-500",
		iconColor: "text-pink-400",
		textColor: "text-pink-400",
		description: "Customize model behavior for your specific use cases",
	},
];

export function FeaturesSection() {
	return (
		<section className="relative py-32">
			<motion.div
				className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, margin: "-100px" }}
			>
				<motion.div
					className="flex flex-col items-center space-y-12"
					variants={fadeIn}
				>
					<div className="text-center space-y-6 max-w-3xl">
						<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
							<span className="font-mono">Advanced Features</span>
							<Cpu className="ml-2 h-4 w-4" />
						</div>
						<h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Powerful Tools for AI Teams
						</h2>
						<p className="text-xl text-gray-400">
							Everything you need to manage, optimize, and scale your AI
							operations. Built for teams that demand more from their AI tools.
						</p>
					</div>

					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature, i) => (
							<motion.div
								key={feature.name}
								custom={i}
								variants={featureVariants}
								whileHover="hover"
								className="relative rounded-xl border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm p-6
									hover:border-gray-700 transition-colors"
							>
								<div className="flex flex-col space-y-4">
									<div className={`w-2 h-2 rounded-full ${feature.color}`} />
									<div className="flex items-center space-x-3">
										<feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
										<h3
											className={`text-lg font-semibold ${feature.textColor}`}
										>
											{feature.name}
										</h3>
									</div>
									<p className="text-sm text-gray-400 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</motion.div>

			{/* Background gradients */}
			<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
				<div className="absolute top-1/4 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-purple-500/10 blur-3xl opacity-50" />
				<div className="absolute bottom-1/4 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/10 blur-3xl opacity-50" />
			</div>
		</section>
	);
}
