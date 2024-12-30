"use client";

import { ActionBlock } from "@/components/shared/action-block";
import type { Database } from "@nech/supabase/types";
import { ChatList } from "./chat-list";
import { CreateChatDialog } from "./create-chat-dialog";

export function ChatsBlock({
	chats,
	credentials,
}: {
	chats: Database["public"]["Tables"]["chats"]["Row"][];
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
}) {
	return (
		<ActionBlock
			title="Chats"
			action={<CreateChatDialog credentials={credentials} />}
			className="w-full"
		>
			<ChatList chats={chats} />
		</ActionBlock>
	);
}
