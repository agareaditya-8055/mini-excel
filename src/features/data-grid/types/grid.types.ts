import type { ColumnDef, SortingState } from '@tanstack/react-table';

export type GridValue = string | number;

export type GridRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  score: number;
};

export type GridColumn = ColumnDef<GridRow>;

export type GridFilterState = {
  query: string;
  columnId: 'all' | keyof GridRow;
};

export type GridDataState = {
  rows: GridRow[];
  columns: GridColumn[];
  sorting: SortingState;
  filter: GridFilterState;
  setRows: (rows: GridRow[]) => void;
  setColumns: (columns: GridColumn[]) => void;
  setSorting: (sorting: SortingState) => void;
  setFilter: (filter: GridFilterState) => void;
};

export type CellPosition = {
  rowId: string;
  columnId: string;
};

export type GridUIState = {
  selectedCell: CellPosition | null;
  hoveredCell: CellPosition | null;
  scrollTop: number;
  setSelectedCell: (cell: CellPosition | null) => void;
  setHoveredCell: (cell: CellPosition | null) => void;
  setScrollTop: (value: number) => void;
};
