import { AppSidebar } from "@/components/layout/app-sidebar";
import { TeamContextProvider } from "@/shared/lib/team-context";
import { getTeamMemberships, getUser } from "@nech/supabase/cached-queries";
import { SidebarInset, SidebarProvider } from "@nech/ui/components/sidebar";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { UserMenu } from "@/components/layout/user-menu";

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
		>
			<SidebarProvider defaultOpen={false}>
				<AppSidebar
					activeTeamId={user.team_id}
					teamMemberships={teamMemberships}
					user={user}
				/>
				<SidebarInset>
					<div className="h-screen flex flex-col">
						<div className="fixed right-4 top-4 z-30">
							<UserMenu user={user} />
						</div>
						<div className="flex-1">{children}</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</TeamContextProvider>
	);
}
