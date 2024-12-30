import { AppSidebar } from "@/components/layout/app-sidebar";
import { TeamContextProvider } from "@/shared/lib/team-context";
import { getTeamMemberships, getUser } from "@nech/supabase/cached-queries";
import { SidebarProvider } from "@nech/ui/components/sidebar";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({ children }: PropsWithChildren) {
	// @ts-expect-error
	const { data: user } = await getUser();

	if (!user) {
		return redirect("/login");
	}

	if (!user.team_id) {
		return redirect("/teams");
	}

	const userTeamMemberships = await getTeamMemberships();
	const teamMemberships = userTeamMemberships?.data ?? [];

	if (!teamMemberships?.length) {
		return redirect("/teams/create");
	}

	return (
		<TeamContextProvider
			initialTeamId={user.team_id}
			allTeamMemberships={teamMemberships}
			user={user}
		>
			<div className="flex h-screen">
				<SidebarProvider defaultOpen={false}>
					<AppSidebar teamMemberships={teamMemberships} user={user} />
					<div className="flex flex-col overflow-hidden flex-1">{children}</div>
				</SidebarProvider>
			</div>
		</TeamContextProvider>
	);
}
