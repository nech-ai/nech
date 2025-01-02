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

// Base credential fields shared between create and update
const credentialBaseFields = {
	name: z.string().min(2).max(32),
	provider: z.enum([
		"OPENAI",
		"ANTHROPIC",
		"GOOGLE",
		"AZURE",
		"XAI",
		"GROQ",
		"MISTRAL",
	]),
	type: z.enum(["API_KEY", "URL"]),
	value: z.string(),
	default_model: z.string().optional(),
	revalidatePath: z.string().optional(),
	redirectTo: z.string().optional(),
} as const;

// Create credential schema
export const createCredentialSchema = z.object({
	...credentialBaseFields,
});

// Update credential schema
export const updateCredentialSchema = z.object({
	id: z.string(),
	...credentialBaseFields,
});

// Separate type definitions
export type CreateCredentialFormValues = z.infer<typeof createCredentialSchema>;
export type UpdateCredentialFormValues = z.infer<typeof updateCredentialSchema>;

export const saveModelIdSchema = z.object({
	modelId: z.string(),
	chatId: z.string().optional(),
	revalidatePath: z.string().optional(),
});

export type SaveModelIdFormValues = z.infer<typeof saveModelIdSchema>;

export const createChatSchema = z.object({
	credentialId: z.string().min(1),
	roleId: z.string().optional(),
	model: z.string().min(1),
});

export type CreateChatFormValues = z.infer<typeof createChatSchema>;

export const updateChatSchema = z.object({
	id: z.string(),
	credentialId: z.string().optional(),
	model: z.string().optional(),
	title: z.string().optional(),
	roleId: z.string().optional(),
	revalidatePath: z.string().optional(),
	redirectTo: z.string().optional(),
});

export type UpdateChatFormValues = z.infer<typeof updateChatSchema>;

export const generateChatTitleSchema = z.object({
	content: z.string(),
	chatId: z.string(),
	revalidatePath: z.string().optional(),
});

export type GenerateChatTitleFormValues = z.infer<
	typeof generateChatTitleSchema
>;

const roleBaseFields = {
	name: z.string().min(2).max(32),
	content: z.string().min(1),
	description: z.string().optional(),
	isDefault: z.boolean().optional(),
	revalidatePath: z.string().optional(),
	redirectTo: z.string().optional(),
	temperature: z.number().min(0).max(1).optional(),
} as const;

export const createRoleSchema = z.object({
	...roleBaseFields,
});

export const updateRoleSchema = z.object({
	id: z.string(),
	...roleBaseFields,
});

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormValues = z.infer<typeof updateRoleSchema>;

export const parseDateSchema = z
	.date()
	.transform((value) => new Date(value))
	// .transform((v) => isValid(v))
	.refine((v) => !!v, { message: "Invalid date" });

export const filterChatsSchema = z.object({
	name: z.string().optional().describe("The name to search for"),
	start: parseDateSchema
		.optional()
		.describe(
			"The start date when chat creation date. Return ISO-8601 format.",
		),
	end: parseDateSchema
		.optional()
		.describe(
			"The end date when chat creation date. If not provided, defaults to the current date. Return ISO-8601 format.",
		),
	createdBy: z
		.string()
		.optional()
		.describe("The name of the member who created the chat to search for"),
});
