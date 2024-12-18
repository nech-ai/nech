import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { Layout } from "@/components/layout";
import { OpenSourceSection } from "@/components/open-source-section";
import { PricingSection } from "@/components/pricing-section";
import { ValueProposition } from "@/components/value-proposition";

export default function Page() {
	return (
		<Layout>
			<div className="flex flex-col divide-y divide-gray-800">
				<HeroSection />
				<ValueProposition />
				<FeaturesSection />
				<OpenSourceSection />
				<PricingSection />
				<CTASection />
			</div>
		</Layout>
	);
}
