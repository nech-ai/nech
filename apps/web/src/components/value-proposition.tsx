"use client";

import { motion } from "motion/react";
import { Lock, Layers, Share2 } from "lucide-react";

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

export function ValueProposition() {
	return (
		<section className="relative py-24">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="grid gap-12 lg:grid-cols-3"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="rounded-full border border-gray-800 bg-gray-900/50 p-4">
							<Layers className="h-8 w-8" />
						</div>
						<h3 className="font-semibold text-xl">One Platform, Many Models</h3>
						<p className="text-gray-400">
							Centralise all your language model keys—ChatGPT, Claude, LLaMA,
							Mistral, and others—into a single interface, freeing your team
							from juggling multiple platforms.
						</p>
					</div>

					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="rounded-full border border-gray-800 bg-gray-900/50 p-4">
							<Lock className="h-8 w-8" />
						</div>
						<h3 className="font-semibold text-xl">Secure & Compliant</h3>
						<p className="text-gray-400">
							Advanced encryption and enterprise-grade security keep your keys,
							data, and conversations fully protected, helping you maintain
							trust within your organisation.
						</p>
					</div>

					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="rounded-full border border-gray-800 bg-gray-900/50 p-4">
							<Share2 className="h-8 w-8" />
						</div>
						<h3 className="font-semibold text-xl">Seamless Collaboration</h3>
						<p className="text-gray-400">
							Shared chat histories, projects, and instant role-switching ensure
							that every team member, from interns to executives, can contribute
							insights and best practices effortlessly.
						</p>
					</div>
				</motion.div>
				<div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
			</div>
		</section>
	);
}
