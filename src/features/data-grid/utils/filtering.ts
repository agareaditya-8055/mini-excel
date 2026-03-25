import type { GridRow } from '../types/grid.types';

export function textFilterRow(row: GridRow, search: string): boolean {
  if (!search) {
    return true;
  }

  const normalized = search.toLowerCase();
  return Object.values(row).some((value) => String(value).toLowerCase().includes(normalized));
}
