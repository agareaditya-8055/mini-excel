import { create } from 'zustand';
import type { GridUIState } from '../types/grid.types';

export const useGridUIStore = create<GridUIState>((set) => ({
  selectedCell: null,
  hoveredCell: null,
  scrollTop: 0,
  setSelectedCell: (selectedCell) => set({ selectedCell }),
  setHoveredCell: (hoveredCell) => set({ hoveredCell }),
  setScrollTop: (scrollTop) => set({ scrollTop }),
}));
