import { CreateCredentialForm } from "@/components/settings/team/credentials/create-credential-form";

export async function generateMetadata() {
	return {
		title: "Create Credential",
	};
}

export default async function CreateCredentialPage() {
	return (
		<div className="grid grid-cols-1 gap-6">
			<CreateCredentialForm />
		</div>
	);
}
