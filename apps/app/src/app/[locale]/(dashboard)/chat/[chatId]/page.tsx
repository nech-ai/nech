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
import { ChatControls } from "@/components/chat-controls";
import { ContentHeader } from "@/components/layout/content-header";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@nech/ui/components/button";
import { AlertCircleIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export default async function Page(props: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await props.params;
	const { data: chat } = await getChat(chatId);
	// @ts-expect-error
	const { data: credentials } = await getCredentials();
	const { data: messages } = await getMessages(chatId);

	if (!chat?.id) {
		return (
			<main className="flex h-full items-center justify-center bg-muted/5">
				<EmptyState
					icon={AlertCircleIcon}
					title="Chat not found"
					description="This chat may have been deleted or you don't have access to it"
					action={
						<Button asChild>
							<Link href="/chat">Back to Chats</Link>
						</Button>
					}
				/>
			</main>
		);
	}

	const selectedCredential = credentials?.find(
		(cred: any) => cred.id === chat.credential_id,
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
		<div className="flex flex-col h-full">
			<ContentHeader>
				<div className="flex items-center gap-3 min-w-0">
					<Link
						href="/chat"
						className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						aria-label="Back to chats"
					>
						<ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
					</Link>
					<div className="flex flex-col min-w-0">
						<h1 className="text-lg font-semibold leading-none truncate">
							Chat
						</h1>
						<p className="text-sm text-muted-foreground mt-1 truncate">
							{selectedModelId}
						</p>
					</div>
				</div>
				<ChatControls
					selectedModelId={selectedModelId}
					selectedCredentialId={chat.credential_id}
					credentials={credentials ?? []}
					chatId={chat.id}
					initialTotalCost={totalCost ?? 0}
					reloadTotalCost={reloadTotalCost}
				/>
			</ContentHeader>

			<main className="flex-1 relative bg-muted/5 overflow-hidden">
				<div className="max-w-screen-xl mx-auto h-full">
					<Chat
						id={chat.id}
						initialMessages={convertToUIMessages(messages ?? [])}
						selectedModelId={selectedModelId}
						selectedCredentialId={chat.credential_id}
					/>
					<DataStreamHandler id={chat.id} />
				</div>
			</main>
		</div>
	);
}
