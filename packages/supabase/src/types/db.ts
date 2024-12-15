import type { MergeDeep } from "type-fest";

import type {
	Database as DatabaseGenerated,
	Enums,
	Json,
	Tables,
	TablesUpdate,
} from "./db.generated";

export type { Tables, TablesUpdate, Enums, Json };

export type Database = MergeDeep<
	DatabaseGenerated,
	{
		public: {
			Tables: {
				teams: {
					Row: {
						id: string;
						name: string;
					};
				};
				team_memberships: {
					Row: {
						user_id: string;
						team_id: string;
						user: DatabaseGenerated["public"]["Tables"]["users"]["Row"] | null;
						team: DatabaseGenerated["public"]["Tables"]["teams"]["Row"] | null;
					};
				};
				team_invitations: {
					Row: {
						team: DatabaseGenerated["public"]["Tables"]["teams"]["Row"] | null;
						invited_by:
							| DatabaseGenerated["public"]["Tables"]["users"]["Row"]
							| null;
					};
				};
			};
		};
	}
>;

export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];

export type TeamMembership =
	Database["public"]["Tables"]["team_memberships"]["Row"];
export type TeamInvitation =
	Database["public"]["Tables"]["team_invitations"]["Row"];

export type TeamMemberRoleType = Database["public"]["Enums"]["team_role"];
