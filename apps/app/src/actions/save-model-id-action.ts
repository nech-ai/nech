"use server";

import { cookies } from "next/headers";
import { updateChat } from "@nech/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { saveModelIdSchema } from "./schema";

export const saveModelIdAction = authActionClient
	.schema(saveModelIdSchema)
	.action(async ({ parsedInput: { modelId, chatId }, ctx: { supabase } }) => {
		const cookieStore = await cookies();
		cookieStore.set("model-id", modelId);

		// If chatId is provided, update the chat's model
		if (chatId) {
			await updateChat(supabase, {
				id: chatId,
				model: modelId,
			});

			// Revalidate chat data
			revalidateTag(`chat_${chatId}`);
		}

		return { success: true };
	});
