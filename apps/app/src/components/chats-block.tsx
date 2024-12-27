"use client";

import { ActionBlock } from "@/components/shared/action-block";
import type { Database } from "@nech/supabase/types";
import { ChatList } from "./chat-list";
import { Button } from "@nech/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ChatsBlock({
	chats,
}: {
	chats: Database["public"]["Tables"]["chats"]["Row"][];
}) {
	return (
		<ActionBlock
			title="Chats"
			action={
				<Button asChild size="sm">
					<Link href="/chat/create">
						<Plus className="mr-2 h-4 w-4" />
						Create
					</Link>
				</Button>
			}
		>
			<ChatList chats={chats} />
		</ActionBlock>
	);
}
