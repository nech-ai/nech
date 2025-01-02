import type { Client } from "../types/index";
import { UTCDate } from "@date-fns/utc";

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
	return await supabase
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

export type GetTeamChatsParams = {
	teamId: string;
	to: number;
	from: number;
	sort?: [string, "asc" | "desc"];
	searchQuery?: string;
	filter?: {
		start?: string;
		end?: string;
		createdBy?: string;
	};
};

export async function getTeamChatsQuery(
	supabase: Client,
	params: GetTeamChatsParams,
) {
	const { from = 0, to, filter, sort, teamId } = params;
	const { start, end, createdBy } = filter || {};
	const columns = [
		"id",
		"title",
		"model",
		"system_prompt",
		"metadata",
		"created_by_id",
		"created_by:users!created_by_id(id, full_name, avatar_url)",
		"credential_id",
		"credential:credentials(id,name,provider,type,masked_value)",
		"role_id",
		"role:roles(id,name, content, description, temperature)",
		"created_at",
		"updated_at",
	];
	const query = supabase
		.from("chats")
		.select(columns.join(","), { count: "exact" })
		.eq("team_id", teamId);

	if (sort) {
		const [column, value] = sort;
		const ascending = value === "asc";
		if (column === "role") {
			query.order("role(name)", { ascending });
		} else if (column === "credential") {
			query.order("credential(name)", { ascending });
		} else if (column === "created_by") {
			query.order("created_by(full_name)", { ascending });
		} else {
			query.order(column, { ascending });
		}
	} else {
		query.order("created_at", { ascending: false });
	}

	if (start && end) {
		const fromDate = new UTCDate(start);
		const toDate = new UTCDate(end);

		query.gte("created_at", fromDate.toISOString());
		query.lte("created_at", toDate.toISOString());
	}

	if (createdBy) {
		query.eq("created_by_id", createdBy);
	}

	const { data, count } = await query.range(from, to).throwOnError();

	return {
		meta: {
			count,
		},
		data,
	};
}

export async function getChatQuery(supabase: Client, chatId: string) {
	return supabase
		.from("chats")
		.select("*, role:roles(*)")
		.eq("id", chatId)
		.single();
}

export async function getChatMessagesQuery(supabase: Client, chatId: string) {
	return supabase.from("messages").select("*").eq("chat_id", chatId);
}

export async function getChatTotalCostQuery(supabase: Client, chatId: string) {
	return supabase.rpc("get_chat_total_cost", { chat_id: chatId });
}

export async function getTeamRolesQuery(supabase: Client, teamId: string) {
	return supabase
		.from("roles")
		.select("*")
		.eq("team_id", teamId)
		.is("archived_at", null)
		.throwOnError();
}

export async function getTeamRoleQuery(
	supabase: Client,
	roleId: string,
	teamId: string,
) {
	return supabase
		.from("roles")
		.select("*")
		.eq("id", roleId)
		.eq("team_id", teamId)
		.is("archived_at", null)
		.single()
		.throwOnError();
}
