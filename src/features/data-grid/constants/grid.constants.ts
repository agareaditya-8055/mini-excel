import type { ColumnDef } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';

export const DEFAULT_ROW_COUNT = 10000;
export const ROW_HEIGHT = 40;
export const GRID_BODY_HEIGHT = 560;

export const DEFAULT_COLUMNS: ColumnDef<GridRow>[] = [
  { accessorKey: 'id', header: 'ID', size: 90 },
  { accessorKey: 'firstName', header: 'First Name', size: 180 },
  { accessorKey: 'lastName', header: 'Last Name', size: 180 },
  { accessorKey: 'email', header: 'Email', size: 260 },
  { accessorKey: 'city', header: 'City', size: 180 },
  { accessorKey: 'score', header: 'Score', size: 120 },
];
