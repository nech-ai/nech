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
	cost: {
		input: number; // Cost per 1K input tokens in USD
		output: number; // Cost per 1K output tokens in USD
		total: number; // Total cost per 1K tokens (input + output)
		context: number; // Context window size in K tokens
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.003,
			output: 0.015,
			total: 0.018,
			context: 200,
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
		cost: {
			input: 0.003,
			output: 0.015,
			total: 0.018,
			context: 200,
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
		cost: {
			input: 0.003,
			output: 0.015,
			total: 0.018,
			context: 200,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},

	// Mistral Models
	{
		id: "pixtral-large-latest",
		label: "Pixtral Large",
		provider: "MISTRAL",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "mistral-large-latest",
		label: "Mistral Large",
		provider: "MISTRAL",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "mistral-small-latest",
		label: "Mistral Small",
		provider: "MISTRAL",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "pixtral-12b-2409",
		label: "Pixtral 12B",
		provider: "MISTRAL",
		features: {
			imageInput: true,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},

	// Groq Models
	{
		id: "llama-3.3-70b-versatile",
		label: "Llama 3.3 70B Versatile",
		provider: "GROQ",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "llama-3.1-8b-instant",
		label: "Llama 3.1 8B Instant",
		provider: "GROQ",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "mixtral-8x7b-32768",
		label: "Mixtral 8x7B 32K",
		provider: "GROQ",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
		},
	},
	{
		id: "gemma2-9b-it",
		label: "Gemma 2 9B",
		provider: "GROQ",
		features: {
			imageInput: false,
			objectGeneration: false,
			toolUsage: true,
			toolStreaming: true,
		},
		cost: {
			input: 0.005,
			output: 0.015,
			total: 0.02,
			context: 128,
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
