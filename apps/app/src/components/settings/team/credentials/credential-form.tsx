"use client";

import {
	PROVIDER_OPTIONS,
	type CreateCredentialFormProps,
	type UpdateCredentialFormProps,
} from "./types";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from "@nech/ui/components/form";
import { Input } from "@nech/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@nech/ui/components/select";
import { Button } from "@nech/ui/components/button";

export function CredentialForm(
	props: CreateCredentialFormProps | UpdateCredentialFormProps,
) {
	const {
		form,
		onSubmit,
		submitText = "Save",
		loadingText = "Saving...",
	} = props;

	return (
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
						{form.formState.isSubmitting ? loadingText : submitText}
					</Button>
				</div>
			</form>
		</Form>
	);
}
