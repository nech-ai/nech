"use client";

import { motion } from "motion/react";
import {
	Key,
	Repeat,
	Lock,
	BarChart,
	Workflow,
	Globe,
	MessageSquare,
} from "lucide-react";

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

const features = [
	{
		icon: Key,
		title: "Bring Your Own Keys",
		description:
			"Integrate any model's API keys. Total flexibility, zero vendor lock-in.",
	},
	{
		icon: Repeat,
		title: "Real-Time Role & Model Switching",
		description:
			"Change who is 'speaking' and which AI you're using at any moment—perfect for refining answers and testing scenarios.",
	},
	{
		icon: Lock,
		title: "Secure Key Vault",
		description:
			"Keep all keys encrypted and managed centrally, reducing the risk of data breaches or unauthorised access.",
	},
	{
		icon: MessageSquare,
		title: "Shared AI Chats & Projects",
		description:
			"Make each AI conversation a team endeavour, ensuring no insight gets lost or siloed.",
	},
	{
		icon: BarChart,
		title: "Usage Analytics & Cost Tracking",
		description:
			"Gain visibility into model usage, spot trends, and keep budgets under control with detailed reporting tools.",
	},
	{
		icon: Workflow,
		title: "Custom Workflows & Integrations",
		description:
			"Configure models to your organisation's unique way of working and easily connect with your existing tool stack.",
	},
	{
		icon: Globe,
		title: "Accessible Anywhere, Anytime",
		description:
			"A fully responsive, device-agnostic interface that's ready whenever and wherever your team needs it.",
	},
];

export function FeaturesSection() {
	return (
		<section id="features" className="relative py-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex flex-col items-center space-y-16"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2
						className="text-center font-bold text-3xl sm:text-4xl"
						variants={fadeIn}
					>
						Features That Transform Your Workflow
					</motion.h2>

					<motion.div
						className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
						variants={fadeIn}
					>
						{features.map((feature, index) => (
							<div
								key={index}
								className="group rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:border-gray-700 hover:bg-gray-900"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-black/50">
									<feature.icon className="h-6 w-6 text-white" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">{feature.title}</h3>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</motion.div>
				</motion.div>
				<div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
			</div>
		</section>
	);
}
