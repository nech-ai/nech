import type { ChatRequestOptions, Message } from "ai";
import { PreviewMessage, ThinkingMessage } from "./message";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { memo } from "react";

interface MessagesProps {
	chatId: string;
	isLoading: boolean;
	messages: Array<Message>;
	setMessages: (
		messages: Message[] | ((messages: Message[]) => Message[]),
	) => void;
	reload: (
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
}

function PureMessages({
	chatId,
	isLoading,
	messages,
	setMessages,
	reload,
}: MessagesProps) {
	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();

	return (
		<div
			ref={messagesContainerRef}
			className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-auto pb-4"
		>
			{/* {messages.length === 0 && <Overview />} */}

			{messages.map((message, index) => (
				<PreviewMessage
					key={message.id}
					chatId={chatId}
					message={message}
					isLoading={isLoading && messages.length - 1 === index}
					setMessages={setMessages}
					reload={reload}
				/>
			))}

			{isLoading &&
				messages.length > 0 &&
				messages[messages.length - 1]?.role === "user" && <ThinkingMessage />}

			<div
				ref={messagesEndRef}
				className="shrink-0 min-w-[24px] min-h-[24px]"
			/>
		</div>
	);
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
	if (prevProps.isLoading !== nextProps.isLoading) return false;
	if (prevProps.isLoading && nextProps.isLoading) return false;
	if (prevProps.messages.length !== nextProps.messages.length) return false;

	return true;
});
