import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="py-8 md:py-12">
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
						<div>
							<h3 className="font-medium mb-4">Product</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/#features"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href="/#pricing"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Pricing
									</Link>
								</li>
								<li>
									<Link
										href="/updates"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Updates
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-medium mb-4">Company</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/about"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										About
									</Link>
								</li>
								<li>
									<a
										href="https://github.com/nech-ai/nech"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										GitHub
									</a>
								</li>
								<li>
									<a
										href="https://x.com/nechai_"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										X (Twitter)
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-medium mb-4">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/legal/privacy"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Privacy
									</Link>
								</li>
								<li>
									<Link
										href="/legal/terms"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Terms
									</Link>
								</li>
								<li>
									<Link
										href="/legal/cookies"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										Cookies
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-medium mb-4">Contact</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="mailto:alex@nech.ai"
										className="text-sm text-gray-400 hover:text-white transition-colors"
									>
										alex@nech.ai
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="mt-8 pt-8 border-t border-gray-800">
						<p className="text-sm text-gray-400">
							© {new Date().getFullYear()} Nech.AI by Comonad Limited. All
							rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
