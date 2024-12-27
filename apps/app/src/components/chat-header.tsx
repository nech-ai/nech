"use client";

import { memo } from "react";
import { ModelSelector } from "./model-selector";
import { CredentialSelector } from "./credential-selector";

function PureChatHeader({
	selectedModelId,
	selectedCredentialId,
	credentials,
	chatId,
}: {
	selectedModelId: string;
	selectedCredentialId?: string;
	credentials: any[];
	chatId: string;
}) {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex items-center gap-3">
				<ModelSelector
					selectedModelId={selectedModelId}
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
