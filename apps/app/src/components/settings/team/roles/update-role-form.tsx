"use client";
import { updateRoleAction } from "@/actions/update-role-action";
import { updateRoleSchema } from "@/actions/schema";
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
import type { Role, UpdateRoleFormValues } from "./types";
import { UpdateRoleFields } from "./update-role-fields";
import { Button } from "@nech/ui/components/button";
import { Form } from "@nech/ui/components/form";

interface UpdateRoleFormProps {
	role: Role;
}

export function UpdateRoleForm({ role }: UpdateRoleFormProps) {
	const { toast } = useToast();
	const form = useForm<UpdateRoleFormValues>({
		resolver: zodResolver(updateRoleSchema),
		defaultValues: {
			id: role.id,
			name: role.name,
			content: role.content,
			description: role.description || "",
			isDefault: role.is_default ?? false,
			redirectTo: "/settings/team/roles",
		},
	});

	const { execute, status } = useAction(updateRoleAction, {
		onSuccess: () => {
			toast({
				title: "Role updated",
				description: "Your role has been updated successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: error?.error?.serverError || "Failed to update role",
			});
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Role</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit((values) => execute(values))}>
						<UpdateRoleFields form={form} />
						<div className="mt-6 flex justify-end border-t pt-3">
							<Button type="submit" disabled={status === "executing"}>
								{status === "executing" ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
