"use client";

import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";
import { Input } from "@nech/ui/components/input";

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

export function UpdatesSection() {
	return (
		<motion.section
			id="updates"
			className="border-gray-800 border-t bg-gray-900/50 py-24"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="flex flex-col items-center space-y-8 text-center"
					variants={staggerChildren}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
				>
					<motion.h2 className="font-bold text-3xl" variants={fadeIn}>
						Stay Updated on Our Progress
					</motion.h2>
					<motion.p
						className="max-w-[600px] text-gray-400 text-xl"
						variants={fadeIn}
					>
						Get exclusive updates, beta access, and tips on managing your AI
						models delivered to your inbox.
					</motion.p>
					<motion.div className="flex w-full max-w-md gap-4" variants={fadeIn}>
						<Input
							type="email"
							placeholder="Enter your email"
							className="border-gray-800 bg-black"
						/>
						<Button
							type="submit"
							className="bg-white text-black hover:bg-gray-200"
						>
							Subscribe
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
