import { create } from 'zustand'

export const useTabStore = create((set) => ({
  activeTab: 1,
  setActiveTab: (id) => set({ activeTab: id }),
})) 