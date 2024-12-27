"use client";

import { memo } from "react";
import { ModelSelector } from "./model-selector";
import { CredentialSelector } from "./credential-selector";
import type { Database } from "@nech/supabase/types";

type Provider = Database["public"]["Enums"]["provider"];

interface Credential {
	id: string;
	provider: Provider;
}

function PureChatHeader({
	selectedModelId,
	selectedCredentialId,
	credentials,
	chatId,
}: {
	selectedModelId: string;
	selectedCredentialId?: string;
	credentials: Credential[];
	chatId: string;
}) {
	const selectedCredential = credentials.find(
		(cred) => cred.id === selectedCredentialId,
	);

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
		</header>
	);
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
	return (
		prevProps.selectedModelId === nextProps.selectedModelId &&
		prevProps.selectedCredentialId === nextProps.selectedCredentialId
	);
});
