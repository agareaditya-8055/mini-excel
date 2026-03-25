import type { GridFilterState, GridRow } from '../types/grid.types';

export function textFilterRow(row: GridRow, filter: GridFilterState): boolean {
  const search = filter.query.trim().toLowerCase();

  if (!search) {
    return true;
  }

  if (filter.columnId === 'all') {
    return Object.values(row).some((value) => String(value).toLowerCase().includes(search));
  }

  return String(row[filter.columnId]).toLowerCase().includes(search);
}
