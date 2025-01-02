"use client";
import type { Role } from "./types";
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
					<Link href={`/settings/team/roles/${id}`}>
						<Pencil className="mr-2 h-4 w-4" />
						Edit
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function RolesList({ roles }: { roles: Role[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const columns: ColumnDef<Role>[] = [
		{
			id: "name",
			header: "Name",
			accessorFn: (row) => row.name,
		},
		{
			id: "description",
			header: "Description",
			accessorFn: (row) => row.description || "No description",
		},
		{
			id: "isDefault",
			header: "Default",
			accessorFn: (row) => row.is_default,
			cell: ({ row }) => <span>{row.original.is_default ? "Yes" : "No"}</span>,
		},
		{
			id: "createdAt",
			header: "Created",
			accessorFn: (row) => row.created_at,
			cell: ({ row }) =>
				format(new Date(row.original.created_at), "MMM d, yyyy"),
		},
		{
			id: "temperature",
			header: "Temperature",
			accessorFn: (row) => row.temperature,
			cell: ({ row }) => (
				<span>{row.original.temperature?.toFixed(2) || "0.70"}</span>
			),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => <ActionsCell id={row.original.id} />,
		},
	];

	const table = useReactTable({
		data: roles,
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
		<div className="rounded-md border">
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
