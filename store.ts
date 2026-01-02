import { create } from 'zustand';
import { AppState } from './types';

export const useStore = create<AppState>((set) => ({
  selectedNode: null,
  setSelectedNode: (id) => set({ selectedNode: id }),
  hoveredNode: null,
  setHoveredNode: (id) => set({ hoveredNode: id }),
}));