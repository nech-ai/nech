"use server";
import { updateRole } from "@nech/supabase/mutations";
import {
	revalidateTag,
	revalidatePath as revalidatePathFunc,
} from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { updateRoleSchema } from "./schema";

export const updateRoleAction = authActionClient
	.schema(updateRoleSchema)
	.action(
		async ({
			parsedInput: {
				id,
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

			const { data: role } = await updateRole(supabase, {
				id,
				name,
				content,
				description,
				isDefault,
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
