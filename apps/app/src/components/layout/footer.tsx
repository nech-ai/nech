export function Footer() {
	return (
		<footer className="w-full p-4 text-center text-muted-foreground text-sm">
			<p>&copy; 2024 Nech.AI. All rights reserved.</p>
			<div className="mt-2">
				<a
					href="https://nech.ai/terms"
					className="mr-4 underline hover:text-foreground"
				>
					Terms & Conditions
				</a>
				<a
					href="https://nech.ai/privacy"
					className="underline hover:text-foreground"
				>
					Privacy Policy
				</a>
			</div>
		</footer>
	);
}
