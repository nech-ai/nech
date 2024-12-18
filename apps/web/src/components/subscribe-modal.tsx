"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@nech/ui/components/dialog";
import { SubscribeInput } from "./subscribe-form";

interface SubscribeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-black/95 border-gray-800 backdrop-blur-xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-center">
						Join the Waitlist
					</DialogTitle>
				</DialogHeader>
				<div className="p-6">
					<p className="text-gray-400 text-center mb-6">
						Be among the first to experience Nech and transform your AI
						workflow.
					</p>
					<SubscribeInput onSuccess={onClose} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
