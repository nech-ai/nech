"use client";

import { Button } from "@nech/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@nech/ui/components/card";
import { cn } from "@nech/ui/utils";

interface ActionBlockProps {
	title: string;
	children: React.ReactNode;
	action?: React.ReactNode;
	onSubmit?: () => void;
	danger?: boolean;
	isSubmitting?: boolean;
	isSubmitDisabled?: boolean;
	submitLabel?: string;
	className?: string;
}

export function ActionBlock({
	title,
	children,
	action,
	onSubmit,
	danger,
	isSubmitting,
	isSubmitDisabled,
	submitLabel,
	className,
}: ActionBlockProps) {
	return (
		<Card
			className={cn(className, danger ? "border border-destructive/50" : "")}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit?.();
				}}
			>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className={danger ? "text-destructive" : ""}>
						{title}
					</CardTitle>
					{action}
				</CardHeader>

				<CardContent>
					{children}

					{typeof onSubmit !== "undefined" && (
						<div className="mt-6 flex justify-end border-t pt-3">
							<Button
								type="submit"
								disabled={isSubmitDisabled}
								variant={danger ? "destructive" : "default"}
							>
								{submitLabel ?? "Save"}
							</Button>
						</div>
					)}
				</CardContent>
			</form>
		</Card>
	);
}
