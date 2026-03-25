import { useEffect, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 12,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rowVirtualizer, tableRows.length]);

  return {
    table,
    tableRows,
    containerRef,
    rowVirtualizer,
    bodyHeight: GRID_BODY_HEIGHT,
  };
}
