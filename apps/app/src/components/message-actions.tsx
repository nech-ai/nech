import type { ChatRequestOptions, Message } from "ai";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import { CopyIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@nech/ui/components/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@nech/ui/components/tooltip";
import { memo } from "react";
import { useToast } from "@nech/ui/hooks/use-toast";
import { deleteTrailingMessagesAction } from "@/actions/delete-trailing-messages-action";

export function PureMessageActions({
	chatId,
	message,
	isLoading,
	reload,
	setMessages,
}: {
	chatId: string;
	message: Message;
	isLoading: boolean;
	reload: (
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
	setMessages: (
		messages: Message[] | ((messages: Message[]) => Message[]),
	) => void;
}) {
	const { toast } = useToast();
	const { mutate } = useSWRConfig();
	const [_, copyToClipboard] = useCopyToClipboard();

	if (isLoading) return null;
	if (message.role === "user") return null;
	if (message.toolInvocations && message.toolInvocations.length > 0)
		return null;

	return (
		<TooltipProvider delayDuration={0}>
			<div className="flex flex-row gap-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="py-1 px-2 h-fit text-muted-foreground"
							variant="outline"
							onClick={async () => {
								await deleteTrailingMessagesAction({
									chatId,
									messageId: message.id,
								});
								setMessages((messages) =>
									messages.slice(
										0,
										messages.findIndex((m) => m.id === message.id),
									),
								);
								reload();
							}}
						>
							<RefreshCwIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Regenerate response</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="py-1 px-2 h-fit text-muted-foreground"
							variant="outline"
							onClick={async () => {
								await copyToClipboard(message.content as string);
								toast({
									title: "Copied to clipboard!",
									description:
										"The message content has been copied to your clipboard.",
								});
							}}
						>
							<CopyIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Copy</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}

export const MessageActions = memo(
	PureMessageActions,
	(prevProps, nextProps) => {
		if (prevProps.isLoading !== nextProps.isLoading) return false;
		if (prevProps.message.id !== nextProps.message.id) return false;
		if (prevProps.chatId !== nextProps.chatId) return false;

		return true;
	},
);
