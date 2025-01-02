export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			chats: {
				Row: {
					created_at: string;
					created_by_id: string;
					credential_id: string;
					id: string;
					metadata: Json | null;
					model: string;
					role_id: string | null;
					system_prompt: string | null;
					team_id: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					created_by_id: string;
					credential_id: string;
					id?: string;
					metadata?: Json | null;
					model: string;
					role_id?: string | null;
					system_prompt?: string | null;
					team_id: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					created_by_id?: string;
					credential_id?: string;
					id?: string;
					metadata?: Json | null;
					model?: string;
					role_id?: string | null;
					system_prompt?: string | null;
					team_id?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "chats_created_by_id_fkey";
						columns: ["created_by_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "chats_credential_id_fkey";
						columns: ["credential_id"];
						isOneToOne: false;
						referencedRelation: "credentials";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "chats_role_id_fkey";
						columns: ["role_id"];
						isOneToOne: false;
						referencedRelation: "roles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "chats_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
				];
			};
			credentials: {
				Row: {
					archived_at: string | null;
					created_at: string;
					created_by_id: string;
					default_model: string | null;
					default_temperature: number | null;
					id: string;
					is_default: boolean | null;
					last_used_at: string | null;
					masked_value: string | null;
					metadata: Json | null;
					name: string;
					provider: Database["public"]["Enums"]["provider"];
					team_id: string;
					type: Database["public"]["Enums"]["credential_type"];
					updated_at: string;
					value: string;
				};
				Insert: {
					archived_at?: string | null;
					created_at?: string;
					created_by_id: string;
					default_model?: string | null;
					default_temperature?: number | null;
					id?: string;
					is_default?: boolean | null;
					last_used_at?: string | null;
					masked_value?: string | null;
					metadata?: Json | null;
					name: string;
					provider: Database["public"]["Enums"]["provider"];
					team_id: string;
					type: Database["public"]["Enums"]["credential_type"];
					updated_at?: string;
					value: string;
				};
				Update: {
					archived_at?: string | null;
					created_at?: string;
					created_by_id?: string;
					default_model?: string | null;
					default_temperature?: number | null;
					id?: string;
					is_default?: boolean | null;
					last_used_at?: string | null;
					masked_value?: string | null;
					metadata?: Json | null;
					name?: string;
					provider?: Database["public"]["Enums"]["provider"];
					team_id?: string;
					type?: Database["public"]["Enums"]["credential_type"];
					updated_at?: string;
					value?: string;
				};
				Relationships: [
					{
						foreignKeyName: "credentials_created_by_id_fkey";
						columns: ["created_by_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "credentials_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
				];
			};
			documents: {
				Row: {
					content: string;
					created_at: string;
					id: string;
					kind: Database["public"]["Enums"]["document_kind"];
					team_id: string;
					updated_at: string;
					user_id: string | null;
				};
				Insert: {
					content: string;
					created_at?: string;
					id?: string;
					kind: Database["public"]["Enums"]["document_kind"];
					team_id: string;
					updated_at?: string;
					user_id?: string | null;
				};
				Update: {
					content?: string;
					created_at?: string;
					id?: string;
					kind?: Database["public"]["Enums"]["document_kind"];
					team_id?: string;
					updated_at?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "documents_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "documents_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			messages: {
				Row: {
					chat_id: string;
					content: string;
					created_at: string;
					id: string;
					metadata: Json | null;
					parent_id: string | null;
					role: Database["public"]["Enums"]["role"];
					tokens_used: number | null;
					type: Database["public"]["Enums"]["message_type"];
					updated_at: string;
				};
				Insert: {
					chat_id: string;
					content: string;
					created_at?: string;
					id?: string;
					metadata?: Json | null;
					parent_id?: string | null;
					role: Database["public"]["Enums"]["role"];
					tokens_used?: number | null;
					type: Database["public"]["Enums"]["message_type"];
					updated_at?: string;
				};
				Update: {
					chat_id?: string;
					content?: string;
					created_at?: string;
					id?: string;
					metadata?: Json | null;
					parent_id?: string | null;
					role?: Database["public"]["Enums"]["role"];
					tokens_used?: number | null;
					type?: Database["public"]["Enums"]["message_type"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "messages_chat_id_fkey";
						columns: ["chat_id"];
						isOneToOne: false;
						referencedRelation: "chats";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "messages_parent_id_fkey";
						columns: ["parent_id"];
						isOneToOne: false;
						referencedRelation: "messages";
						referencedColumns: ["id"];
					},
				];
			};
			roles: {
				Row: {
					archived_at: string | null;
					content: string;
					created_at: string;
					created_by_id: string;
					description: string | null;
					id: string;
					is_default: boolean | null;
					metadata: Json | null;
					name: string;
					team_id: string;
					temperature: number | null;
					updated_at: string;
				};
				Insert: {
					archived_at?: string | null;
					content: string;
					created_at?: string;
					created_by_id: string;
					description?: string | null;
					id?: string;
					is_default?: boolean | null;
					metadata?: Json | null;
					name: string;
					team_id: string;
					temperature?: number | null;
					updated_at?: string;
				};
				Update: {
					archived_at?: string | null;
					content?: string;
					created_at?: string;
					created_by_id?: string;
					description?: string | null;
					id?: string;
					is_default?: boolean | null;
					metadata?: Json | null;
					name?: string;
					team_id?: string;
					temperature?: number | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "roles_created_by_id_fkey";
						columns: ["created_by_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "roles_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
				];
			};
			team_invitations: {
				Row: {
					created_at: string;
					email: string;
					expires_at: string;
					id: string;
					invited_by_id: string | null;
					role: Database["public"]["Enums"]["team_role"];
					team_id: string;
				};
				Insert: {
					created_at?: string;
					email: string;
					expires_at?: string;
					id?: string;
					invited_by_id?: string | null;
					role?: Database["public"]["Enums"]["team_role"];
					team_id: string;
				};
				Update: {
					created_at?: string;
					email?: string;
					expires_at?: string;
					id?: string;
					invited_by_id?: string | null;
					role?: Database["public"]["Enums"]["team_role"];
					team_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "team_invitations_invited_by_id_fkey";
						columns: ["invited_by_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "team_invitations_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
				];
			};
			team_memberships: {
				Row: {
					created_at: string;
					id: string;
					is_creator: boolean;
					role: Database["public"]["Enums"]["team_role"];
					team_id: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_creator?: boolean;
					role?: Database["public"]["Enums"]["team_role"];
					team_id: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_creator?: boolean;
					role?: Database["public"]["Enums"]["team_role"];
					team_id?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "team_memberships_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "team_memberships_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			teams: {
				Row: {
					avatar_url: string | null;
					created_at: string;
					id: string;
					name: string;
					updated_at: string;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string;
					id?: string;
					name: string;
					updated_at?: string;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string;
					id?: string;
					name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			users: {
				Row: {
					avatar_url: string | null;
					created_at: string | null;
					email: string;
					full_name: string | null;
					id: string;
					is_admin: boolean | null;
					onboarded: boolean | null;
					team_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string | null;
					email: string;
					full_name?: string | null;
					id: string;
					is_admin?: boolean | null;
					onboarded?: boolean | null;
					team_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string | null;
					email?: string;
					full_name?: string | null;
					id?: string;
					is_admin?: boolean | null;
					onboarded?: boolean | null;
					team_id?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "fk_team";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			create_team: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			get_chat_total_cost: {
				Args: {
					chat_id: string;
				};
				Returns: number;
			};
			is_member_of: {
				Args: {
					_user_id: string;
					_team_id: string;
				};
				Returns: boolean;
			};
			is_owner_of: {
				Args: {
					_user_id: string;
					_team_id: string;
				};
				Returns: boolean;
			};
		};
		Enums: {
			credential_type: "API_KEY" | "URL";
			document_kind: "TEXT" | "CODE";
			message_type: "image" | "text";
			provider:
				| "OPENAI"
				| "ANTHROPIC"
				| "GOOGLE"
				| "AZURE"
				| "XAI"
				| "GROQ"
				| "MISTRAL";
			role: "user" | "assistant" | "system" | "tool";
			team_role: "OWNER" | "MEMBER";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
