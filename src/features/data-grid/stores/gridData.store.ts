import { create } from 'zustand';
import type { GridDataState } from '../types/grid.types';

export const useGridDataStore = create<GridDataState>((set) => ({
  rows: [],
  columns: [],
  sorting: [],
  filter: { query: '', scoreRanges: [] },
  setRows: (rows) => set({ rows }),
  setColumns: (columns) => set({ columns }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filter) => set({ filter }),
  updateCell: (rowId, columnId, value) =>
    set((state) => ({
      rows: state.rows.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        if (columnId === 'score') {
          const numeric = Number(value);
          return { ...row, score: Number.isFinite(numeric) ? numeric : row.score };
        }

        return { ...row, [columnId]: value };
      }),
    })),
}));
