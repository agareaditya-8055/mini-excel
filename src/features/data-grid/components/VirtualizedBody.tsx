import { memo, useCallback, useRef, type UIEvent } from 'react';
import type { Row as TableRow } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { GridRow } from '../types/grid.types';
import { Row } from './Row';
import { useGridUIStore } from '../stores/gridUI.store';

type Props = {
  bodyHeight: number;
  rowHeight: number;
  tableRows: TableRow<GridRow>[];
};

function VirtualizedBodyView({ bodyHeight, rowHeight, tableRows }: Props) {
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

  return (
    <div
      ref={parentRef}
      className="relative overflow-auto bg-white"
      style={{ height: bodyHeight }}
      onScroll={onScroll}
    >
      {tableRows.length === 0 ? (
        <div className="grid h-full place-items-center text-sm text-slate-500">No rows match the current filter.</div>
      ) : (
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = tableRows[virtualRow.index];
            if (!row) {
              return null;
            }
            return <Row key={row.id} row={row} top={virtualRow.start} />;
          })}
        </div>
      )}
    </div>
  );
}

export const VirtualizedBody = memo(VirtualizedBodyView);
