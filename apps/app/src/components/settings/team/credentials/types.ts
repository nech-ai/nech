import type { UseFormReturn } from "react-hook-form";
import type {
	CreateCredentialFormValues,
	UpdateCredentialFormValues,
} from "@/actions/schema";

export const PROVIDER_OPTIONS = {
	OPENAI: { value: "OPENAI" as const, label: "OpenAI" },
	ANTHROPIC: { value: "ANTHROPIC" as const, label: "Anthropic" },
	GOOGLE: { value: "GOOGLE" as const, label: "Google" },
	AZURE: { value: "AZURE" as const, label: "Azure" },
	XAI: { value: "XAI" as const, label: "X AI" },
} as const;

export type Provider =
	(typeof PROVIDER_OPTIONS)[keyof typeof PROVIDER_OPTIONS]["value"];

export interface CreateCredentialFormProps {
	form: UseFormReturn<CreateCredentialFormValues>;
	onSubmit: (values: CreateCredentialFormValues) => void;
	submitText?: string;
	loadingText?: string;
}

export interface UpdateCredentialFormProps {
	form: UseFormReturn<UpdateCredentialFormValues>;
	onSubmit: (values: UpdateCredentialFormValues) => void;
	submitText?: string;
	loadingText?: string;
}

export type CredentialFormProps =
	| CreateCredentialFormProps
	| UpdateCredentialFormProps;
