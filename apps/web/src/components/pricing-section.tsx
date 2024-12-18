"use client";

import { motion } from "motion/react";
import { Button } from "@nech/ui/components/button";
import { Check, CreditCard, Zap } from "lucide-react";
import { useState } from "react";
import { SubscribeModal } from "./subscribe-modal";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const features = [
	"Unlimited access to all models",
	"Team collaboration features",
	"Usage analytics and cost monitoring",
	"Priority support during beta",
	"Custom workflows",
	"API access",
	"Advanced security features",
	"24/7 monitoring",
];

export function PricingSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section
			id="pricing"
			className="relative py-32 bg-gradient-to-b from-black to-gray-900/50"
		>
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
							<span className="font-mono">Pricing</span>
							<CreditCard className="ml-2 h-4 w-4" />
						</div>
						<h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Simple, Transparent Pricing
						</h2>
					</motion.div>

					<motion.div variants={fadeIn} className="w-full max-w-3xl relative">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
						<div className="relative rounded-2xl border border-gray-800 bg-black/50 backdrop-blur overflow-hidden">
							{/* Beta Banner */}
							<div className="absolute -right-16 top-8 rotate-45 bg-purple-500/80 px-16 py-1.5 text-sm font-semibold backdrop-blur">
								BETA
							</div>

							<div className="p-8 space-y-8">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-2xl font-bold">Free During Beta</h3>
										<p className="mt-2 text-gray-400">
											After beta, starting from{" "}
											<span className="font-bold">£19</span> per month
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<Button
										size="lg"
										className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
										onClick={() => setIsModalOpen(true)}
									>
										<Zap className="mr-2 h-4 w-4" />
										Join Beta
									</Button>
								</div>

								<div className="grid gap-3 sm:grid-cols-2">
									{features.map((feature, index) => (
										<motion.div
											key={index}
											className="flex items-center space-x-3"
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											viewport={{ once: true }}
										>
											<div className="flex-shrink-0">
												<div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10">
													<Check className="h-4 w-4 text-purple-400" />
												</div>
											</div>
											<span className="text-gray-300">{feature}</span>
										</motion.div>
									))}
								</div>

								<div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
									<p className="text-sm text-gray-400">
										* All prices are subject to change after the beta period.
										Beta users will receive special pricing.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Background gradients */}
				<div className="absolute top-1/3 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
				<div className="absolute bottom-1/3 right-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
			</div>

			<SubscribeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</section>
	);
}
