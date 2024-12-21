import { getUserQuery } from "../queries";
import type { Client, TablesUpdate } from "../types";

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
	provider: "OPENAI" | "ANTHROPIC" | "GOOGLE" | "AZURE" | "XAI";
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
		.select()
		.single()
		.throwOnError();
}

type UpdateCredentialParams = {
	id: string;
	name: string;
	provider: "OPENAI" | "ANTHROPIC" | "GOOGLE" | "AZURE" | "XAI";
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
