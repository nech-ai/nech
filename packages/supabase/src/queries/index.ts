import type { Client } from "../types/index";

// Database types
export async function getUserQuery(supabase: Client, userId: string) {
	return supabase
		.from("users")
		.select(
			`
      *,
      team:teams(*)
    `,
		)
		.eq("id", userId)
		.single()
		.throwOnError();
}

export async function getCurrentUserTeamQuery(supabase: Client) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user) {
		return;
	}
	return getUserQuery(supabase, session.user?.id);
}

export async function getTeamMembershipsByUserIdQuery(
	supabase: Client,
	userId: string,
) {
	return supabase
		.from("team_memberships")
		.select(
			`
      *,
      team:teams(*),
      user:users(*)
    `,
		)
		.eq("user_id", userId)
		.throwOnError();
}

export async function getTeamMembersQuery(supabase: Client, teamId: string) {
	const { data } = await supabase
		.from("team_memberships")
		.select(
			`
      id,
      role,
      is_creator,
      team_id,
      user_id,
      created_at,
      updated_at,
      team:teams(*),
      user:users(*)
    `,
		)
		.eq("team_id", teamId)
		.order("created_at")
		.throwOnError();

	return data;
}

export async function getTeamInvitesQuery(supabase: Client, teamId: string) {
	const { data } = await supabase
		.from("team_invitations")
		.select(
			`
      *,
      team:teams(*),
      invited_by:users(*)
    `,
		)
		.eq("team_id", teamId)
		.order("created_at")
		.throwOnError();

	return data;
}

export async function getTeamInviteQuery(supabase: Client, code: string) {
	return supabase
		.from("team_invitations")
		.select(
			`
      *,
      team:teams(*),
      invited_by:users(*)
    `,
		)
		.eq("code", code)
		.throwOnError()
		.single();
}

type GetTeamUserParams = {
	teamId: string;
	userId: string;
};

export async function getTeamUserQuery(
	supabase: Client,
	params: GetTeamUserParams,
) {
	const { data } = await supabase
		.from("team_memberships")
		.select(
			`
      id,
      role,
      team_id,
      is_creator,
      user:users(id, full_name, avatar_url, email)
    `,
		)
		.eq("team_id", params.teamId)
		.eq("user_id", params.userId)
		.throwOnError()
		.single();

	return {
		data,
	};
}

export async function getUserInvitesQuery(supabase: Client, email: string) {
	return supabase
		.from("team_invitations")
		.select("id, email, code, role, user:invited_by(*), team:team_id(*)")
		.eq("email", email)
		.throwOnError();
}

export async function getTeamCredentialsQuery(
	supabase: Client,
	teamId: string,
) {
	return supabase
		.from("credentials")
		.select("*")
		.eq("team_id", teamId)
		.throwOnError();
}

export async function getTeamCredentialQuery(
	supabase: Client,
	credentialId: string,
	teamId: string,
) {
	return supabase
		.from("credentials")
		.select("name, provider, type, masked_value, created_by_id, team_id")
		.eq("id", credentialId)
		.eq("team_id", teamId)
		.single()
		.throwOnError();
}

export async function getChatCredentialQuery(supabase: Client, chatId: string) {
	const { data } = await supabase
		.from("chats")
		.select("*, credential:credentials(*)")
		.eq("id", chatId)
		.single();

	return data?.credential;
}

export async function getCredentialByIdWithTokenQuery(
	supabase: Client,
	credentialId: string,
) {
	return await supabase
		.from("credentials")
		.select("*")
		.eq("id", credentialId)
		.single()
		.throwOnError();
}

export async function getTeamChatsQuery(supabase: Client, teamId: string) {
	return supabase
		.from("chats")
		.select("*")
		.eq("team_id", teamId)
		.order("updated_at", { ascending: false });
}

export async function getChatQuery(supabase: Client, chatId: string) {
	return supabase.from("chats").select("*").eq("id", chatId).single();
}

export async function getChatMessagesQuery(supabase: Client, chatId: string) {
	return supabase.from("messages").select("*").eq("chat_id", chatId);
}

export async function getChatTotalCostQuery(supabase: Client, chatId: string) {
	return supabase.rpc("get_chat_total_cost", { chat_id: chatId });
}
