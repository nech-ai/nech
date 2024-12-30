"use client";

import { MessageSquareIcon, SettingsIcon } from "lucide-react";
import type { TeamMembership, User } from "@nech/supabase/types";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from "@nech/ui/components/sidebar";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { Logo } from "./logo";
import { useTeam } from "@/hooks/use-team";

const data = {
	navMain: [
		{
			title: "Chats",
			url: "/chat",
			icon: MessageSquareIcon,
		},
		{
			title: "Settings",
			url: "/settings/team/",
			icon: SettingsIcon,
		},
	],
};

interface AppSidebarProps {
	teamMemberships: TeamMembership[];
	user: User;
}

export function AppSidebar({ teamMemberships, user }: AppSidebarProps) {
	const { teamId } = useTeam();
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex w-full items-center justify-between">
					<Logo withLabel={false} />
					{open && <SidebarTrigger />}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				{!open && <SidebarTrigger />}
				<TeamSwitcher teamMemberships={teamMemberships} activeTeamId={teamId} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
