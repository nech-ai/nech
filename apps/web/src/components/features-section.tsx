"use client";

import { motion } from "motion/react";
import {
	Key,
	Lock,
	Users,
	BrainCircuit,
	BarChart,
	Shield,
	Sliders,
	Globe,
	Puzzle,
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
			"Use your existing API keys for ChatGPT, Claude, LLama, Mistral, and more.",
	},
	{
		icon: Lock,
		title: "Secure Key Storage",
		description: "Keep all your AI model keys safe and encrypted in one place.",
	},
	{
		icon: Users,
		title: "Team Collaboration",
		description: "Work together using shared AI-powered chats and projects.",
	},
	{
		icon: BrainCircuit,
		title: "Multi-Model AI Assistant",
		description: "Get help from an AI that uses the best model for each task.",
	},
	{
		icon: BarChart,
		title: "Usage Analytics",
		description: "Track how your team uses AI models and monitor costs easily.",
	},
	{
		icon: Shield,
		title: "Enterprise-Grade Security",
		description: "Protect your data with top-notch security measures.",
	},
	{
		icon: Sliders,
		title: "Customizable Workflows",
		description: "Set up AI models to fit your specific work processes.",
	},
	{
		icon: Globe,
		title: "Access Anywhere",
		description: "Use your AI tools from any device, anytime, anywhere.",
	},
	{
		icon: Puzzle,
		title: "Easy Integration",
		description: "Connect Nech with your existing tools and workflows.",
	},
];

export function FeaturesSection() {
	return (
		<motion.section
			id="features"
			className="border-gray-800 border-t py-24"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="mb-12 text-center font-bold text-3xl">
					Features That Empower Your AI Workflow
				</h2>
				<motion.div
					className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="rounded-lg border border-gray-800 bg-gray-900/50 p-6"
							variants={fadeIn}
						>
							<feature.icon className="mb-4 h-12 w-12 text-white" />
							<h3 className="mb-2 font-semibold text-xl">{feature.title}</h3>
							<p className="text-gray-400">{feature.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
