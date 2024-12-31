"use client";

import { useRef, useEffect, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@nech/ui/components/tooltip";
import { cn } from "@nech/ui/utils";

interface TruncatedTextProps {
	text: string;
	className?: string;
}

export function TruncatedText({ text, className }: TruncatedTextProps) {
	const textRef = useRef<HTMLParagraphElement>(null);
	const [isTruncated, setIsTruncated] = useState(false);

	useEffect(() => {
		const element = textRef.current;
		if (element) {
			setIsTruncated(element.scrollWidth > element.clientWidth);
		}

		// Add resize observer for dynamic updates
		const observer = new ResizeObserver(() => {
			if (element) {
				setIsTruncated(element.scrollWidth > element.clientWidth);
			}
		});

		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [text]);

	if (!isTruncated) {
		return (
			<p ref={textRef} className={cn("truncate", className)}>
				{text}
			</p>
		);
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<p ref={textRef} className={cn("truncate", className)}>
					{text}
				</p>
			</TooltipTrigger>
			<TooltipContent side="bottom" className="max-w-[300px] break-words">
				{text}
			</TooltipContent>
		</Tooltip>
	);
}
