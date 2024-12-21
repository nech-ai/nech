"use server";
import { updateCredential } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateCredentialSchema } from "./schema";

export const updateCredentialAction = authActionClient
	.schema(updateCredentialSchema)
	.action(
		async ({
			parsedInput: {
				id,
				name,
				provider,
				type,
				value,
				revalidatePath,
				redirectTo,
			},
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			const { data: credential } = await updateCredential(supabase, {
				id,
				name,
				provider,
				type,
				value,
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
