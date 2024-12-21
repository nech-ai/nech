import { EditCredentialForm } from "@/components/settings/team/credentials/edit-credential-form";
import { getCredential } from "@nech/supabase/cached-queries";
import { notFound } from "next/navigation";

export async function generateMetadata() {
	return {
		title: "Update Credential",
	};
}

export default async function UpdateCredentialPage({
	params,
}: { params: { credId: string } }) {
	const result = await getCredential(params.credId);

	if (!result?.data) {
		notFound();
	}

	return (
		<div className="grid grid-cols-1 gap-6">
			<EditCredentialForm credential={result.data} />
		</div>
	);
}
