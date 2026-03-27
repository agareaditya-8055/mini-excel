import { memo } from 'react';
import type { Row as TableRow } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';
import { Cell } from './Cell';

type Props = {
  row: TableRow<GridRow>;
};

function RowView({ row }: Props) {
  return (
    <div role="row" className="flex w-full" style={{ height: 40 }}>
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} rowId={row.id} />
      ))}
    </div>
  );
}

export const Row = memo(RowView);
