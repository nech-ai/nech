import { CreateRoleForm } from "@/components/settings/team/roles/create-role-form";

export async function generateMetadata() {
	return {
		title: "Create Role",
	};
}

export default async function CreateRolePage() {
	return (
		<div className="grid grid-cols-1 gap-6">
			<CreateRoleForm />
		</div>
	);
}
