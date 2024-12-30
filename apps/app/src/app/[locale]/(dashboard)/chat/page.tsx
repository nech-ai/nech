import { ChatsBlock } from "@/components/chats-block";
import { ContentHeader } from "@/components/layout/content-header";
import { getChats, getCredentials } from "@nech/supabase/cached-queries";
import { SearchIcon, MessageSquareIcon } from "lucide-react";
import { Input } from "@nech/ui/components/input";
import { EmptyState } from "@/components/empty-state";
import { CreateChatDialog } from "@/components/create-chat-dialog";

export default async function Page() {
	const [chatsResult, credentialsResult] = await Promise.all([
		getChats(),
		getCredentials(),
	]);

	const chats = chatsResult?.data ?? [];
	const credentials = credentialsResult?.data ?? [];

	return (
		<>
			<ContentHeader>
				<div className="flex items-center gap-4 flex-1 min-w-0">
					<h1 className="text-lg font-semibold truncate">Chats</h1>
					<div className="relative flex-1 max-w-md hidden sm:block">
						<SearchIcon
							className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none"
							aria-hidden="true"
						/>
						<Input
							type="search"
							placeholder="Search chats..."
							className="pl-9 h-9"
						/>
					</div>
				</div>
			</ContentHeader>

			<main className="flex-1 overflow-auto bg-muted/5 w-full max-w-screen-xl mx-auto">
				{chats.length === 0 ? (
					<div className="flex h-full items-center justify-center p-4">
						<EmptyState
							icon={MessageSquareIcon}
							title="No chats yet"
							description="Start a new chat to begin your conversation with AI models"
							action={<CreateChatDialog credentials={credentials} />}
						/>
					</div>
				) : (
					<div className="p-4 w-full">
						<ChatsBlock chats={chats} credentials={credentials} />
					</div>
				)}
			</main>
		</>
	);
}
