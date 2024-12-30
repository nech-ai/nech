"use client";
import { ModelSelector } from "./model-selector";
import { CredentialSelector } from "./credential-selector";
import { CostDisplay } from "./cost-display";
import type { Database } from "@nech/supabase/types";
import { useState, useEffect } from "react";

interface ChatControlsProps {
	selectedModelId: string;
	selectedCredentialId?: string;
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
	chatId: string;
	initialTotalCost: number;
	reloadTotalCost: (chatId: string) => Promise<number | null>;
}

export function ChatControls({
	selectedModelId,
	selectedCredentialId,
	credentials,
	chatId,
	initialTotalCost,
	reloadTotalCost,
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
		<div className="flex items-center justify-between w-full">
			<div className="flex items-center gap-3">
				<ModelSelector
					selectedModelId={selectedModelId}
					selectedCredential={selectedCredential}
					chatId={chatId}
					className="order-1 md:order-2"
				/>
				<div className="h-4 w-px bg-border" />
				<CredentialSelector
					chatId={chatId}
					credentials={credentials}
					selectedCredentialId={selectedCredentialId}
				/>
			</div>
			<CostDisplay totalCost={totalCost} />
		</div>
	);
}
