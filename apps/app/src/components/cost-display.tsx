"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@nech/ui/components/tooltip";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./animated-number";

export function CostDisplay({
	className,
	totalCost = 0,
}: {
	className?: string;
	totalCost?: number;
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={cn("flex items-center gap-2 text-sm", className)}>
						<AnimatedNumber value={totalCost} />
					</div>
				</TooltipTrigger>
				<TooltipContent>Total cost for this chat</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
