import { Button } from "@nech/ui/components/button";
import { Github } from "lucide-react";
import Link from "next/link";
import type { ButtonProps } from "@nech/ui/components/button";

interface GitHubButtonProps extends ButtonProps {
	children: React.ReactNode;
}

export function GitHubButton({ children, ...props }: GitHubButtonProps) {
	return (
		<Link href="https://github.com/nech-ai/nech">
			<Button
				variant="outline"
				className="border-gray-800 bg-black/50 text-gray-300 backdrop-blur hover:border-gray-700 hover:bg-gray-900 hover:text-white"
				{...props}
			>
				<Github className="mr-2 h-4 w-4" />
				{children}
			</Button>
		</Link>
	);
}
