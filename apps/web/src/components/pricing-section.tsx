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
		<motion.section
			id="pricing"
			className="border-gray-800 border-t bg-gray-900/50 py-24"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="mx-auto max-w-3xl text-center"
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
			</div>
		</motion.section>
	);
}
