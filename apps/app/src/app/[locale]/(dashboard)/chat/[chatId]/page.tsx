import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { convertToUIMessages } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
import {
	getChat,
	getMessages,
	getCredentials,
	getChatTotalCost,
} from "@nech/supabase/cached-queries";
import { ChatHeader } from "@/components/chat-header";
import type { Database } from "@nech/supabase/types";

interface MessageUsage {
	promptTokens?: number;
	completionTokens?: number;
	totalTokens?: number;
	promptCost?: number;
	completionCost?: number;
	totalCost?: number;
}

export default async function Page(props: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await props.params;
	const { data: chat } = await getChat(chatId);
	// @ts-expect-error
	const { data: credentials } = await getCredentials();
	const { data: messages } = await getMessages(chatId);

	if (!chat?.id) {
		return <div>Chat not found</div>;
	}

	const selectedCredential = credentials?.find(
		(cred: Database["public"]["Tables"]["credentials"]["Row"]) =>
			cred.id === chat.credential_id,
	);

	const selectedModelId =
		chat.model || selectedCredential?.default_model || DEFAULT_MODEL_NAME;

	const { data: totalCost } = await getChatTotalCost(chat.id);

	async function reloadTotalCost(chatId: string) {
		"use server";

		const { data: totalCost } = await getChatTotalCost(chatId);
		return totalCost;
	}

	return (
		<div className="flex flex-col h-screen">
			<ChatHeader
				selectedModelId={selectedModelId}
				selectedCredentialId={chat.credential_id}
				credentials={credentials ?? []}
				chatId={chat.id}
				initialTotalCost={totalCost ?? 0}
				reloadTotalCost={reloadTotalCost}
			/>
			<div className="relative flex-1 overflow-hidden">
				<Chat
					id={chat.id}
					initialMessages={convertToUIMessages(messages ?? [])}
					selectedModelId={selectedModelId}
					selectedCredentialId={chat.credential_id}
				/>
				<DataStreamHandler id={chat.id} />
			</div>
		</div>
	);
}
