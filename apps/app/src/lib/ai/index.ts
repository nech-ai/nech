import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { xai } from "@ai-sdk/xai";
import { mistral } from "@ai-sdk/mistral";
import type { Database } from "@nech/supabase/types";
import {
	type LanguageModelV1,
	experimental_wrapLanguageModel as wrapLanguageModel,
} from "ai";
import { customMiddleware } from "./custom-middleware";

type Provider = Database["public"]["Enums"]["provider"];

export const customModel = (modelName: string, provider: Provider) => {
	let model: LanguageModelV1;
	if (provider === "OPENAI") {
		model = openai(modelName);
	} else if (provider === "ANTHROPIC") {
		model = anthropic(modelName);
	} else if (provider === "GOOGLE") {
		model = google(modelName);
	} else if (provider === "GROQ") {
		model = groq(modelName);
	} else if (provider === "XAI") {
		model = xai(modelName);
	} else if (provider === "MISTRAL") {
		model = mistral(modelName);
	} else {
		throw new Error("Invalid provider");
	}
	return wrapLanguageModel({
		model,
		middleware: customMiddleware,
	});
};
