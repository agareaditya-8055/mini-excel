import { create } from 'zustand';
import type { GridDataState } from '../types/grid.types';

export const useGridDataStore = create<GridDataState>((set) => ({
  rows: [],
  columns: [],
  sorting: [],
  filter: '',
  setRows: (rows) => set({ rows }),
  setColumns: (columns) => set({ columns }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filter) => set({ filter }),
}));
