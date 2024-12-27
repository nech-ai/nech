"use server";

import { createChat } from "@nech/supabase/mutations";
import { getCredentialByIdWithTokenQuery } from "@nech/supabase/queries";
import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { authActionClient } from "./safe-action";
import { createChatSchema } from "./schema";

export const createChatAction = authActionClient
	.schema(createChatSchema)
	.action(
		async ({
			parsedInput: { title, credentialId },
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			// Get credential to check default model
			const { data: credential } = await getCredentialByIdWithTokenQuery(
				supabase,
				credentialId,
			);

			// @ts-expect-error - TODO: fix this
			const { data: chat } = await createChat(supabase, {
				title,
				credentialId,
				model: credential?.default_model ?? DEFAULT_MODEL_NAME,
			});

			return chat;
		},
	);
