"use client";

import { motion } from "motion/react";
import {
	Key,
	Repeat,
	Lock,
	BarChart,
	Workflow,
	MessageSquare,
} from "lucide-react";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const features = [
	{
		icon: Key,
		title: "Bring Your Own Keys",
		description:
			"Integrate any model's API keys. Total flexibility, zero vendor lock-in.",
		gradient: "from-purple-500/10 to-blue-500/10",
		iconColor: "text-purple-400",
		borderColor: "border-purple-500/20",
	},
	{
		icon: Repeat,
		title: "Real-Time Role & Model Switching",
		description:
			"Change who is 'speaking' and which AI you're using at any moment—perfect for refining answers.",
		gradient: "from-blue-500/10 to-purple-500/10",
		iconColor: "text-blue-400",
		borderColor: "border-blue-500/20",
	},
	{
		icon: Lock,
		title: "Secure Key Vault",
		description:
			"Keep all keys encrypted and managed centrally, reducing risk of data breaches.",
		gradient: "from-purple-500/10 to-blue-500/10",
		iconColor: "text-purple-400",
		borderColor: "border-purple-500/20",
	},
	{
		icon: MessageSquare,
		title: "Shared AI Chats & Projects",
		description:
			"Make each AI conversation a team endeavour, ensuring no insight gets lost.",
		gradient: "from-blue-500/10 to-purple-500/10",
		iconColor: "text-blue-400",
		borderColor: "border-blue-500/20",
	},
	{
		icon: BarChart,
		title: "Usage Analytics",
		description:
			"Gain visibility into model usage, spot trends, and keep budgets under control.",
		gradient: "from-purple-500/10 to-blue-500/10",
		iconColor: "text-purple-400",
		borderColor: "border-purple-500/20",
	},
	{
		icon: Workflow,
		title: "Custom Workflows",
		description:
			"Configure models to your organisation's unique way of working.",
		gradient: "from-blue-500/10 to-purple-500/10",
		iconColor: "text-blue-400",
		borderColor: "border-blue-500/20",
	},
];

export function FeaturesSection() {
	return (
		<section id="features" className="relative py-32">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex flex-col items-center space-y-16"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={{
						animate: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					<motion.div className="text-center space-y-4" variants={fadeIn}>
						<div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur">
							<span className="font-mono">Features</span>
							<Workflow className="ml-2 h-4 w-4" />
						</div>
						<h2 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Everything You Need
						</h2>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
						variants={fadeIn}
					>
						{features.map((feature, index) => (
							<motion.div
								key={index}
								className="group relative"
								variants={fadeIn}
								whileHover={{ y: -5 }}
								transition={{ duration: 0.2 }}
							>
								<div
									className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl opacity-50 rounded-3xl`}
								/>
								<div className="relative h-full rounded-2xl border border-gray-800 bg-black/50 p-8 backdrop-blur-sm">
									<div className="flex flex-col space-y-4">
										<div className="flex items-center space-x-4">
											<div
												className={`relative flex h-12 w-12 items-center justify-center rounded-xl border ${feature.borderColor} bg-black/50`}
											>
												<feature.icon
													className={`h-6 w-6 ${feature.iconColor}`}
												/>
											</div>
											<h3 className="font-semibold text-xl">{feature.title}</h3>
										</div>
										<p className="text-gray-400">{feature.description}</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* Background gradients */}
				<div className="absolute top-1/4 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute bottom-1/4 right-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
			</div>
		</section>
	);
}
