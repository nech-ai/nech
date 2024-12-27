"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { useUserMessageId } from "@/hooks/use-user-message-id";

type DataStreamDelta = {
	type: "text-delta" | "title" | "id" | "clear" | "finish" | "user-message-id";
	content: string;
};

export function DataStreamHandler({ id }: { id: string }) {
	const { data: dataStream } = useChat({ id });
	const { setUserMessageIdFromServer } = useUserMessageId();
	const lastProcessedIndex = useRef(-1);

	useEffect(() => {
		if (!dataStream?.length) return;

		const newDeltas = dataStream.slice(lastProcessedIndex.current + 1);
		lastProcessedIndex.current = dataStream.length - 1;

		(newDeltas as DataStreamDelta[]).forEach((delta: DataStreamDelta) => {
			if (delta.type === "user-message-id") {
				setUserMessageIdFromServer(delta.content as string);
				return;
			}
		});
	}, [dataStream, setUserMessageIdFromServer]);

	return null;
}
