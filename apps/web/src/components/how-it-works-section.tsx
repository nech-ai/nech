"use client";

import { motion } from "motion/react";
import { Key, Users, MessageSquare } from "lucide-react";

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

export function HowItWorksSection() {
	return (
		<section className="border-gray-800 border-t py-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="text-center"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<h2 className="mb-12 font-bold text-3xl">
						Get Started in Three Simple Steps
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								className="flex flex-col items-center space-y-4"
								variants={fadeIn}
							>
								<div className="rounded-full bg-gray-900 p-6">
									<step.icon className="h-8 w-8" />
								</div>
								<h3 className="font-semibold text-xl">{step.title}</h3>
								<p className="text-gray-400">{step.description}</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}

const steps = [
	{
		icon: Key,
		title: "Connect Your Keys",
		description:
			"Securely upload and manage API keys for all your favourite models in one place.",
	},
	{
		icon: Users,
		title: "Invite Your Team",
		description:
			"Onboard colleagues, assign roles, and set permissions within minutes.",
	},
	{
		icon: MessageSquare,
		title: "Collaborate & Innovate",
		description:
			"Start AI-driven conversations, switch models instantly, and refine insights together.",
	},
];
