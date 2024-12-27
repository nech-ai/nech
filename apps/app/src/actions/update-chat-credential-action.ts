"use server";
import { updateChatCredential } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateChatCredentialSchema } from "./schema";

export const updateChatCredentialAction = authActionClient
	.schema(updateChatCredentialSchema)
	.action(
		async ({
			parsedInput: { id, credentialId, revalidatePath, redirectTo },
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			console.log("Updating chat credential:", { id, credentialId });

			const { data: chat } = await updateChatCredential(supabase, {
				id,
				credentialId,
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
