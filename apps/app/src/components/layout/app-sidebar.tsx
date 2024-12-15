"use client";

import { MessageSquareIcon, SettingsIcon } from "lucide-react";
import type * as React from "react";

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

const data = {
	navMain: [
		{
			title: "Chats",
			url: "/chats",
			icon: MessageSquareIcon,
		},
		{
			title: "Settings",
			url: "/settings/team/",
			icon: SettingsIcon,
		},
	],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: User;
	activeTeamId: string | null;
	teamMemberships: TeamMembership[];
}

export function AppSidebar({ ...props }: AppSidebarProps) {
	const { open } = useSidebar();
	return (
		<Sidebar collapsible="icon" {...props}>
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
				<TeamSwitcher
					activeTeamId={props.activeTeamId}
					teamMemberships={props.teamMemberships}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
