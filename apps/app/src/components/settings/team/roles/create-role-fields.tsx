"use client";
import type { CreateRoleFormValues } from "@/actions/schema";
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
import { Slider } from "@nech/ui/components/slider";

interface CreateRoleFieldsProps {
	form: UseFormReturn<CreateRoleFormValues>;
}

export function CreateRoleFields({ form }: CreateRoleFieldsProps) {
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

			<FormField
				control={form.control}
				name="temperature"
				render={({ field: { value, onChange, ...field } }) => (
					<FormItem>
						<FormLabel>Temperature ({value?.toFixed(2) || "0.70"})</FormLabel>
						<FormControl>
							<Slider
								defaultValue={[value || 0.7]}
								max={1}
								min={0}
								step={0.01}
								onValueChange={(vals) => onChange(vals[0])}
								{...field}
							/>
						</FormControl>
						<FormDescription>
							Higher values make the output more random, lower values make it
							more focused
						</FormDescription>
					</FormItem>
				)}
			/>
		</div>
	);
}
