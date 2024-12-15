import { teamContext } from "@/shared/lib/team-context";
import { useContext } from "react";

export function useTeam() {
	const context = useContext(teamContext);
	return context;
}
