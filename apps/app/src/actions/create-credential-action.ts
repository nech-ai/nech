"use server";
import { createCredential } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { createCredentialSchema } from "./schema";

export const createCredentialAction = authActionClient
	.schema(createCredentialSchema)
	.action(
		async ({
			parsedInput: { name, provider, type, value, revalidatePath, redirectTo },
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			const { data: credential } = await createCredential(supabase, {
				name,
				provider,
				type,
				value,
				createdById: user.id,
				teamId: user.team_id,
			});

			revalidateTag(`credentials_${user.team_id}`);

			if (revalidatePath) {
				revalidatePathFunc(revalidatePath);
			}

			if (redirectTo) {
				redirect(redirectTo);
			}

			return credential;
		},
	);
