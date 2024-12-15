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
					created_at: string;
					created_by_id: string;
					id: string;
					metadata: Json | null;
					name: string;
					provider: Database["public"]["Enums"]["provider"];
					team_id: string;
					type: Database["public"]["Enums"]["credential_type"];
					updated_at: string;
					value: string;
				};
				Insert: {
					created_at?: string;
					created_by_id: string;
					id?: string;
					metadata?: Json | null;
					name: string;
					provider: Database["public"]["Enums"]["provider"];
					team_id: string;
					type: Database["public"]["Enums"]["credential_type"];
					updated_at?: string;
					value: string;
				};
				Update: {
					created_at?: string;
					created_by_id?: string;
					id?: string;
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
						referencedRelation: "latest_chat_messages";
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
			latest_chat_messages: {
				Row: {
					chat_id: string | null;
					chat_title: string | null;
					content: string | null;
					created_at: string | null;
					id: string | null;
					metadata: Json | null;
					parent_id: string | null;
					role: Database["public"]["Enums"]["role"] | null;
					team_id: string | null;
					tokens_used: number | null;
					type: Database["public"]["Enums"]["message_type"] | null;
					updated_at: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "chats_team_id_fkey";
						columns: ["team_id"];
						isOneToOne: false;
						referencedRelation: "teams";
						referencedColumns: ["id"];
					},
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
						referencedRelation: "latest_chat_messages";
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
		};
		Functions: {
			create_chat: {
				Args: {
					p_title: string;
					p_model: string;
					p_system_prompt?: string;
					p_metadata?: Json;
				};
				Returns: {
					created_at: string;
					created_by_id: string;
					credential_id: string;
					id: string;
					metadata: Json | null;
					model: string;
					system_prompt: string | null;
					team_id: string;
					title: string;
					updated_at: string;
				};
			};
			create_team: {
				Args: {
					name: string;
				};
				Returns: string;
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
			message_type:
				| "SYSTEM"
				| "USER"
				| "ASSISTANT"
				| "TOOL_CALL"
				| "TOOL_RESULT";
			provider: "OPENAI" | "ANTHROPIC" | "GOOGLE" | "AZURE" | "XAI";
			role: "USER" | "ASSISTANT" | "SYSTEM";
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
