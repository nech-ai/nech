import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { convertToUIMessages } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
import {
	getChat,
	getMessages,
	getCredentials,
} from "@nech/supabase/cached-queries";
import { ChatHeader } from "@/components/chat-header";
import type { Database } from "@nech/supabase/types";

export default async function Page({
	params: { chatId },
}: { params: { chatId: string } }) {
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

	return (
		<div className="flex flex-col h-screen">
			<ChatHeader
				selectedModelId={selectedModelId}
				selectedCredentialId={chat.credential_id}
				credentials={credentials ?? []}
				chatId={chat.id}
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
