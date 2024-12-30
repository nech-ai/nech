"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";
import { MultimodalInput } from "./multimodal-input";
import { Messages } from "./messages";

export function Chat({
	id,
	initialMessages,
	selectedModelId,
	selectedCredentialId,
}: {
	id: string;
	initialMessages: Array<Message>;
	selectedModelId: string;
	selectedCredentialId: string;
}) {
	const {
		messages,
		setMessages,
		handleSubmit,
		input,
		setInput,
		append,
		isLoading,
		stop,
		reload,
	} = useChat({
		id,
		body: { id, credentialId: selectedCredentialId, modelId: selectedModelId },
		initialMessages,
		experimental_throttle: 100,
	});

	const [attachments, setAttachments] = useState<Array<Attachment>>([]);

	return (
		<div className="flex flex-col h-full relative">
			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-3xl px-4">
					<div className="py-4 space-y-5">
						<Messages
							chatId={id}
							isLoading={isLoading}
							messages={messages}
							setMessages={setMessages}
							reload={reload}
						/>
					</div>
				</div>
			</div>

			{/* Input Container */}
			<div className="border-t bg-background/95 backdrop-blur sticky bottom-0">
				<div className="pointer-events-none absolute inset-x-0 -top-12 h-12 bg-gradient-to-t from-background to-transparent" />
				<div className="mx-auto max-w-3xl p-4">
					<form
						onSubmit={handleSubmit}
						className="flex rounded-lg border bg-background p-2 shadow hover:shadow-md transition-shadow"
					>
						<MultimodalInput
							chatId={id}
							input={input}
							setInput={setInput}
							handleSubmit={handleSubmit}
							isLoading={isLoading}
							stop={stop}
							attachments={attachments}
							setAttachments={setAttachments}
							messages={messages}
							setMessages={setMessages}
							append={append}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
