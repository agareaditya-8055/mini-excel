import { memo, useCallback, type RefObject, type UIEvent } from 'react';
import type { Row as TableRow } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import type { GridRow } from '../types/grid.types';
import { Row } from './Row';
import { useGridUIStore } from '../stores/gridUI.store';

type Props = {
  bodyHeight: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  tableRows: TableRow<GridRow>[];
  containerRef: RefObject<HTMLDivElement>;
};

function VirtualizedBodyView({ bodyHeight, rowVirtualizer, tableRows, containerRef }: Props) {
  const setScrollTop = useGridUIStore((state) => state.setScrollTop);

  const onScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop);
    },
    [setScrollTop],
  );

  return (
    <div
      ref={containerRef}
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
            return <Row key={row.id} row={row} top={virtualRow.start} />;
          })}
        </div>
      )}
    </div>
  );
}

export const VirtualizedBody = memo(VirtualizedBodyView);
