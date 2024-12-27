import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "../clients/server";
import {
	getTeamCredentialsQuery,
	getTeamInvitesQuery,
	getTeamMembersQuery,
	getTeamMembershipsByUserIdQuery,
	getTeamUserQuery,
	getUserInvitesQuery,
	getUserQuery,
	getTeamCredentialQuery,
	getTeamChatsQuery,
	getChatQuery,
	getChatMessagesQuery,
} from "../queries";

export const getSession = cache(async () => {
	const supabase = await createClient();

	return supabase.auth.getSession();
});

export const getUser = async () => {
	const {
		data: { session },
	} = await getSession();
	const userId = session?.user?.id;

	if (!userId) {
		return null;
	}

	const supabase = await createClient();

	return unstable_cache(
		async () => {
			return getUserQuery(supabase, userId);
		},
		["user", userId],
		{
			tags: [`user_${userId}`],
			revalidate: 180,
		},
	)();
};

export const getTeamUser = async () => {
	const supabase = await createClient();
	const user = await getUser();

	const userId = user?.data?.id;
	const teamId = user?.data?.team_id;

	if (!userId || !teamId) {
		return null;
	}

	return unstable_cache(
		async () => {
			return getTeamUserQuery(supabase, {
				userId,
				teamId,
			});
		},
		["team", "user", userId],
		{
			tags: [`team_user_${userId}`],
			revalidate: 180,
		},
	)();
};

export const getTeamMembers = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const teamId = user?.data?.team_id;

	if (!teamId) {
		return null;
	}

	return unstable_cache(
		async () => {
			return getTeamMembersQuery(supabase, teamId);
		},
		["team_members", teamId],
		{
			tags: [`team_members_${teamId}`],
			revalidate: 180,
		},
	)();
};

export const getTeamMemberships = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const userId = user?.data?.id;

	if (!userId) {
		return;
	}

	return unstable_cache(
		async () => {
			return getTeamMembershipsByUserIdQuery(supabase, userId);
		},
		["teams", userId],
		{
			tags: [`teams_${userId}`],
			revalidate: 180,
		},
	)();
};

export const getTeamInvites = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const teamId = user?.data?.team_id;

	if (!teamId) {
		return;
	}

	return unstable_cache(
		async () => {
			return getTeamInvitesQuery(supabase, teamId);
		},
		["team", "invites", teamId],
		{
			tags: [`team_invites_${teamId}`],
			revalidate: 180,
		},
	)();
};

export const getUserInvites = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const email = user?.data?.email ?? "";

	return unstable_cache(
		async () => {
			return getUserInvitesQuery(supabase, email);
		},
		["user", "invites", email],
		{
			tags: [`user_invites_${email}`],
			revalidate: 180,
		},
	)();
};

export const getCredentials = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const teamId = user?.data?.team_id;

	if (!teamId) {
		return;
	}

	return unstable_cache(
		async () => {
			return getTeamCredentialsQuery(supabase, teamId);
		},
		["team", "credentials", teamId],
		{
			tags: [`credentials_${teamId}`],
			revalidate: 180,
		},
	)();
};

export const getCredential = async (credentialId: string) => {
	const supabase = await createClient();

	const user = await getUser();
	const teamId = user?.data?.team_id;

	if (!teamId) {
		return;
	}

	return unstable_cache(
		async () => {
			return getTeamCredentialQuery(supabase, credentialId, teamId);
		},
		["credential", credentialId],
		{
			tags: [`credential_${credentialId}`],
			revalidate: 180,
		},
	)();
};

export const getChats = async () => {
	const supabase = await createClient();

	const user = await getUser();
	const teamId = user?.data?.team_id;

	if (!teamId) {
		return;
	}

	return unstable_cache(
		async () => {
			return getTeamChatsQuery(supabase, teamId);
		},
		["team", "chats", teamId],
		{
			tags: [`team_chats_${teamId}`],
			revalidate: 180,
		},
	)();
};

export const getChat = async (chatId: string) => {
	const supabase = await createClient();

	return unstable_cache(
		async () => {
			return getChatQuery(supabase, chatId);
		},
		["chat", chatId],
		{
			tags: [`chat_${chatId}`],
			revalidate: 180,
		},
	)();
};

export const getMessages = async (chatId: string) => {
	const supabase = await createClient();

	return unstable_cache(
		async () => {
			return getChatMessagesQuery(supabase, chatId);
		},
		["chat", "messages", chatId],
		{
			tags: [`chat_messages_${chatId}`],
			revalidate: 180,
		},
	)();
};
