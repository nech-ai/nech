"use client";

import { startTransition, useMemo, useOptimistic, useEffect } from "react";
import { Button } from "@nech/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nech/ui/components/dropdown-menu";
import { cn } from "@/lib/utils";
import { BrainCircuitIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@nech/ui/hooks/use-toast";
import { getAvailableModels } from "@/lib/ai/models";
import type { Database } from "@nech/supabase/types";
import { updateChatAction } from "@/actions/update-chat-action";

type Provider = Database["public"]["Enums"]["provider"];

interface Credential {
	id: string;
	provider: Provider;
}

export function ModelSelector({
	chatId,
	selectedModelId,
	selectedCredential,
	className,
}: {
	chatId: string;
	selectedModelId: string;
	selectedCredential?: Credential;
	className?: string;
}) {
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
				description: error?.serverError || "Failed to update model",
				variant: "destructive",
			});
		},
	});

	const [optimisticModelId, setOptimisticModelId] =
		useOptimistic(selectedModelId);

	const availableModels = useMemo(() => {
		if (!selectedCredential) return [];
		return getAvailableModels(selectedCredential.provider);
	}, [selectedCredential]);

	const selectedModel = useMemo(
		() => availableModels.find((model) => model.id === optimisticModelId),
		[availableModels, optimisticModelId],
	);

	useEffect(() => {
		if (selectedCredential && availableModels.length > 0) {
			const isCurrentModelValid = availableModels.some(
				(model) => model.id === selectedModelId,
			);

			if (!isCurrentModelValid) {
				startTransition(() => {
					const defaultModel = availableModels[0];
					setOptimisticModelId(defaultModel.id);
					updateModel.execute({
						id: chatId,
						model: defaultModel.id,
						revalidatePath: `/chat/${chatId}`,
					});
				});
			}
		}
	}, [selectedCredential?.id]);

	if (!selectedCredential) return null;

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
					disabled={updateModel.status === "executing"}
				>
					<BrainCircuitIcon className="h-4 w-4" />
					<span className="max-w-[150px] truncate">
						{selectedModel?.label || "Select Model"}
					</span>
					{updateModel.status === "executing" && (
						<Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[200px]">
				{availableModels.map((model) => (
					<DropdownMenuItem
						key={model.id}
						onSelect={() => {
							startTransition(() => {
								setOptimisticModelId(model.id);
								updateModel.execute({
									id: chatId,
									modelId: model.id,
									revalidatePath: `/chat/${chatId}`,
								});
							});
						}}
						className="flex items-center justify-between py-2"
					>
						<div className="flex items-center gap-2">
							<BrainCircuitIcon className="h-4 w-4" />
							<span className="truncate">{model.label}</span>
						</div>
						{model.id === optimisticModelId && (
							<CheckCircleIcon className="h-4 w-4 text-primary" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
