import { useCallback, type KeyboardEvent } from 'react';
import type { Row } from '@tanstack/react-table';
import { useGridSelection } from './useGridSelection';
import type { GridRow } from '../types/grid.types';

type KeyboardArgs = {
  rows: Row<GridRow>[];
  columnIds: string[];
};

export function useGridKeyboard({ rows, columnIds }: KeyboardArgs) {
  const { selectedCell, selectCell } = useGridSelection();

  return useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!selectedCell) {
        return;
      }

      const rowIndex = rows.findIndex((row) => row.id === selectedCell.rowId);
      const colIndex = columnIds.findIndex((id) => id === selectedCell.columnId);
      if (rowIndex < 0 || colIndex < 0) {
        return;
      }

      const move = (nextRow: number, nextCol: number) => {
        const boundedRow = Math.max(0, Math.min(rows.length - 1, nextRow));
        const boundedCol = Math.max(0, Math.min(columnIds.length - 1, nextCol));
        selectCell({ rowId: rows[boundedRow].id, columnId: columnIds[boundedCol] });
      };

      if (event.key === 'ArrowDown') move(rowIndex + 1, colIndex);
      if (event.key === 'ArrowUp') move(rowIndex - 1, colIndex);
      if (event.key === 'ArrowRight') move(rowIndex, colIndex + 1);
      if (event.key === 'ArrowLeft') move(rowIndex, colIndex - 1);
    },
    [columnIds, rows, selectCell, selectedCell],
  );
}
