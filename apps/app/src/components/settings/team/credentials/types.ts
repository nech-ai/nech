import type { Database } from "@nech/supabase/types";

export type Provider = Database["public"]["Enums"]["provider"];

export const PROVIDER_OPTIONS = {
	OPENAI: { value: "OPENAI" as Provider, label: "OpenAI" },
	ANTHROPIC: { value: "ANTHROPIC" as Provider, label: "Anthropic" },
	GOOGLE: { value: "GOOGLE" as Provider, label: "Google" },
	AZURE: { value: "AZURE" as Provider, label: "Azure" },
	XAI: { value: "XAI" as Provider, label: "X AI" },
} as const;
