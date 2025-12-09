import { create } from "zustand";

export const useAppStore = create((set) => ({
  reloaded: false,
  markReloaded: () => set({ reloaded: true }),
}));
