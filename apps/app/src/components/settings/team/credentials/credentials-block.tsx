"use client";

import { ActionBlock } from "@/components/shared/action-block";
import type { Database } from "@nech/supabase/types";
import { CredentialsList } from "./credentials-list";
import { Button } from "@nech/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function CredentialsBlock({
	credentials,
}: {
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
}) {
	return (
		<ActionBlock
			title="Credentials"
			action={
				<Button asChild size="sm">
					<Link href="/settings/team/credentials/create">
						<Plus className="mr-2 h-4 w-4" />
						Create
					</Link>
				</Button>
			}
		>
			<CredentialsList credentials={credentials} />
		</ActionBlock>
	);
}
