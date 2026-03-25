import { memo, useCallback } from 'react';
import { type Cell as TableCell } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';
import { useGridSelection } from '../hooks/useGridSelection';

type Props = {
  cell: TableCell<GridRow, unknown>;
  rowId: string;
};

function CellView({ cell, rowId }: Props) {
  const { selectedCell, selectCell } = useGridSelection();

  const columnId = cell.column.id;
  const isSelected = selectedCell?.rowId === rowId && selectedCell.columnId === columnId;
  const isEvenRow = cell.row.index % 2 === 0;

  const onClick = useCallback(() => {
    selectCell({ rowId, columnId });
  }, [columnId, rowId, selectCell]);

  return (
    <div
      role="gridcell"
      onClick={onClick}
      className={`truncate border-b border-r border-slate-200 px-3 py-2 text-sm ${
        isSelected ? 'bg-blue-50 ring-1 ring-blue-400' : isEvenRow ? 'bg-white' : 'bg-slate-50/70'
      }`}
      style={{ width: cell.column.getSize() }}
    >
      {String(cell.getValue() ?? '')}
    </div>
  );
}

export const Cell = memo(CellView);
