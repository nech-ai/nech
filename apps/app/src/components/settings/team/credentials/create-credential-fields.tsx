"use client";

import { PROVIDER_OPTIONS, type Provider } from "./types";
import type { CreateCredentialFormValues } from "@/actions/schema";
import type { UseFormReturn } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
} from "@nech/ui/components/form";
import { Input } from "@nech/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@nech/ui/components/select";
import { getAvailableModels } from "@/lib/ai/models";
import { useMemo } from "react";

interface CreateCredentialFieldsProps {
	form: UseFormReturn<CreateCredentialFormValues>;
}

export function CreateCredentialFields({ form }: CreateCredentialFieldsProps) {
	const selectedProvider = form.watch("provider") as Provider;
	const availableModels = useMemo(
		() => getAvailableModels(selectedProvider),
		[selectedProvider],
	);

	return (
		<div className="space-y-4">
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
										onValueChange={(value) => {
											field.onChange(value);
											form.setValue("default_model", undefined);
										}}
										defaultValue={field.value}
									>
										<SelectTrigger className="h-10 w-[180px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{Object.values(PROVIDER_OPTIONS).map((option) => (
												<SelectItem key={option.value} value={option.value}>
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

			<FormField
				control={form.control}
				name="default_model"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Default Model</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a default model" />
								</SelectTrigger>
								<SelectContent>
									{availableModels.map((model) => (
										<SelectItem key={model.id} value={model.id}>
											{model.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormControl>
						<FormDescription>
							This model will be used by default when using this credential
						</FormDescription>
					</FormItem>
				)}
			/>
		</div>
	);
}
