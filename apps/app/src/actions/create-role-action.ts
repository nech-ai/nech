"use server";
import { createRole } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { createRoleSchema } from "./schema";

export const createRoleAction = authActionClient
	.schema(createRoleSchema)
	.action(
		async ({
			parsedInput: {
				name,
				content,
				description,
				isDefault,
				revalidatePath,
				redirectTo,
			},
			ctx: { supabase, user },
		}) => {
			if (!user?.team_id) {
				return;
			}

			const { data: role } = await createRole(supabase, {
				name,
				content,
				description,
				isDefault,
				createdById: user.id,
				teamId: user.team_id,
			});

			revalidateTag(`roles_${user.team_id}`);

			if (revalidatePath) {
				revalidatePathFunc(revalidatePath);
			}

			if (redirectTo) {
				redirect(redirectTo);
			}

			return role;
		},
	);
