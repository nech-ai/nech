import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { Layout } from "@/components/layout";
import { PricingSection } from "@/components/pricing-section";
import { WhyChooseSection } from "@/components/why-choose-section";

export default function Page() {
	return (
		<Layout>
			<HeroSection />
			<FeaturesSection />
			<WhyChooseSection />
			<PricingSection />
			<CTASection />
		</Layout>
	);
}
