"use client";
import type { Database } from "@nech/supabase/types";
import {} from "@nech/ui/components/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ActionsCell } from "./actions-cell";

export type ChatsOutput = Partial<
	Database["public"]["Tables"]["chats"]["Row"] & {
		created_by: Partial<Database["public"]["Tables"]["users"]["Row"]> | null;
		credential: Partial<
			Database["public"]["Tables"]["credentials"]["Row"]
		> | null;
		role: Partial<Database["public"]["Tables"]["roles"]["Row"]> | null;
	}
>;

export const columns: ColumnDef<ChatsOutput>[] = [
	{
		header: "Title",
		accessorKey: "title",
		enableSorting: true,
		accessorFn: (row) => row.title || "N/A",
	},
	{
		header: "Created By",
		accessorKey: "created_by",
		enableSorting: true,
		accessorFn: (row) => row.created_by?.full_name || "N/A",
	},
	{
		header: "Model",
		accessorKey: "model",
		enableSorting: true,
		accessorFn: (row) => row.model || "N/A",
	},
	{
		header: "Credential",
		accessorKey: "credential",
		enableSorting: true,
		accessorFn: (row) => row.credential?.name || "N/A",
	},
	{
		header: "Role",
		accessorKey: "role",
		enableSorting: true,
		accessorFn: (row) => row.role?.name || "N/A",
	},
	{
		header: "Created At",
		accessorKey: "created_at",
		enableSorting: true,
		accessorFn: (row) => row.created_at,
		cell: ({ row }) =>
			format(new Date(row.original.created_at ?? ""), "yyyy-MM-dd HH:mm:ss"),
	},
	{
		header: "",
		accessorKey: "actions",
		cell: ({ row }) => <ActionsCell id={row.original.id ?? ""} />,
	},
];
