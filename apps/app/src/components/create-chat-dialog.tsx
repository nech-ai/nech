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
import { Input } from "@nech/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChatAction } from "@/actions/create-chat-action";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import type { Tables } from "@nech/supabase/types";

const createChatSchema = z.object({
	title: z.string().min(1, "Title is required"),
	credentialId: z.string().min(1, "Credential is required"),
	model: z.string().min(1, "Model is required"),
});

type CreateChatFormValues = z.infer<typeof createChatSchema>;

interface CreateChatDialogProps {
	credentials: Tables<"credentials">[];
}

export function CreateChatDialog({ credentials }: CreateChatDialogProps) {
	const router = useRouter();
	const form = useForm<CreateChatFormValues>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			title: "",
			credentialId: "",
			model: "gpt-4",
		},
	});

	async function onSubmit(data: CreateChatFormValues) {
		const result = await createChatAction(data);
		if (result?.data?.id) {
			router.push(`/chat/${result.data.id}`);
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
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Chat title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="credentialId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Credential</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
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
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select model" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="gpt-4">GPT-4</SelectItem>
											<SelectItem value="gpt-3.5-turbo">GPT-3.5</SelectItem>
											<SelectItem value="claude-3-opus">
												Claude 3 Opus
											</SelectItem>
											<SelectItem value="claude-3-sonnet">
												Claude 3 Sonnet
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Create Chat
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
