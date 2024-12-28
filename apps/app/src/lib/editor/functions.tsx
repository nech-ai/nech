"use client";

import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { DOMParser, type Node } from "prosemirror-model";
import {
	type Decoration,
	DecorationSet,
	type EditorView,
} from "prosemirror-view";
import { renderToString } from "react-dom/server";

import { Markdown } from "@/components/markdown";

import { documentSchema } from "./config";

export const buildDocumentFromContent = (content: string) => {
	const parser = DOMParser.fromSchema(documentSchema);
	const stringFromMarkdown = renderToString(<Markdown>{content}</Markdown>);
	const tempContainer = document.createElement("div");
	tempContainer.innerHTML = stringFromMarkdown;
	return parser.parse(tempContainer);
};

export const buildContentFromDocument = (document: Node) => {
	return defaultMarkdownSerializer.serialize(document);
};

export const createDecorations = (view: EditorView) => {
	const decorations: Array<Decoration> = [];
	return DecorationSet.create(view.state.doc, decorations);
};
