import type { Column, RowData } from "@tanstack/react-table";
import { create } from "zustand";

interface ChatsState {
	columns: Column<RowData, any>[];
	setColumns: (columns?: Column<RowData, any>[]) => void;
}

export const useChatsStore = create<ChatsState>()((set) => ({
	columns: [],
	setColumns: (columns) => set({ columns }),
}));
