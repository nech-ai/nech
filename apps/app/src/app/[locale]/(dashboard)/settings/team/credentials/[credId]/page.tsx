import { EditCredentialForm } from "@/components/settings/team/credentials/edit-credential-form";
import { getCredential } from "@nech/supabase/cached-queries";
import { notFound } from "next/navigation";

export async function generateMetadata() {
	return {
		title: "Update Credential",
	};
}

export default async function UpdateCredentialPage(props: {
	params: Promise<{ credId: string }>;
}) {
	const { credId } = await props.params;
	// @ts-expect-error
	const { data: credential } = await getCredential(credId);

	if (!credential) {
		notFound();
	}

	return (
		<div className="grid grid-cols-1 gap-6">
			<EditCredentialForm credential={credential} />
		</div>
	);
}
