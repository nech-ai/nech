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
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { CredentialForm } from "./credential-form";

const formSchema = createCredentialSchema;
type FormValues = CreateCredentialFormValues;

export function CreateCredentialForm() {
	const { toast } = useToast();
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

	const onSubmit: SubmitHandler<FormValues> = (values) => {
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
				<CredentialForm
					form={form}
					onSubmit={onSubmit}
					submitText="Create"
					loadingText="Creating..."
				/>
			</CardContent>
		</Card>
	);
}
