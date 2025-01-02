import type { Database } from "@nech/supabase/types";

export type Role = Database["public"]["Tables"]["roles"]["Row"];

export interface RoleFormValues {
	name: string;
	content: string;
	description?: string;
	isDefault?: boolean;
	temperature?: number;
	redirectTo?: string;
	revalidatePath?: string;
}

export interface UpdateRoleFormValues extends RoleFormValues {
	id: string;
}
