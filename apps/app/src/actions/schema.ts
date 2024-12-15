import { z } from "zod";

export const updateUserSchema = z.object({
	full_name: z.string().min(2).max(32).optional(),
	email: z.string().email().optional(),
	avatar_url: z.string().url().optional(),
	revalidatePath: z.string().optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export const createTeamSchema = z.object({
	name: z.string().min(2, {
		message: "Team name must be at least 2 characters.",
	}),
	redirectTo: z.string().optional(),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;

export const updateTeamSchema = z.object({
	name: z.string().min(2).max(32).optional(),
	avatar_url: z.string().url().optional(),
	revalidatePath: z.string().optional(),
});

export type UpdateTeamFormValues = z.infer<typeof updateTeamSchema>;

export const changeTeamSchema = z.object({
	teamId: z.string(),
	redirectTo: z.string(),
});

export const deleteTeamSchema = z.object({
	teamId: z.string(),
});

export const acceptInvitationSchema = z.object({
	invitationId: z.string(),
	redirectTo: z.string(),
});

export type AcceptInvitationFormValues = z.infer<typeof acceptInvitationSchema>;

export const inviteTeamMemberSchema = z.object({
	email: z.string().email(),
	role: z.enum(["OWNER", "MEMBER"]),
	revalidatePath: z.string().optional(),
});

export type InviteTeamMemberFormValues = z.infer<typeof inviteTeamMemberSchema>;

export const deleteInviteSchema = z.object({
	id: z.string(),
	revalidatePath: z.string().optional(),
});

export type DeleteInviteFormValues = z.infer<typeof deleteInviteSchema>;
