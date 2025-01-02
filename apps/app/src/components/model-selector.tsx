"use client";

import { startTransition, useMemo, useOptimistic } from "react";
import { BrainCircuitIcon } from "lucide-react";
import type { Database } from "@nech/supabase/types";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@nech/ui/hooks/use-toast";
import { getAvailableModels } from "@/lib/ai/models";
import { updateChatAction } from "@/actions/update-chat-action";
import { SelectWithIcon } from "@/components/ui/select-with-icon";

type Provider = Database["public"]["Enums"]["provider"];

interface ModelSelectorProps {
	selectedModelId: string;
	selectedCredential?: Database["public"]["Tables"]["credentials"]["Row"];
	chatId: string;
	className?: string;
}

export function ModelSelector({
	selectedModelId,
	selectedCredential,
	chatId,
	className,
}: ModelSelectorProps) {
	const { toast } = useToast();
	const updateModel = useAction(updateChatAction, {
		onSuccess: () => {
			toast({
				title: "Model updated",
				description: "The model has been updated successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating model",
				description: error?.error?.serverError || "Failed to update model",
				variant: "destructive",
			});
			setOptimisticModelId(selectedModelId);
		},
	});

	const [optimisticModelId, setOptimisticModelId] =
		useOptimistic(selectedModelId);

	const availableModels = useMemo(() => {
		if (!selectedCredential) return [];
		return getAvailableModels(selectedCredential.provider);
	}, [selectedCredential]);

	const handleModelChange = (value: string) => {
		startTransition(() => {
			setOptimisticModelId(value);
			updateModel.execute({
				id: chatId,
				model: value,
				revalidatePath: `/chats/${chatId}`,
			});
		});
	};

	if (!selectedCredential) return null;

	return (
		<SelectWithIcon
			value={optimisticModelId}
			onValueChange={handleModelChange}
			options={availableModels}
			icon={BrainCircuitIcon}
			placeholder="Select model"
			isLoading={updateModel.status === "executing"}
			className={className}
		/>
	);
}
