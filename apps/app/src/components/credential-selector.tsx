"use client";

import { startTransition, useMemo, useOptimistic } from "react";
import { KeyIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { Database } from "@nech/supabase/types";
import { useToast } from "@nech/ui/hooks/use-toast";
import { updateChatAction } from "@/actions/update-chat-action";
import { SelectWithIcon } from "@/components/ui/select-with-icon";

interface CredentialSelectorProps {
	chatId: string;
	credentials: Database["public"]["Tables"]["credentials"]["Row"][];
	selectedCredentialId?: string;
	className?: string;
}

export function CredentialSelector({
	chatId,
	credentials,
	selectedCredentialId,
	className,
}: CredentialSelectorProps) {
	const { toast } = useToast();
	const updateCredential = useAction(updateChatAction, {
		onSuccess: () => {
			toast({
				title: "Credential updated",
				description: "The credential has been updated successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating credential",
				description: error?.error?.serverError || "Failed to update credential",
				variant: "destructive",
			});
			setOptimisticCredentialId(selectedCredentialId);
		},
	});

	const [optimisticCredentialId, setOptimisticCredentialId] =
		useOptimistic(selectedCredentialId);

	const credentialOptions = useMemo(
		() =>
			credentials.map((cred) => ({
				id: cred.id,
				label: cred.name,
			})),
		[credentials],
	);

	const handleCredentialChange = (value: string) => {
		startTransition(() => {
			setOptimisticCredentialId(value);
			updateCredential.execute({
				id: chatId,
				credentialId: value,
				revalidatePath: `/chat/${chatId}`,
			});
		});
	};

	return (
		<SelectWithIcon
			value={optimisticCredentialId || ""}
			onValueChange={handleCredentialChange}
			options={credentialOptions}
			icon={KeyIcon}
			placeholder="Select credential"
			isLoading={updateCredential.status === "executing"}
			className={className}
		/>
	);
}
