import { SecondaryMenu } from "@/components/settings/secondary-menu";
import type { PropsWithChildren } from "react";

export default async function SettingsLayout({ children }: PropsWithChildren) {
	return (
		<div className="container">
			<SecondaryMenu
				items={[
					{
						title: "General",
						href: "/settings/team/general",
					},
					{
						title: "Members",
						href: "/settings/team/members",
					},
					{
						title: "Credentials",
						href: "/settings/team/credentials",
					},
					{
						title: "Roles",
						href: "/settings/team/roles",
					},
				]}
			/>
			<div className="mt-8">{children}</div>
		</div>
	);
}
