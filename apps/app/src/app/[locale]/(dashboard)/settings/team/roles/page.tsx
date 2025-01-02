import { RolesBlock } from "@/components/settings/team/roles/roles-block";
import { getRoles } from "@nech/supabase/cached-queries";

export async function generateMetadata() {
	return {
		title: "Roles",
	};
}

export default async function RolesPage() {
	// @ts-expect-error
	const { data: roles } = await getRoles();

	return (
		<div className="grid grid-cols-1 gap-6">
			<RolesBlock roles={roles} />
		</div>
	);
}
