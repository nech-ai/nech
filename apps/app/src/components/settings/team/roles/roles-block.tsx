"use client";
import { ActionBlock } from "@/components/shared/action-block";
import type { Role } from "./types";
import { RolesList } from "./roles-list";
import { Button } from "@nech/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function RolesBlock({ roles }: { roles: Role[] }) {
	return (
		<ActionBlock
			title="Roles"
			action={
				<Button asChild size="sm">
					<Link href="/settings/team/roles/create">
						<Plus className="mr-2 h-4 w-4" />
						Create
					</Link>
				</Button>
			}
		>
			<div className="space-y-4">
				<p className="text-sm text-muted-foreground">
					Manage AI assistant roles for your team
				</p>
				<RolesList roles={roles} />
			</div>
		</ActionBlock>
	);
}
