"use client";

import { Button } from "@nech/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@nech/ui/components/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@nech/ui/components/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@nech/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChatAction } from "@/actions/create-chat-action";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import type { Tables } from "@nech/supabase/types";
import { getAvailableModels } from "@/lib/ai/models";
import { useMemo } from "react";

const createChatSchema = z.object({
	credentialId: z.string().min(1, "Credential is required"),
	model: z.string().min(1, "Model is required"),
	roleId: z.string().optional(),
});

type CreateChatFormValues = z.infer<typeof createChatSchema>;

interface CreateChatDialogProps {
	credentials: Tables<"credentials">[];
	roles?: Tables<"roles">[];
}

export function CreateChatDialog({
	credentials,
	roles = [],
}: CreateChatDialogProps) {
	const router = useRouter();
	const form = useForm<CreateChatFormValues>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			credentialId: "",
			model: "",
			roleId: undefined,
		},
	});

	const selectedCredential = useMemo(
		() => credentials.find((cred) => cred.id === form.watch("credentialId")),
		[credentials, form.watch("credentialId")],
	);

	const availableModels = useMemo(() => {
		if (!selectedCredential) return [];
		return getAvailableModels(selectedCredential.provider);
	}, [selectedCredential]);

	async function onSubmit(data: CreateChatFormValues) {
		const result = await createChatAction(data);
		if (result?.data?.id) {
			router.push(`/chats/${result.data.id}`);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" />
					New Chat
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Chat</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="credentialId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Credential</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											// Reset model when credential changes
											form.setValue("model", "");
										}}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select credential" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{credentials.map((credential) => (
												<SelectItem key={credential.id} value={credential.id}>
													{credential.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Model</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={!selectedCredential}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{availableModels.map((model) => (
												<SelectItem key={model.id} value={model.id}>
													{model.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						{roles.length > 0 && (
							<FormField
								control={form.control}
								name="roleId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select role (optional)" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{roles.map((role) => (
													<SelectItem key={role.id} value={role.id}>
														{role.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<Button
							type="submit"
							className="w-full"
							disabled={!selectedCredential || !form.watch("model")}
						>
							Create Chat
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
