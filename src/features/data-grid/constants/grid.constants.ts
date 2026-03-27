import type { ColumnDef } from '@tanstack/react-table';
import type { GridRow } from '../types/grid.types';

export const DEFAULT_ROW_COUNT = 10000;
export const ROW_HEIGHT = 40;
export const GRID_BODY_HEIGHT = 560;
export const SCORE_RANGE_OPTIONS = [
  { id: '0-20', label: '0-20', min: 0, max: 20 },
  { id: '21-40', label: '21-40', min: 21, max: 40 },
  { id: '41-60', label: '41-60', min: 41, max: 60 },
  { id: '61-80', label: '61-80', min: 61, max: 80 },
  { id: '81-100', label: '81-100', min: 81, max: 100 },
] as const;

export const DEFAULT_COLUMNS: ColumnDef<GridRow>[] = [
  { accessorKey: 'id', header: 'ID', size: 90 },
  { accessorKey: 'firstName', header: 'First Name', size: 180 },
  { accessorKey: 'lastName', header: 'Last Name', size: 180 },
  { accessorKey: 'email', header: 'Email', size: 260 },
  { accessorKey: 'city', header: 'City', size: 180 },
  { accessorKey: 'score', header: 'Score', size: 120 },
];
