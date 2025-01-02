import { ContentHeader } from "@/components/layout/content-header";
import {
	getCredentials,
	getRoles,
	getTeamMembers,
} from "@nech/supabase/cached-queries";
import { Loading } from "@/components/tables/chats/loading";
import { ErrorFallback } from "@/components/error-fallback";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { CreateChatDialog } from "@/components/create-chat-dialog";
import { searchParamsCache } from "./search-params";
import { SearchFilter } from "@/components/tables/chats/search-filter";
import { Table } from "@/components/tables/chats";
import { ColumnVisibility } from "@/components/tables/chats/column-visibility";

export default async function Page({
	params,
}: {
	params: Promise<{
		searchParams: Record<string, string | string[] | undefined>;
	}>;
}) {
	const { searchParams } = await params;
	const {
		q: query,
		page,
		start,
		end,
		createdBy,
	} = searchParamsCache.parse(searchParams);

	const filter = {
		start,
		end,
		createdBy,
	};

	// @ts-ignore
	const sort = searchParams?.sort?.split(":");

	const loadingKey = JSON.stringify({
		page,
		filter,
		sort,
		query,
	});

	const [credentialsResult, rolesResult, teamMembersResult] = await Promise.all(
		[getCredentials(), getRoles(), getTeamMembers()],
	);

	const credentials = credentialsResult?.data ?? [];
	const roles = rolesResult?.data ?? [];
	const teamMemberships = teamMembersResult?.data ?? [];
	const members =
		teamMemberships?.map((member) => ({
			id: member.user?.id ?? "",
			full_name: member.user?.full_name ?? "",
			avatar_url: member.user?.avatar_url ?? "",
		})) || [];

	return (
		<>
			<ContentHeader>
				<div className="flex justify-between gap-4 flex-1 min-w-0 py-6">
					<h1 className="text-lg font-semibold truncate">Chats</h1>
					<SearchFilter placeholder="Search or type filter" members={members} />
					<div className="flex items-center gap-2">
						<ColumnVisibility />
						<CreateChatDialog credentials={credentials} roles={roles} />
					</div>
				</div>
			</ContentHeader>

			<main className="flex-1 overflow-auto bg-muted/5 w-full max-w-screen-xl mx-auto">
				<ErrorBoundary errorComponent={ErrorFallback}>
					<Suspense fallback={<Loading />} key={loadingKey}>
						<Table filter={filter} page={page} sort={sort} query={query} />
					</Suspense>
				</ErrorBoundary>
			</main>
		</>
	);
}
