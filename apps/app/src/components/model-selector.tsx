"use client";

import { startTransition, useMemo, useOptimistic, useState } from "react";
import { Button } from "@nech/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nech/ui/components/dropdown-menu";
import { models, getAvailableModels } from "@/lib/ai/models";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, ChevronDownIcon, Sparkles } from "lucide-react";
import { saveModelIdAction } from "@/actions/save-model-id-action";
import { useAction } from "next-safe-action/hooks";
import type { Database } from "@nech/supabase/types";
import { useRouter } from "next/navigation";
import { useToast } from "@nech/ui/hooks/use-toast";

type Provider = Database["public"]["Enums"]["provider"];

export function ModelSelector({
	selectedModelId,
	provider,
	chatId,
	className,
}: {
	selectedModelId: string;
	provider?: Provider;
	chatId?: string;
	className?: string;
}) {
	const router = useRouter();
	const { toast } = useToast();
	const saveModelId = useAction(saveModelIdAction, {
		onSuccess: () => {
			router.refresh();
			toast({
				title: "Model updated",
				description: "The model has been updated successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error?.error?.serverError || "Failed to update model",
				variant: "destructive",
			});
		},
	});

	const [open, setOpen] = useState(false);
	const [optimisticModelId, setOptimisticModelId] =
		useOptimistic(selectedModelId);

	const availableModels = useMemo(
		() => (provider ? getAvailableModels(provider) : models),
		[provider],
	);

	const selectedModel = useMemo(
		() => availableModels.find((model) => model.id === optimisticModelId),
		[availableModels, optimisticModelId],
	);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				asChild
				className={cn(
					"w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
					className,
				)}
			>
				<Button variant="outline" className="md:px-2 md:h-[34px]">
					<Sparkles className="mr-2 h-4 w-4" />
					{selectedModel?.label || "Select Model"}
					<ChevronDownIcon className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-[300px]">
				{availableModels.map((model) => (
					<DropdownMenuItem
						key={model.id}
						onSelect={() => {
							setOpen(false);
							startTransition(() => {
								setOptimisticModelId(model.id);
								saveModelId.execute({
									modelId: model.id,
									chatId,
								});
							});
						}}
						className={cn(
							"gap-4 group/item flex flex-row justify-between items-center",
							model.id === optimisticModelId && "bg-accent",
						)}
					>
						<div className="flex flex-col gap-1 items-start">
							{model.label}
							{model.description && (
								<div className="text-xs text-muted-foreground">
									{model.description}
								</div>
							)}
						</div>
						<div
							className={cn(
								"text-foreground dark:text-foreground opacity-0",
								model.id === optimisticModelId && "opacity-100",
							)}
						>
							<CheckCircleIcon className="h-4 w-4" />
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
