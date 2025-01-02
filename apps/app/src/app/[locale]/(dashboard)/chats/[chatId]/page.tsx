import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { convertToUIMessages } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
import {
	getChat,
	getMessages,
	getCredentials,
	getChatTotalCost,
	getRoles,
} from "@nech/supabase/cached-queries";
import { ChatControls } from "@/components/chat-controls";
import { ContentHeader } from "@/components/layout/content-header";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@nech/ui/components/button";
import { AlertCircleIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { TruncatedText } from "@/components/truncated-text";
import { Sheet, SheetContent, SheetTrigger } from "@nech/ui/components/sheet";
import { Settings2Icon } from "lucide-react";

export default async function Page(props: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await props.params;
	const [chatResult, credentialsResult, messagesResult, rolesResult] =
		await Promise.all([
			getChat(chatId),
			getCredentials(),
			getMessages(chatId),
			getRoles(),
		]);

	const chat = chatResult.data;
	const credentials = credentialsResult?.data ?? [];
	const messages = messagesResult?.data ?? [];
	const roles = rolesResult?.data ?? [];

	if (!chat?.id) {
		return (
			<main className="flex h-full items-center justify-center bg-muted/5">
				<EmptyState
					icon={AlertCircleIcon}
					title="Chat not found"
					description="This chat may have been deleted or you don't have access to it"
					action={
						<Button asChild>
							<Link href="/chats">Back to Chats</Link>
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
			<ContentHeader className="flex-col sm:flex-row gap-2 sm:gap-0">
				<div className="flex items-center gap-4 min-w-0 px-4 w-full">
					<Link
						href="/chats"
						className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						aria-label="Back to chats"
					>
						<ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
					</Link>
					<div className="flex-1 min-w-0">
						<TruncatedText
							text={chat.title}
							className="text-lg font-semibold leading-7"
						/>
					</div>

					{/* Mobile Controls */}
					<div className="sm:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="shrink-0">
									<Settings2Icon className="h-4 w-4" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-full sm:w-[400px]">
								<ChatControls
									selectedModelId={selectedModelId}
									selectedCredentialId={chat.credential_id}
									selectedRoleId={chat.role_id || undefined}
									credentials={credentials}
									roles={roles}
									chatId={chat.id}
									initialTotalCost={totalCost ?? 0}
									reloadTotalCost={reloadTotalCost}
									className="flex-col gap-4"
								/>
							</SheetContent>
						</Sheet>
					</div>
				</div>

				{/* Desktop Controls */}
				<div className="hidden sm:block">
					<ChatControls
						selectedModelId={selectedModelId}
						selectedCredentialId={chat.credential_id}
						selectedRoleId={chat.role_id || undefined}
						credentials={credentials}
						roles={roles}
						chatId={chat.id}
						initialTotalCost={totalCost ?? 0}
						reloadTotalCost={reloadTotalCost}
					/>
				</div>
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
