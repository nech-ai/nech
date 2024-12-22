"use client";

import { updateCredentialAction } from "@/actions/update-credential-action";
import {
	updateCredentialSchema,
	type UpdateCredentialFormValues,
} from "@/actions/schema";
import { useTeam } from "@/hooks/use-team";
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
import type { Database } from "@nech/supabase/types";
import { CredentialForm } from "./credential-form";

const formSchema = updateCredentialSchema;
type FormValues = UpdateCredentialFormValues;

export function EditCredentialForm({
	credential,
}: {
	credential: Database["public"]["Tables"]["credentials"]["Row"];
}) {
	const { toast } = useToast();
	const { teamMembership } = useTeam();
	const { execute } = useAction(updateCredentialAction, {
		onSuccess: () => {
			toast({
				title: "Credential updated successfully",
				description: "Your credential has been updated.",
				variant: "default",
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

	const form = useForm<UpdateCredentialFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: credential.id,
			name: credential.name,
			provider: credential.provider,
			type: credential.type,
			value: credential.value,
			redirectTo: "/settings/team/credentials",
		},
	});

	const onSubmit: SubmitHandler<UpdateCredentialFormValues> = (values) => {
		execute({ ...values });
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Credential</CardTitle>
			</CardHeader>
			<CardContent>
				<CredentialForm
					form={form}
					onSubmit={onSubmit}
					submitText="Save Changes"
					loadingText="Saving..."
				/>
			</CardContent>
		</Card>
	);
}
