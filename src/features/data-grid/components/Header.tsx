import { memo } from 'react';
import { flexRender, type Table } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';

type Props = {
  table: Table<GridRow>;
};

function HeaderView({ table }: Props) {
  return (
    <div className="sticky top-0 z-20 flex border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      {table.getFlatHeaders().map((header) => (
        <button
          key={header.id}
          type="button"
          onClick={header.column.getToggleSortingHandler()}
          className="group flex h-11 items-center border-r border-slate-200 px-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 transition-colors hover:bg-slate-100"
          style={{ width: header.getSize() }}
        >
          <span className="truncate">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          <span className="ml-2 text-[10px] text-slate-500">
            {header.column.getIsSorted() === 'asc' ? '▲' : ' '}
            {header.column.getIsSorted() === 'desc' ? '▼' : ''}
          </span>
        </button>
      ))}
    </div>
  );
}

export const Header = memo(HeaderView);
