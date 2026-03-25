import { useMemo } from 'react';
import { Header } from './Header';
import { VirtualizedBody } from './VirtualizedBody';
import { useVirtualGrid } from '../hooks/useVirtualGrid';
import { useGridDataStore } from '../stores/gridData.store';
import { useGridKeyboard } from '../hooks/useGridKeyboard';

export function Grid() {
  const filter = useGridDataStore((state) => state.filter);
  const setFilter = useGridDataStore((state) => state.setFilter);

  const { table, tableRows, containerRef, rowVirtualizer, bodyHeight } = useVirtualGrid();

  const columnIds = useMemo(() => table.getAllLeafColumns().map((column) => column.id), [table]);
  const onKeyDown = useGridKeyboard({ rows: tableRows, columnIds });

  return (
    <section className="rounded-lg border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3">
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Filter rows..."
          className="w-full max-w-sm rounded border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
        />
      </div>
      <div role="grid" tabIndex={0} onKeyDown={onKeyDown} className="outline-none">
        <Header table={table} />
        <VirtualizedBody
          bodyHeight={bodyHeight}
          rowVirtualizer={rowVirtualizer}
          tableRows={tableRows}
          containerRef={containerRef}
        />
      </div>
    </section>
  );
}
