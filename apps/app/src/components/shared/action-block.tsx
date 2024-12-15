"use client";

import { Button } from "@nech/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@nech/ui/components/card";
import { cn } from "@nech/ui/utils";
import type { PropsWithChildren } from "react";

export function ActionBlock({
	children,
	title,
	danger,
	onSubmit,
	isSubmitting,
	isSubmitDisabled,
	className,
	submitLabel,
}: PropsWithChildren<{
	onSubmit?: () => void;
	title: string;
	danger?: boolean;
	isSubmitting?: boolean;
	isSubmitDisabled?: boolean;
	submitLabel?: string;
	className?: string;
}>) {
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
				<CardHeader>
					<CardTitle className={danger ? "text-destructive" : ""}>
						{title}
					</CardTitle>
				</CardHeader>

				<CardContent>
					{children}

					{typeof onSubmit !== "undefined" && (
						<div className=" mt-6 flex justify-end border-t pt-3">
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
