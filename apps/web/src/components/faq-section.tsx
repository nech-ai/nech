"use client";

import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@nech/ui/components/accordion";

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const faqs = [
	{
		question:
			"Why should I use Nech instead of paying for multiple premium subscriptions?",
		answer:
			"Nech standardises usage across all your chosen models. Rather than paying for multiple all-in-one offerings, you simply use your own API keys in one interface, letting you pick the best model for the job without multiple subscription fees.",
	},
	{
		question: "How do roles work in Nech?",
		answer:
			'You can define different "personas" (e.g., lawyer, developer, comedian). Each role injects unique context and tone for the AI, letting you switch to a specialised perspective instantly.',
	},
	{
		question: "What is RAG and how does Nech handle it?",
		answer:
			"RAG (Retrieval Augmented Generation) integrates your own data into AI queries, improving accuracy. Nech keeps this data in a secure knowledge base, accessible only to authorised team members.",
	},
	{
		question: "Can I fork a conversation with different models?",
		answer:
			"Yes. If you want to see how Claude responds compared to ChatGPT, simply fork the conversation. All prior context is retained, but now you're running it on a new model.",
	},
	{
		question: "Is Nech truly open source?",
		answer:
			"Yes. The core code is freely available on GitHub. You can deploy a community version at no cost or opt for advanced, paid features as your needs grow.",
	},
	{
		question: "What are the pricing plans after beta?",
		answer:
			"We plan to keep a strong free tier for the open-source edition. Paid subscriptions will likely offer enterprise features (advanced security, priority support, analytics) while supporting ongoing development.",
	},
];

const accordionItemVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -10 },
};

const accordionContentVariants = {
	open: {
		opacity: 1,
		height: "auto",
		marginTop: "1rem",
		transition: {
			duration: 0.2,
			ease: [0.04, 0.62, 0.23, 0.98],
		},
	},
	closed: {
		opacity: 0,
		height: 0,
		marginTop: 0,
		transition: {
			duration: 0.2,
			ease: [0.04, 0.62, 0.23, 0.98],
		},
	},
};

export function FAQSection() {
	return (
		<section className="relative py-32">
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					className="relative z-10"
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={{
						animate: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					<motion.div className="text-center space-y-4 mb-16" variants={fadeIn}>
						<motion.div
							className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400 backdrop-blur"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<span className="font-mono">FAQ</span>
							<motion.div
								animate={{ rotate: [0, 15, -15, 0] }}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									repeatDelay: 5,
									ease: "easeInOut",
								}}
							>
								<HelpCircle className="ml-2 h-4 w-4" />
							</motion.div>
						</motion.div>
						<h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
							Frequently Asked Questions
						</h2>
					</motion.div>

					<motion.div variants={fadeIn} className="max-w-3xl mx-auto relative">
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
							animate={{
								scale: [1, 1.1, 1],
								opacity: [0.5, 0.7, 0.5],
							}}
							transition={{
								duration: 8,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<div className="relative rounded-2xl border border-gray-800 bg-black/50 backdrop-blur overflow-hidden">
							<Accordion
								type="single"
								collapsible
								className="[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-gray-800/50 [&>*]:border-b-0"
							>
								{faqs.map((faq, index) => (
									<motion.div
										key={index}
										variants={accordionItemVariants}
										initial="hidden"
										whileInView="visible"
										exit="exit"
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<AccordionItem
											value={`item-${index}`}
											className="group data-[state=open]:bg-white/[0.03] transition-all duration-300 border-0 focus-within:border-0 focus:border-0 [&>*]:border-0"
										>
											<div className="px-6 py-4">
												<AccordionTrigger className="hover:no-underline group w-full [&>svg]:hidden pb-0 [&[data-state=open]]:pb-0">
													<div className="flex items-center justify-between w-full">
														<motion.span
															className="text-left font-medium text-gray-200 group-hover:text-white transition-colors duration-200"
															whileHover={{ x: 4 }}
															transition={{
																type: "spring",
																stiffness: 400,
																damping: 17,
															}}
														>
															{faq.question}
														</motion.span>
														<ChevronDown className="h-4 w-4 text-gray-400 transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white" />
													</div>
												</AccordionTrigger>
												<AnimatePresence mode="wait">
													<AccordionContent className="pt-4 border-0">
														<motion.div
															variants={accordionContentVariants}
															initial="closed"
															animate="open"
															exit="closed"
															className="text-gray-400 overflow-hidden"
														>
															{faq.answer}
														</motion.div>
													</AccordionContent>
												</AnimatePresence>
											</div>
										</AccordionItem>
									</motion.div>
								))}
							</Accordion>
						</div>
					</motion.div>
				</motion.div>

				{/* Animated background gradients */}
				<motion.div
					className="absolute top-1/3 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-1/3 right-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: 4,
					}}
				/>
			</div>
		</section>
	);
}
