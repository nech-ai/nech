"use client";

export function Footer() {
	return (
		<footer className="w-full p-4 text-center text-muted-foreground text-sm mt-auto flex items-center justify-center gap-4">
			<p>&copy; 2024 Nech.AI. All rights reserved.</p>
			<a
				href="https://nech.ai/terms"
				className="underline hover:text-foreground"
			>
				Terms & Conditions
			</a>
			<a
				href="https://nech.ai/privacy"
				className="underline hover:text-foreground"
			>
				Privacy Policy
			</a>
		</footer>
	);
}
