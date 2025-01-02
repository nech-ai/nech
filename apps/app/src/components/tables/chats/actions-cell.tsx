import { Button } from "@nech/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nech/ui/components/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

interface ActionsCellProps {
	id: string;
}

export function ActionsCell({ id }: ActionsCellProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost">
					<MoreVerticalIcon className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem asChild>
					<Link href={`/chats/${id}`}>View</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
