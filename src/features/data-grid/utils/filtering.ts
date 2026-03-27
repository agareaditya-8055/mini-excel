import type { GridFilterState, GridRow } from '../types/grid.types';
import { SCORE_RANGE_OPTIONS } from '../constants/grid.constants';

export function textFilterRow(row: GridRow, filter: GridFilterState): boolean {
  const search = filter.query.trim().toLowerCase();
  const hasScoreFilter = filter.scoreRanges.length > 0;

  const matchesQuery =
    !search || Object.values(row).some((value) => String(value).toLowerCase().includes(search));

  const matchesScore =
    !hasScoreFilter ||
    SCORE_RANGE_OPTIONS.some(
      (range) => filter.scoreRanges.includes(range.id) && row.score >= range.min && row.score <= range.max,
    );

  return matchesQuery && matchesScore;
}
