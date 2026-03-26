import { useMemo } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { GRID_BODY_HEIGHT, ROW_HEIGHT } from '../constants/grid.constants';
import { useGridDataStore } from '../stores/gridData.store';
import { textFilterRow } from '../utils/filtering';

export function useVirtualGrid() {
  const rows = useGridDataStore((state) => state.rows);
  const columns = useGridDataStore((state) => state.columns);
  const sorting = useGridDataStore((state) => state.sorting);
  const filter = useGridDataStore((state) => state.filter);
  const setSorting = useGridDataStore((state) => state.setSorting);

  const filteredRows = useMemo(() => rows.filter((row) => textFilterRow(row, filter)), [filter, rows]);

  const table = useReactTable({
    data: filteredRows,
    columns,
    getRowId: (row) => row.id,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const tableRows = table.getRowModel().rows;

  return {
    table,
    tableRows,
    bodyHeight: GRID_BODY_HEIGHT,
    rowHeight: ROW_HEIGHT,
  };
}
