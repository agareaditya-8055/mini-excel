import { useEffect } from 'react';
import { Grid } from '../../features/data-grid/components/Grid';
import { generateGridRows } from '../../features/data-grid/services/dataGenerator';
import { DEFAULT_COLUMNS, DEFAULT_ROW_COUNT } from '../../features/data-grid/constants/grid.constants';
import { useGridDataStore } from '../../features/data-grid/stores/gridData.store';

export function GridPage() {
  const setRows = useGridDataStore((state) => state.setRows);
  const setColumns = useGridDataStore((state) => state.setColumns);

  useEffect(() => {
    setColumns(DEFAULT_COLUMNS);
    setRows(generateGridRows(DEFAULT_ROW_COUNT));
  }, [setColumns, setRows]);

  return <Grid />;
}
