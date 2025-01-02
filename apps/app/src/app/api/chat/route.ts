import {
	type Message,
	convertToCoreMessages,
	createDataStreamResponse,
	streamText,
} from "ai";

import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { createClient } from "@nech/supabase/server";
import { systemPrompt } from "@/lib/ai/prompts";
import {
	getMostRecentUserMessage,
	sanitizeResponseMessages,
} from "@/lib/utils";
import { getCredentialByIdWithTokenQuery } from "@nech/supabase/queries";
import { createMessage } from "@nech/supabase/mutations";
import { revalidateTag } from "next/cache";
import { generateChatTitleAction } from "@/actions/generate-chat-title-action";
import { getChat } from "@nech/supabase/cached-queries";

export const maxDuration = 60;

export async function POST(request: Request) {
	const {
		id,
		credentialId,
		messages,
		modelId,
	}: {
		id: string;
		credentialId: string;
		messages: Array<Message>;
		modelId: string;
	} = await request.json();

	const supabase = await createClient();

	const model = models.find((model) => model.id === modelId);

	if (!model) {
		return new Response("Model not found", { status: 404 });
	}

	const coreMessages = convertToCoreMessages(messages);
	const userMessage = getMostRecentUserMessage(coreMessages);

	if (!userMessage) {
		return new Response("No user message found", { status: 400 });
	}
	const { data: credential } = await getCredentialByIdWithTokenQuery(
		supabase,
		credentialId,
	);

	if (!credential) {
		return new Response("No credential found", { status: 404 });
	}

	const { data: chat } = await getChat(id);

	let chatSystemPrompt = systemPrompt;
	if (chat?.role_id && chat?.role) {
		chatSystemPrompt = chat.role?.content ?? systemPrompt;
	}

	if (!chat) {
		return new Response("Chat not found", { status: 404 });
	}

	if (chat.title === "New chat") {
		await generateChatTitleAction({
			content: userMessage.content as string,
			chatId: id,
		});
	}

	const { data: DBMessage } = await createMessage(supabase, {
		chatId: id,
		content: userMessage.content as string,
		role: userMessage.role,
		usage: {},
	});

	if (!DBMessage) {
		return new Response("Failed to create message", { status: 500 });
	}

	return createDataStreamResponse({
		execute: (dataStream) => {
			dataStream.writeData({
				type: "user-message-id",
				content: DBMessage.id,
			});

			const result = streamText({
				model: customModel(
					credential.default_model ?? model.id,
					credential.provider,
				),
				system: chatSystemPrompt,
				messages: coreMessages,
				maxSteps: 5,
				tools: {},
				onFinish: async ({ response, usage }) => {
					const responseMessagesWithoutIncompleteToolCalls =
						sanitizeResponseMessages(response.messages);

					await Promise.all(
						responseMessagesWithoutIncompleteToolCalls.map(async (message) => {
							const content = Array.isArray(message.content)
								? message.content
										.map((part) =>
											"text" in part ? part.text : JSON.stringify(part),
										)
										.join("")
								: message.content;

							const usageMetadata: Record<string, number> = {};
							if (usage) {
								usageMetadata.promptTokens = usage.promptTokens;
								usageMetadata.completionTokens = usage.completionTokens;
								usageMetadata.totalTokens = usage.totalTokens;

								const promptCost =
									(usage.promptTokens / 1000) * model.cost.input;
								const completionCost =
									(usage.completionTokens / 1000) * model.cost.output;

								usageMetadata.promptCost = promptCost;
								usageMetadata.completionCost = completionCost;
								usageMetadata.totalCost = promptCost + completionCost;
							}

							const { data: savedMessage } = await createMessage(supabase, {
								chatId: id,
								content,
								role: message.role,
								usage: usageMetadata,
							});

							if (!savedMessage) {
								throw new Error("Failed to save message");
							}

							if (message.role === "assistant") {
								dataStream.writeMessageAnnotation({
									messageIdFromServer: savedMessage.id,
								});
							}
						}),
					);
					revalidateTag(`chat_total_cost_${id}`);
				},
				experimental_telemetry: {
					isEnabled: true,
					functionId: "stream-text",
				},
			});

			result.mergeIntoDataStream(dataStream);
		},
	});
}

export async function DELETE(request: Request) {}
