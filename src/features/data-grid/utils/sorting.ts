import type { SortingState } from '@tanstack/react-table';

export function nextSortingState(current: SortingState, columnId: string): SortingState {
  const existing = current.find((item) => item.id === columnId);

  if (!existing) {
    return [{ id: columnId, desc: false }];
  }

  if (!existing.desc) {
    return [{ id: columnId, desc: true }];
  }

  return [];
}
