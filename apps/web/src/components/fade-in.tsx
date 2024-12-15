"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface FadeInProps {
	children: React.ReactNode;
	delay?: number;
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.5, delay }}
		>
			{children}
		</motion.div>
	);
}
