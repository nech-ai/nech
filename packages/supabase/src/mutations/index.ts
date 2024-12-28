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
};

export async function updateChat(supabase: Client, params: UpdateChatParams) {
	return supabase.from("chats").update(params).eq("id", params.id).select();
}

type CreateMessageParams = {
	chatId: string;
	content: string;
	role: "user" | "assistant" | "system" | "tool";
	usage: {
		promptTokens?: number;
		completionTokens?: number;
		totalTokens?: number;
		promptCost?: number;
		completionCost?: number;
		totalCost?: number;
	};
};

export async function createMessage(
	supabase: Client,
	params: CreateMessageParams,
) {
	const metadata: Record<string, number | undefined> = {};
	if (params.usage) {
		if (params.usage.promptTokens) {
			metadata.promptTokens = params.usage.promptTokens;
		}
		if (params.usage.completionTokens) {
			metadata.completionTokens = params.usage.completionTokens;
		}
		if (params.usage.totalTokens) {
			metadata.totalTokens = params.usage.totalTokens;
		}
		if (params.usage.promptCost) {
			metadata.promptCost = params.usage.promptCost;
		}
		if (params.usage.completionCost) {
			metadata.completionCost = params.usage.completionCost;
		}
		if (params.usage.totalCost) {
			metadata.totalCost = params.usage.totalCost;
		}
	}
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
