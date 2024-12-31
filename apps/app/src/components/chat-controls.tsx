"use client";
import { ModelSelector } from "./model-selector";
import { CredentialSelector } from "./credential-selector";
import { CostDisplay } from "./cost-display";
import type { Database } from "@nech/supabase/types";
import { useState, useEffect } from "react";
import { cn } from "@nech/ui/utils";

interface ChatControlsProps {
	selectedModelId: string;
	selectedCredentialId?: string;
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
	chatId: string;
	initialTotalCost: number;
	reloadTotalCost: (chatId: string) => Promise<number | null>;
	className?: string;
}

export function ChatControls({
	selectedModelId,
	selectedCredentialId,
	credentials,
	chatId,
	initialTotalCost,
	reloadTotalCost,
	className,
}: ChatControlsProps) {
	const selectedCredential = credentials.find(
		(cred) => cred.id === selectedCredentialId,
	);

	const [totalCost, setTotalCost] = useState(initialTotalCost);

	useEffect(() => {
		const interval = setInterval(async () => {
			const totalCost = await reloadTotalCost(chatId);
			setTotalCost(totalCost ?? 0);
		}, 2000);
		return () => clearInterval(interval);
	}, [chatId, reloadTotalCost]);

	return (
		<div
			className={cn(
				"flex items-center w-full gap-4 px-4",
				"sm:justify-between",
				className,
			)}
		>
			<div
				className={cn(
					"flex items-center gap-4",
					"flex-col sm:flex-row w-full sm:w-auto",
				)}
			>
				<ModelSelector
					selectedModelId={selectedModelId}
					selectedCredential={selectedCredential}
					chatId={chatId}
					className="w-full sm:w-auto"
				/>
				<div className="hidden sm:block h-4 w-px bg-border" />
				<CredentialSelector
					chatId={chatId}
					credentials={credentials}
					selectedCredentialId={selectedCredentialId}
					className="w-full sm:w-auto"
				/>
			</div>
			<CostDisplay totalCost={totalCost} className="hidden sm:flex" />
		</div>
	);
}
