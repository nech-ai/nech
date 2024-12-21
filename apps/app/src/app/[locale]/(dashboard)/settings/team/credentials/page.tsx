import { CredentialsBlock } from "@/components/settings/team/credentials/credentials-block";
import { getCredentials } from "@nech/supabase/cached-queries";

export async function generateMetadata() {
	return {
		title: "Credentials",
	};
}

export default async function CredentialsPage() {
	// @ts-expect-error
	const { data: credentials } = await getCredentials();

	return (
		<div className="grid grid-cols-1 gap-6">
			<CredentialsBlock credentials={credentials} />
		</div>
	);
}
