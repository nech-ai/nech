import type { Database } from "@nech/supabase/types";

type Provider = Database["public"]["Enums"]["provider"];

export interface Model {
	id: string;
	label: string;
	provider: Provider;
	description?: string;
	features: {
		imageInput: boolean;
		objectGeneration: boolean;
		toolUsage: boolean;
		toolStreaming: boolean;
	};
}

export const DEFAULT_MODEL_NAME = "gpt-4-turbo";

export const models: Model[] = [
	// OpenAI Models
	{
		id: "gpt-4o",
		label: "GPT-4o",
		provider: "OPENAI",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "gpt-4o-mini",
		label: "GPT-4o Mini",
		provider: "OPENAI",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "gpt-4-turbo",
		label: "GPT-4 Turbo",
		provider: "OPENAI",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "gpt-4",
		label: "GPT-4",
		provider: "OPENAI",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "o1",
		label: "O1",
		provider: "OPENAI",
		features: {
			imageInput: true,
			objectGeneration: true,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "o1-mini",
		label: "O1 Mini",
		provider: "OPENAI",
		features: {
			imageInput: true,
			objectGeneration: true,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "o1-preview",
		label: "O1 Preview",
		provider: "OPENAI",
		features: {
			imageInput: true,
			objectGeneration: true,
			toolUsage: true,
			toolStreaming: true,
		},
	},

	// Anthropic Models
	{
		id: "claude-3-5-sonnet-20241022",
		label: "Claude 3.5 Sonnet (2024-10-22)",
		provider: "ANTHROPIC",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "claude-3-5-sonnet-20240620",
		label: "Claude 3.5 Sonnet (2024-06-20)",
		provider: "ANTHROPIC",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "claude-3-5-haiku-20241022",
		label: "Claude 3.5 Haiku (2024-10-22)",
		provider: "ANTHROPIC",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},

	// Google Models
	{
		id: "gemini-2.0-flash-exp",
		label: "Gemini 2.0 Flash (Experimental)",
		provider: "GOOGLE",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "gemini-1.5-flash",
		label: "Gemini 1.5 Flash",
		provider: "GOOGLE",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "gemini-1.5-pro",
		label: "Gemini 1.5 Pro",
		provider: "GOOGLE",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},

	// XAI Models
	{
		id: "grok-2-1212",
		label: "Grok 2 (12/12)",
		provider: "XAI",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
	{
		id: "grok-2-vision-1212",
		label: "Grok 2 Vision (12/12)",
		provider: "XAI",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
	},
];

export function getAvailableModels(provider: Provider): Model[] {
	return models.filter((model) => model.provider === provider);
}

export function isModelSupported(modelId: string, provider: Provider): boolean {
	return models.some(
		(model) => model.id === modelId && model.provider === provider,
	);
}
