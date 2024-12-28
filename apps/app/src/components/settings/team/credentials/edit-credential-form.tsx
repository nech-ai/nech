"use client";

import { updateCredentialAction } from "@/actions/update-credential-action";
import {
	updateCredentialSchema,
	type UpdateCredentialFormValues,
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
import type { Database } from "@nech/supabase/types";
import { CredentialFormFields } from "./credential-form-fields";
import { Button } from "@nech/ui/components/button";

interface EditCredentialFormProps {
	credential: Database["public"]["Tables"]["credentials"]["Row"];
}

export function EditCredentialForm({ credential }: EditCredentialFormProps) {
	const { toast } = useToast();
	const form = useForm<UpdateCredentialFormValues>({
		resolver: zodResolver(updateCredentialSchema),
		defaultValues: {
			id: credential.id,
			name: credential.name,
			provider: credential.provider,
			type: credential.type,
			value: credential.value,
			default_model: credential.default_model || undefined,
			redirectTo: "/settings/team/credentials",
		},
	});

	const { execute, status } = useAction(updateCredentialAction, {
		onSuccess: () => {
			toast({
				title: "Credential updated",
				description: "Your credential has been updated successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: error?.error?.serverError || "Failed to update credential",
			});
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Credential</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit((values) => execute(values))}>
					<CredentialFormFields form={form} />
					<div className="mt-6 flex justify-end border-t pt-3">
						<Button type="submit" disabled={status === "executing"}>
							{status === "executing" ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
