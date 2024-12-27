import { ChatsBlock } from "@/components/chats-block";
import { CreateChatDialog } from "@/components/create-chat-dialog";
import { getChats } from "@nech/supabase/cached-queries";
import { getCredentials } from "@nech/supabase/cached-queries";

export default async function Page() {
	const chatsPromise = getChats();
	const credentialsPromise = getCredentials();

	const [chatsResult, credentialsResult] = await Promise.all([
		chatsPromise,
		credentialsPromise,
	]);

	const chats = chatsResult?.data ?? [];
	const credentials = credentialsResult?.data ?? [];

	return (
		<div className="container">
			<div className="flex justify-between items-center mt-8">
				<h1 className="text-2xl font-bold">Chats</h1>
				<CreateChatDialog credentials={credentials} />
			</div>
			<div className="mt-8">
				<ChatsBlock chats={chats} />
			</div>
		</div>
	);
}
