"use client";

import { startTransition, useMemo, useOptimistic } from "react";
import { Button } from "@nech/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nech/ui/components/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, KeyIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { Database } from "@nech/supabase/types";
import { useToast } from "@nech/ui/hooks/use-toast";
import { updateChatAction } from "@/actions/update-chat-action";

type Provider = Database["public"]["Enums"]["provider"];

interface Credential {
	id: string;
	name: string;
	provider: Provider;
	default_model?: string;
}

export function CredentialSelector({
	chatId,
	credentials,
	selectedCredentialId,
	className,
}: {
	chatId: string;
	credentials: Credential[];
	selectedCredentialId?: string;
} & React.ComponentProps<typeof Button>) {
	const { toast } = useToast();
	const updateCredential = useAction(updateChatAction, {
		onSuccess: () => {
			toast({
				title: "Credential updated",
				description: "The credential has been updated successfully",
			});
		},
	});

	const [optimisticCredentialId, setOptimisticCredentialId] =
		useOptimistic(selectedCredentialId);
	const selectedCredential = useMemo(
		() => credentials.find((cred) => cred.id === optimisticCredentialId),
		[credentials, optimisticCredentialId],
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"flex items-center gap-2 md:h-9 md:px-3",
						"data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
						className,
					)}
				>
					<KeyIcon className="h-4 w-4" />
					<span className="max-w-[150px] truncate">
						{selectedCredential?.name || "Select Credential"}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[200px]">
				{credentials.map((credential) => (
					<DropdownMenuItem
						key={credential.id}
						onSelect={() => {
							startTransition(() => {
								setOptimisticCredentialId(credential.id);
								updateCredential.execute({
									id: chatId,
									credentialId: credential.id,
									revalidatePath: `/chat/${chatId}`,
								});
							});
						}}
						className="flex items-center justify-between py-2"
					>
						<div className="flex items-center gap-2">
							<KeyIcon className="h-4 w-4" />
							<span className="truncate">{credential.name}</span>
						</div>
						{credential.id === optimisticCredentialId && (
							<CheckCircleIcon className="h-4 w-4 text-primary" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
