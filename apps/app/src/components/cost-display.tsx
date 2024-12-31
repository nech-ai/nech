"use client";
import { cn } from "@/lib/utils";

interface CostDisplayProps {
	totalCost: number;
	className?: string;
}

export function CostDisplay({ totalCost, className }: CostDisplayProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-2 text-sm text-muted-foreground",
				className,
			)}
		>
			<span>Cost:</span>
			<span className="font-medium">${totalCost.toFixed(4)}</span>
		</div>
	);
}
