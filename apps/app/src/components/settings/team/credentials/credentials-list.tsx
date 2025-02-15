"use client";
import type { Database } from "@nech/supabase/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@nech/ui/components/table";
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nech/ui/components/dropdown-menu";
import { Button } from "@nech/ui/components/button";
import { MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PROVIDER_OPTIONS } from "./types";

type CredentialsOutput = Partial<
	Database["public"]["Tables"]["credentials"]["Row"]
>[];

function ActionsCell({ id }: { id: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link href={`/settings/team/credentials/${id}`}>
						<Pencil className="mr-2 h-4 w-4" />
						Edit
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function CredentialsList({
	credentials,
}: {
	credentials: CredentialsOutput;
}) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const columns: ColumnDef<CredentialsOutput[number]>[] = [
		{
			id: "name",
			header: "Name",
			accessorFn: (row) => row.name,
		},
		{
			id: "provider",
			header: "Provider",
			accessorFn: (row) => row.provider,
			cell: ({ row }) => (
				<span className="font-medium">
					{
						PROVIDER_OPTIONS[
							row.original.provider as keyof typeof PROVIDER_OPTIONS
						]?.label
					}
				</span>
			),
		},
		{
			id: "lastUsed",
			header: "Last Used",
			accessorFn: (row) => row.last_used_at,
			cell: ({ row }) =>
				row.original.last_used_at
					? format(new Date(row.original.last_used_at), "MMM d, yyyy")
					: "Never used",
		},
		{
			id: "actions",
			header: "",
			accessorKey: "actions",
			cell: ({ row }) => <ActionsCell id={row.original.id ?? ""} />,
		},
	];

	const table = useReactTable({
		data: credentials,
		columns,
		manualPagination: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className=" rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{table
							.getHeaderGroups()
							.map((headerGroup) =>
								headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								)),
							)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
