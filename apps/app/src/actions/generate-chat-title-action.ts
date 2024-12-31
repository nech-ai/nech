"use server";
import { authActionClient } from "./safe-action";
import { generateChatTitleSchema } from "./schema";
import {
	revalidatePath as revalidatePathFunc,
	revalidateTag,
} from "next/cache";

import { customModel } from "@/lib/ai";
import { generateText } from "ai";

export const generateChatTitleAction = authActionClient
	.schema(generateChatTitleSchema)
	.action(
		async ({
			parsedInput: { content, chatId, revalidatePath },
			ctx: { user, supabase },
		}) => {
			const { text: title } = await generateText({
				model: customModel("gpt-4o-mini", "OPENAI"),
				system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
				prompt: JSON.stringify(content),
			});

			await supabase.from("chats").update({ title }).eq("id", chatId).select();

			revalidateTag(`chat_${chatId}`);
			revalidateTag(`chat_messages_${chatId}`);

			if (revalidatePath) {
				revalidatePathFunc(revalidatePath);
			}

			return title;
		},
	);
