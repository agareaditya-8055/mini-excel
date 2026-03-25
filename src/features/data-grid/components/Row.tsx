import { memo } from 'react';
import type { Row as TableRow } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';
import { Cell } from './Cell';

type Props = {
  row: TableRow<GridRow>;
  top: number;
};

function RowView({ row, top }: Props) {
  return (
    <div
      role="row"
      className="absolute left-0 flex w-full"
      style={{ transform: `translateY(${top}px)` }}
    >
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} rowId={row.id} />
      ))}
    </div>
  );
}

export const Row = memo(RowView);
