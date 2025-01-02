import { getUserQuery } from "../queries";
import type { Client, TablesUpdate } from "../types/index";

export async function updateUser(
	supabase: Client,
	data: TablesUpdate<"users">,
) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user) {
		return;
	}

	return supabase
		.from("users")
		.update(data)
		.eq("id", session.user.id)
		.select()
		.single();
}

export async function deleteUser(supabase: Client) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user) {
		return;
	}

	await Promise.all([
		supabase.auth.admin.deleteUser(session.user.id),
		supabase.from("users").delete().eq("id", session.user.id),
		supabase.auth.signOut(),
	]);

	return session.user.id;
}

type CreateTeamParams = {
	name: string;
};

export async function createTeam(supabase: Client, params: CreateTeamParams) {
	const { data } = await supabase.rpc("create_team", {
		name: params.name,
	});

	return data;
}

export async function updateTeam(
	supabase: Client,
	data: TablesUpdate<"teams">,
) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user) {
		return;
	}

	const user = await getUserQuery(supabase, session.user.id);

	if (!user.data?.team?.id) {
		return;
	}

	return supabase
		.from("teams")
		.update(data)
		.eq("id", user.data.team.id)
		.select()
		.single();
}

export async function deleteTeam(supabase: Client, teamId: string) {
	return supabase.from("teams").delete().eq("id", teamId);
}

type DeleteTeamMemberParams = {
	userId: string;
	teamId: string;
};

export async function deleteTeamMember(
	supabase: Client,
	params: DeleteTeamMemberParams,
) {
	return supabase
		.from("team_memberships")
		.delete()
		.eq("user_id", params.userId)
		.eq("team_id", params.teamId)
		.select()
		.single();
}

export async function deleteTeamInvitation(supabase: Client, id: string) {
	return supabase.from("team_invitations").delete().eq("id", id).throwOnError();
}

type AcceptInvitationParams = {
	invitationId: string;
	userId: string;
};

export async function acceptInvitation(
	supabase: Client,
	params: AcceptInvitationParams,
) {
	const { data: invitation } = await supabase
		.from("team_invitations")
		.select()
		.eq("id", params.invitationId)
		.single();

	if (!invitation) {
		return;
	}

	await supabase
		.from("team_memberships")
		.insert({
			team_id: invitation.team_id,
			user_id: params.userId,
			role: invitation.role,
		})
		.select()
		.single()
		.throwOnError();

	await supabase
		.from("users")
		.update({
			team_id: invitation.team_id,
		})
		.eq("id", params.userId)
		.select()
		.single();

	await supabase
		.from("team_invitations")
		.delete()
		.eq("id", params.invitationId)
		.throwOnError();
}

type CreateCredentialParams = {
	name: string;
	provider:
		| "OPENAI"
		| "ANTHROPIC"
		| "GOOGLE"
		| "AZURE"
		| "XAI"
		| "GROQ"
		| "MISTRAL";
	type: "API_KEY" | "URL";
	value: string;
	createdById: string;
	teamId: string;
};

export async function createCredential(
	supabase: Client,
	params: CreateCredentialParams,
) {
	return supabase
		.from("credentials")
		.insert({
			name: params.name,
			provider: params.provider,
			type: params.type,
			value: params.value,
			created_by_id: params.createdById,
			team_id: params.teamId,
		})
		.select("name, provider, type, masked_value, created_by_id, team_id")
		.single()
		.throwOnError();
}

type UpdateCredentialParams = {
	id: string;
	name: string;
	provider:
		| "OPENAI"
		| "ANTHROPIC"
		| "GOOGLE"
		| "AZURE"
		| "XAI"
		| "GROQ"
		| "MISTRAL";
	type: "API_KEY" | "URL";
	value: string;
	teamId: string;
};

export async function updateCredential(
	supabase: Client,
	params: UpdateCredentialParams,
) {
	return supabase
		.from("credentials")
		.update({
			name: params.name,
			provider: params.provider,
			type: params.type,
			value: params.value,
		})
		.eq("id", params.id)
		.eq("team_id", params.teamId)
		.select()
		.single()
		.throwOnError();
}

type CreateChatParams = {
	title: string;
	credentialId: string;
	model: string;
	roleId?: string;
};

export async function createChat(supabase: Client, params: CreateChatParams) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user) {
		return;
	}

	const user = await getUserQuery(supabase, session.user.id);

	if (!user.data?.team?.id) {
		return;
	}
	return supabase
		.from("chats")
		.insert({
			team_id: user.data.team.id,
			title: params.title,
			created_by_id: session.user.id,
			credential_id: params.credentialId,
			model: params.model,
			role_id: params.roleId,
		})
		.select()
		.single();
}

export async function deleteChat(supabase: Client, chatId: string) {
	return supabase.from("chats").delete().eq("id", chatId);
}

type UpdateChatParams = {
	id: string;
	title?: string;
	model?: string;
	credential_id?: string;
	role_id?: string;
};

export async function updateChat(supabase: Client, params: UpdateChatParams) {
	return supabase.from("chats").update(params).eq("id", params.id).select();
}

interface Usage {
	promptTokens?: number;
	completionTokens?: number;
	totalTokens?: number;
	promptCost?: number;
	completionCost?: number;
	totalCost?: number;
}

interface CreateMessageParams {
	chatId: string;
	content: string;
	role: "user" | "assistant" | "system" | "tool";
	usage?: Usage;
}

export async function createMessage(
	supabase: Client,
	params: CreateMessageParams,
) {
	const hasUsage = Object.values(params.usage ?? {}).some(
		(value) => value !== undefined,
	);
	const metadata = hasUsage
		? Object.entries(params.usage ?? {})
				.filter(
					(entry): entry is [string, number] => typeof entry[1] === "number",
				)
				.reduce<Record<string, number>>(
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					(acc, [key, value]) => ({ ...acc, [key]: value }),
					{},
				)
		: undefined;

	return supabase
		.from("messages")
		.insert({
			chat_id: params.chatId,
			content: params.content,
			role: params.role,
			type: "text",
			metadata,
		})
		.select()
		.single();
}

type CreateRoleParams = {
	name: string;
	content: string;
	description?: string;
	isDefault?: boolean;
	temperature?: number;
	createdById: string;
	teamId: string;
};

export async function createRole(supabase: Client, params: CreateRoleParams) {
	return supabase
		.from("roles")
		.insert({
			name: params.name,
			content: params.content,
			description: params.description,
			is_default: params.isDefault,
			created_by_id: params.createdById,
			team_id: params.teamId,
			temperature: params.temperature,
		})
		.select()
		.single()
		.throwOnError();
}

type UpdateRoleParams = {
	id: string;
	name?: string;
	content?: string;
	description?: string;
	isDefault?: boolean;
	temperature?: number;
	teamId: string;
};

export async function updateRole(supabase: Client, params: UpdateRoleParams) {
	return supabase
		.from("roles")
		.update({
			name: params.name,
			content: params.content,
			description: params.description,
			is_default: params.isDefault,
			temperature: params.temperature,
		})
		.eq("id", params.id)
		.eq("team_id", params.teamId)
		.select()
		.single()
		.throwOnError();
}

export async function archiveRole(
	supabase: Client,
	roleId: string,
	teamId: string,
) {
	return supabase
		.from("roles")
		.update({ archived_at: new Date().toISOString() })
		.eq("id", roleId)
		.eq("team_id", teamId)
		.select()
		.single()
		.throwOnError();
}
