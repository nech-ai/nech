import { UpdateRoleForm } from "@/components/settings/team/roles/update-role-form";
import { getRole } from "@nech/supabase/cached-queries";
import { notFound } from "next/navigation";

export async function generateMetadata() {
	return {
		title: "Update Role",
	};
}

export default async function UpdateRolePage(props: {
	params: Promise<{ roleId: string }>;
}) {
	const { roleId } = await props.params;
	const roleData = await getRole(roleId);
	const role = roleData?.data;

	if (!role) {
		notFound();
	}

	return (
		<div className="grid grid-cols-1 gap-6">
			<UpdateRoleForm role={role} />
		</div>
	);
}
