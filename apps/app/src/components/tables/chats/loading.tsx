"use client";
import { Skeleton } from "@nech/ui/components/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@nech/ui/components/table";
import { cn } from "@nech/ui/utils";
import { DataTableHeader } from "./data-table-header";

const data = [...Array(10)].map((_, i) => ({ id: i.toString() }));

export function Loading({ isEmpty }: { isEmpty?: boolean }) {
	return (
		<div className="rounded-md border">
			<Table
				className={cn(isEmpty && "pointer-events-none opacity-20 blur-[7px]")}
			>
				<DataTableHeader loading />
				<TableBody>
					{data?.map((row) => (
						<TableRow key={row.id} className="group h-[45px]">
							{/* Title */}
							<TableCell className="w-[200px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[60%]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Created By */}
							<TableCell className="w-[150px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[50%]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Model */}
							<TableCell className="w-[100px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[50%]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Credential */}
							<TableCell className="w-[120px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[50%]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Role */}
							<TableCell className="w-[100px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[60%]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Created At */}
							<TableCell className="w-[150px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn("h-3.5 w-[80px]", isEmpty && "animate-none")}
								/>
							</TableCell>

							{/* Actions */}
							<TableCell className="w-[50px] group-first:rounded-t-md group-last:rounded-b-md">
								<Skeleton
									className={cn(
										"h-[20px] w-[20px] rounded-full",
										isEmpty && "animate-none",
									)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
