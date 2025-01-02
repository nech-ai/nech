"use client";
import type { UpdateRoleFormValues } from "./types";
import type { UseFormReturn } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
} from "@nech/ui/components/form";
import { Input } from "@nech/ui/components/input";
import { Textarea } from "@nech/ui/components/textarea";
import { Switch } from "@nech/ui/components/switch";

interface UpdateRoleFieldsProps {
	form: UseFormReturn<UpdateRoleFormValues>;
}

export function UpdateRoleFields({ form }: UpdateRoleFieldsProps) {
	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Customer Support" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="content"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Instructions</FormLabel>
						<FormControl>
							<Textarea
								placeholder="You are a helpful customer support agent..."
								className="min-h-[200px]"
								{...field}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Input
								placeholder="A role for handling customer inquiries"
								{...field}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="isDefault"
				render={({ field }) => (
					<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
						<div className="space-y-0.5">
							<FormLabel className="text-base">Default Role</FormLabel>
							<FormDescription>
								Use this role by default when creating new chats
							</FormDescription>
						</div>
						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	);
}
