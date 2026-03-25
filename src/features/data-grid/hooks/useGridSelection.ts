import { useCallback } from 'react';
import { useGridUIStore } from '../stores/gridUI.store';
import type { CellPosition } from '../types/grid.types';

export function useGridSelection() {
  const selectedCell = useGridUIStore((state) => state.selectedCell);
  const setSelectedCell = useGridUIStore((state) => state.setSelectedCell);

  const selectCell = useCallback(
    (cell: CellPosition) => {
      setSelectedCell(cell);
    },
    [setSelectedCell],
  );

  return { selectedCell, selectCell };
}
