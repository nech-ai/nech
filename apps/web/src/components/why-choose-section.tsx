"use client";

import { motion } from "motion/react";
import { Zap, Users, Key } from "lucide-react";

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

export function WhyChooseSection() {
	return (
		<motion.section
			id="why-choose"
			className="border-gray-800 border-t py-24"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="mx-auto max-w-3xl"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2
						className="mb-8 text-center font-bold text-3xl"
						variants={fadeIn}
					>
						Why Teams Choose Nech
					</motion.h2>
					<motion.ul className="space-y-6" variants={staggerChildren}>
						<motion.li className="flex items-start" variants={fadeIn}>
							<Zap className="mr-4 h-6 w-6 flex-shrink-0 text-white" />
							<div>
								<h3 className="mb-2 font-semibold">
									Open-source and Free During Beta
								</h3>
								<p className="text-gray-400">
									Supporting your favorite AI models with transparency and
									community-driven development.
								</p>
							</div>
						</motion.li>
						<motion.li className="flex items-start" variants={fadeIn}>
							<Users className="mr-4 h-6 w-6 flex-shrink-0 text-white" />
							<div>
								<h3 className="mb-2 font-semibold">Built for All Team Sizes</h3>
								<p className="text-gray-400">
									From small startups to large enterprises, Nech scales with
									your team's needs.
								</p>
							</div>
						</motion.li>
						<motion.li className="flex items-start" variants={fadeIn}>
							<Key className="mr-4 h-6 w-6 flex-shrink-0 text-white" />
							<div>
								<h3 className="mb-2 font-semibold">Bring Your Own Keys</h3>
								<p className="text-gray-400">
									Maintain full control over your AI resources and data with
									your own API keys.
								</p>
							</div>
						</motion.li>
					</motion.ul>
				</motion.div>
			</div>
		</motion.section>
	);
}
