import type { Metadata } from "next";
import Image from "next/image";
import alex from "public/alex.jpeg";

export const metadata: Metadata = {
	title: "About the Founder",
	description:
		"Meet Alex Vakhitov, the founder of Nech, and learn about his vision for the future of AI tooling.",
};

export default function Page() {
	return (
		<div className="flex justify-center py-24 md:py-32">
			<div className="max-w-[980px] w-full">
				<div className="rounded-xl border border-gray-800 bg-black/50 p-8 backdrop-blur">
					<h1 className="font-medium text-center text-5xl mb-16 leading-snug bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
						From Energy Tech to AI: <br />A Builder's Journey
					</h1>

					<div className="space-y-12">
						<section>
							<h3 className="font-medium text-xl mb-4 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
								The Journey
							</h3>
							<p className="text-gray-400 leading-relaxed">
								As a co-founder and CTO of a leading SaaS company in the UK
								energy sector, I've experienced firsthand the transformative
								power of technology. After successfully building and selling our
								company, I gained invaluable insights into creating products
								that truly matter. But throughout this journey, I noticed a
								persistent challenge that kept surfacing.
							</p>
						</section>

						<section>
							<h3 className="font-medium text-xl mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
								The Challenge
							</h3>
							<p className="text-gray-400 leading-relaxed">
								While AI models are becoming increasingly powerful, teams
								struggle with fragmented tooling, inconsistent workflows, and
								the complexity of managing multiple AI providers. Engineers and
								product teams waste countless hours switching between different
								interfaces, managing API keys, and reinventing collaboration
								patterns. I realized that the missing piece wasn't another AI
								model—it was a unified platform that could bring order to this
								chaos.
							</p>
						</section>

						<section>
							<h3 className="font-medium text-xl mb-4 bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
								The Vision
							</h3>
							<p className="text-gray-400 leading-relaxed">
								This is why I'm building Nech. As an engineer, entrepreneur, and
								AI enthusiast, I envision a future where teams can harness the
								full potential of AI without the current operational overhead.
								Nech isn't just another tool—it's a carefully crafted platform
								that brings together the best AI models in one place, with
								collaboration and efficiency at its core.
							</p>
						</section>

						<section>
							<h3 className="font-medium text-xl mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
								Open Source First
							</h3>
							<p className="text-gray-400 leading-relaxed mb-12">
								I believe that the future of AI tooling should be built in the
								open, with transparency and community at its heart. That's why
								Nech is open source. We're creating a platform that not only
								solves today's challenges but evolves with the community's
								needs, fostering innovation and collaboration in the rapidly
								advancing world of AI.
							</p>
						</section>

						<Image
							src={alex}
							width={800}
							height={514}
							alt="Alex Vakhitov"
							className="rounded-lg border border-gray-800/50"
							priority
						/>

						<div className="flex items-center pt-6 border-t border-gray-800">
							<div className="space-y-1">
								<p className="text-sm text-gray-400">Best regards,</p>
								<p className="font-medium">Alex Vakhitov</p>
								<p className="text-sm text-gray-400">Founder & CEO, Nech</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
