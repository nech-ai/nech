"use server";
import { updateChat } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateChatSchema } from "./schema";

export const updateChatAction = authActionClient
	.schema(updateChatSchema)
	.action(
		async ({
			parsedInput: {
				id,
				credentialId,
				model,
				title,
				revalidatePath,
				redirectTo,
			},
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			const { data: chat } = await updateChat(supabase, {
				id,
				credential_id: credentialId,
				model,
				title,
			});

			revalidateTag(`chat_${id}`);
			revalidateTag(`chat_messages_${id}`);

			if (revalidatePath) {
				revalidatePathFunc(revalidatePath);
			}

			if (redirectTo) {
				redirect(redirectTo);
			}

			return chat;
		},
	);
