"use server";
import { authActionClient } from "./safe-action";
import { deleteTrailingMessagesSchema } from "./schema";
import {
	revalidatePath as revalidatePathFunc,
	revalidateTag,
} from "next/cache";

export const deleteTrailingMessagesAction = authActionClient
	.schema(deleteTrailingMessagesSchema)
	.action(
		async ({
			parsedInput: { chatId, messageId, revalidatePath },
			ctx: { supabase },
		}) => {
			console.log("deleteTrailingMessagesAction", { chatId, messageId });
			const { data: targetMessage } = await supabase
				.from("messages")
				.select("created_at")
				.eq("id", messageId)
				.single();

			if (!targetMessage) return;

			const { error } = await supabase
				.from("messages")
				.delete()
				.eq("chat_id", chatId)
				.gte("created_at", targetMessage.created_at)
				.throwOnError();

			if (error) {
				throw error;
			}

			revalidateTag(`chat_${chatId}`);
			revalidateTag(`chat_messages_${chatId}`);

			if (revalidatePath) {
				revalidatePathFunc(revalidatePath);
			}
		},
	);
