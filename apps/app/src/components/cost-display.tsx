"use client";

import { useMemo } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@nech/ui/components/tooltip";
import { cn } from "@/lib/utils";

export function CostDisplay({
	className,
	totalCost = 0,
}: {
	className?: string;
	totalCost?: number;
}) {
	const formattedCost = useMemo(() => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 4,
			maximumFractionDigits: 4,
		}).format(totalCost);
	}, [totalCost]);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={cn("flex items-center gap-2 text-sm", className)}>
						<span>{formattedCost}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent>Total cost for this chat</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
