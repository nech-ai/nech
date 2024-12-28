"use client";

import { createCredentialAction } from "@/actions/create-credential-action";
import {
	createCredentialSchema,
	type CreateCredentialFormValues,
} from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@nech/ui/components/card";
import { useToast } from "@nech/ui/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { CreateCredentialFields } from "./create-credential-fields";
import { Button } from "@nech/ui/components/button";
import { Form } from "@nech/ui/components/form";

export function CreateCredentialForm() {
	const { toast } = useToast();
	const form = useForm<CreateCredentialFormValues>({
		resolver: zodResolver(createCredentialSchema),
		defaultValues: {
			name: "",
			provider: "OPENAI",
			type: "API_KEY",
			value: "",
			default_model: undefined,
			redirectTo: "/settings/team/credentials",
		},
	});

	const { execute, status } = useAction(createCredentialAction, {
		onSuccess: () => {
			form.reset();
			toast({
				title: "Credential created",
				description: "Your credential has been created successfully.",
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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Credential</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit((values) => execute(values))}>
						<CreateCredentialFields form={form} />
						<div className="mt-6 flex justify-end border-t pt-3">
							<Button type="submit" disabled={status === "executing"}>
								{status === "executing" ? "Creating..." : "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
