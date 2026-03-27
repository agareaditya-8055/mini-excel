import { memo, useCallback, useRef, type UIEvent } from 'react';
import type { Row as TableRow, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { GridRow } from '../types/grid.types';
import { Row } from './Row';
import { useGridUIStore } from '../stores/gridUI.store';
import { Header } from './Header';

type Props = {
  table: Table<GridRow>;
  bodyHeight: number;
  rowHeight: number;
  tableRows: TableRow<GridRow>[];
};

function VirtualizedBodyView({ table, bodyHeight, rowHeight, tableRows }: Props) {
  const setScrollTop = useGridUIStore((state) => state.setScrollTop);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 18,
  });

  const onScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop);
    },
    [setScrollTop],
  );

  const virtualItems = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <div
      ref={parentRef}
      className="relative overflow-auto bg-white"
      style={{ height: bodyHeight }}
      onScroll={onScroll}
    >
      <Header table={table} />
      {tableRows.length === 0 ? (
        <div className="grid h-full place-items-center text-sm text-slate-500">No rows match the current filter.</div>
      ) : (
        <div>
          {paddingTop > 0 ? <div style={{ height: paddingTop }} /> : null}
          {virtualItems.map((virtualRow) => {
            const row = tableRows[virtualRow.index];
            if (!row) {
              return null;
            }
            return <Row key={row.id} row={row} />;
          })}
          {paddingBottom > 0 ? <div style={{ height: paddingBottom }} /> : null}
        </div>
      )}
    </div>
  );
}

export const VirtualizedBody = memo(VirtualizedBodyView);
