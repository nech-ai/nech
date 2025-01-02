"use client";
import { createRoleAction } from "@/actions/create-role-action";
import { createRoleSchema, type CreateRoleFormValues } from "@/actions/schema";
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
import { CreateRoleFields } from "./create-role-fields";
import { Button } from "@nech/ui/components/button";
import { Form } from "@nech/ui/components/form";

export function CreateRoleForm() {
	const { toast } = useToast();
	const form = useForm<CreateRoleFormValues>({
		resolver: zodResolver(createRoleSchema),
		defaultValues: {
			name: "",
			content: "",
			description: "",
			isDefault: false,
			redirectTo: "/settings/team/roles",
		},
	});

	const { execute, status } = useAction(createRoleAction, {
		onSuccess: () => {
			form.reset();
			toast({
				title: "Role created",
				description: "Your role has been created successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: error?.error?.serverError || "Failed to create role",
			});
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Role</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit((values) => execute(values))}>
						<CreateRoleFields form={form} />
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
