export async function generateMetadata() {
	return {
		title: "Update Credential",
	};
}

export default async function UpdateCredentialPage({
	params,
}: { params: { credId: string } }) {
	return <div className="grid grid-cols-1 gap-6" />;
}
