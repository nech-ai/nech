import { AppSidebar } from "@/components/layout/app-sidebar";
import { Footer } from "@/components/layout/footer";
import { UserMenu } from "@/components/layout/user-menu";
import { TeamContextProvider } from "@/shared/lib/team-context";
import { getTeamMemberships, getUser } from "@nech/supabase/cached-queries";
import { SidebarInset, SidebarProvider } from "@nech/ui/components/sidebar";
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

	// if (!user?.data.onboarded) {
	// 	return redirect("/onboarding");
	// }

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
					<div className="flex min-h-screen flex-col">
						<div className="absolute top-4 right-4">
							<UserMenu user={user} />
						</div>
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</TeamContextProvider>
	);
}
