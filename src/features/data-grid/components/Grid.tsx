import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Header } from './Header';
import { VirtualizedBody } from './VirtualizedBody';
import { useVirtualGrid } from '../hooks/useVirtualGrid';
import { useGridDataStore } from '../stores/gridData.store';
import { useGridKeyboard } from '../hooks/useGridKeyboard';

export function Grid() {
  const filter = useGridDataStore((state) => state.filter);
  const setFilter = useGridDataStore((state) => state.setFilter);
  const totalRows = useGridDataStore((state) => state.rows.length);

  const { table, tableRows, containerRef, rowVirtualizer, bodyHeight } = useVirtualGrid();
  const hasColumns = table.getAllLeafColumns().length > 0;
  const [draftFilter, setDraftFilter] = useState(filter.query);
  const deferredFilter = useDeferredValue(draftFilter);
  const activeColumnId = filter.columnId;

  useEffect(() => {
    setFilter({ query: deferredFilter, columnId: activeColumnId });
  }, [activeColumnId, deferredFilter, setFilter]);

  const columnIds = useMemo(() => table.getAllLeafColumns().map((column) => column.id), [table]);
  const onKeyDown = useGridKeyboard({ rows: tableRows, columnIds });

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 p-3">
        <input
          value={draftFilter}
          onChange={(event) => setDraftFilter(event.target.value)}
          placeholder="Search values..."
          className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 transition-shadow focus:shadow-sm focus:ring-2"
        />
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-500 focus:ring-2"
          value={activeColumnId}
          onChange={(event) => setFilter({ query: draftFilter, columnId: event.target.value as typeof filter.columnId })}
        >
          <option value="all">All Columns</option>
          {table.getAllLeafColumns().map((column) => (
            <option key={column.id} value={column.id}>
              {String(column.columnDef.header)}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          onClick={() => {
            setDraftFilter('');
            setFilter({ query: '', columnId: activeColumnId });
          }}
          disabled={!draftFilter}
        >
          Clear
        </button>
        <div className="ml-auto text-xs text-slate-600">
          Showing <span className="font-semibold text-slate-900">{tableRows.length.toLocaleString()}</span> of{' '}
          <span className="font-semibold text-slate-900">{totalRows.toLocaleString()}</span> rows
        </div>
      </div>
      {hasColumns ? (
        <div role="grid" tabIndex={0} onKeyDown={onKeyDown} className="outline-none">
          <Header table={table} />
          <VirtualizedBody
            bodyHeight={bodyHeight}
            rowVirtualizer={rowVirtualizer}
            tableRows={tableRows}
            containerRef={containerRef}
          />
        </div>
      ) : (
        <div className="p-6 text-sm text-slate-500">No columns configured.</div>
      )}
    </section>
  );
}
