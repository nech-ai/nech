"use client";

import { createCredentialAction } from "@/actions/create-credential-action";
import {
	createCredentialSchema,
	type CreateCredentialFormValues,
} from "@/actions/schema";
import { useTeam } from "@/hooks/use-team";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nech/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@nech/ui/components/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@nech/ui/components/form";
import { Input } from "@nech/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@nech/ui/components/select";
import { useToast } from "@nech/ui/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

const formSchema = createCredentialSchema;
type FormValues = CreateCredentialFormValues;

const PROVIDER_OPTIONS = {
	OPENAI: { value: "OPENAI", label: "OpenAI" },
	ANTHROPIC: { value: "ANTHROPIC", label: "Anthropic" },
	GOOGLE: { value: "GOOGLE", label: "Google" },
	AZURE: { value: "AZURE", label: "Azure" },
	XAI: { value: "XAI", label: "X AI" },
} as const;

export function CreateCredentialForm() {
	const { toast } = useToast();
	const { teamMembership } = useTeam();
	const { execute } = useAction(createCredentialAction, {
		onSuccess: () => {
			form.reset();
			toast({
				title: "Credential created successfully",
				description:
					"Your new credential has been created. You can copy it from above the form.",
				variant: "default",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: error?.error?.serverError || "Failed to create credential",
			});
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			provider: "OPENAI",
			type: "API_KEY",
			value: "",
			redirectTo: "/settings/team/credentials",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		execute({ ...values });
	};

	// if (teamMembership?.role !== "OWNER") {
	// 	return null;
	// }

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Credential</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="@container">
						<div className="flex @md:flex-row flex-col gap-4">
							<div className="flex-1">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="My API Key" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div>
								<FormField
									control={form.control}
									name="provider"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Provider</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="h-10 w-[180px]">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{Object.values(PROVIDER_OPTIONS).map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="mt-4">
							<FormField
								control={form.control}
								name="value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>API Key</FormLabel>
										<FormControl>
											<Input type="password" placeholder="sk-..." {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="mt-6 flex justify-end border-t pt-3">
							<Button type="submit" disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting ? "Creating..." : "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
