export async function generateMetadata() {
	return {
		title: "Update Role",
	};
}

export default async function UpdateRolePage({
	params,
}: { params: { roleId: string } }) {
	return <div className="grid grid-cols-1 gap-6" />;
}
