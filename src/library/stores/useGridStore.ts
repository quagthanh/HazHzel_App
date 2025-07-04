import { create } from "zustand";
interface GridState {
  column: 3 | 4 | 6;
  setColumCount: (number: 3 | 4 | 6) => void;
}
const useGridStore = create<GridState>((set) => ({
  column: 6,
  setColumCount: (number) => set({ column: number }),
}));
export default useGridStore;
