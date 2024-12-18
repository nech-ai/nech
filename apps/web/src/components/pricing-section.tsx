"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

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

export function PricingSection() {
	return (
		<section id="pricing" className="relative py-24 bg-gray-900/50">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="mx-auto max-w-3xl"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2 className="mb-8 font-bold text-3xl" variants={fadeIn}>
						Simple, Transparent Pricing
					</motion.h2>
					<motion.div
						className="rounded-lg border border-gray-800 bg-black p-8"
						variants={fadeIn}
					>
						<h3 className="mb-4 font-bold text-2xl">Free During Beta</h3>
						<p className="mb-6 text-xl">After beta, starting from £59/month</p>
						<ul className="mb-8 space-y-4 text-left">
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								<span>Unlimited access</span>
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								<span>Team collaboration features</span>
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								<span>Usage analytics and cost monitoring</span>
							</li>
							<li className="flex items-center">
								<Check className="mr-2 h-5 w-5 text-green-500" />
								<span>Priority support during beta</span>
							</li>
						</ul>
					</motion.div>
				</motion.div>
				<div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
			</div>
		</section>
	);
}
