"use client";
import { ModelSelector } from "./model-selector";
import { CredentialSelector } from "./credential-selector";
import { CostDisplay } from "./cost-display";
import type { Database } from "@nech/supabase/types";
import { useState } from "react";
import { useEffect } from "react";

export function ChatHeader({
	selectedModelId,
	selectedCredentialId,
	credentials,
	chatId,
	initialTotalCost,
	reloadTotalCost,
}: {
	selectedModelId: string;
	selectedCredentialId?: string;
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
	chatId: string;
	initialTotalCost: number;
	reloadTotalCost: (chatId: string) => Promise<number | null>;
}) {
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
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
		</header>
	);
}
