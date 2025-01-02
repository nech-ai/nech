"use client";
import { startTransition, useMemo, useOptimistic } from "react";
import { UserIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { Tables } from "@nech/supabase/types";
import { useToast } from "@nech/ui/hooks/use-toast";
import { updateChatAction } from "@/actions/update-chat-action";
import { SelectWithIcon } from "@/components/ui/select-with-icon";

interface RoleSelectorProps {
	chatId: string;
	roles: Tables<"roles">[];
	selectedRoleId?: string;
	className?: string;
}

export function RoleSelector({
	chatId,
	roles,
	selectedRoleId,
	className,
}: RoleSelectorProps) {
	const { toast } = useToast();
	const updateRole = useAction(updateChatAction, {
		onSuccess: () => {
			toast({
				title: "Role updated",
				description: "The role has been updated successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating role",
				description: error?.error?.serverError || "Failed to update role",
				variant: "destructive",
			});
			setOptimisticRoleId(selectedRoleId);
		},
	});

	const [optimisticRoleId, setOptimisticRoleId] = useOptimistic(selectedRoleId);

	const roleOptions = useMemo(
		() =>
			roles.map((role) => ({
				id: role.id,
				label: role.name,
			})),
		[roles],
	);

	const handleRoleChange = (value: string | null) => {
		startTransition(() => {
			setOptimisticRoleId(value || undefined);
			updateRole.execute({
				id: chatId,
				roleId: value || undefined,
				revalidatePath: `/chats/${chatId}`,
			});
		});
	};

	return (
		<SelectWithIcon
			value={optimisticRoleId || ""}
			onValueChange={handleRoleChange}
			options={roleOptions}
			icon={UserIcon}
			placeholder="Select role"
			isLoading={updateRole.status === "executing"}
			className={className}
		/>
	);
}
