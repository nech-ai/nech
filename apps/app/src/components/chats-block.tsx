"use client";

import { ActionBlock } from "@/components/shared/action-block";
import type { Database } from "@nech/supabase/types";
import { ChatList } from "./chat-list";
import { CreateChatDialog } from "./create-chat-dialog";

interface ChatsBlockProps {
	chats: Database["public"]["Tables"]["chats"]["Row"][];
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
	roles: Database["public"]["Tables"]["roles"]["Row"][];
}

export function ChatsBlock({ chats, credentials, roles }: ChatsBlockProps) {
	return (
		<ActionBlock
			title="Chats"
			action={<CreateChatDialog credentials={credentials} roles={roles} />}
			className="w-full"
		>
			<ChatList chats={chats} />
		</ActionBlock>
	);
}
