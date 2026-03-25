import type { GridRow } from '../types/grid.types';

const FIRST_NAMES = ['Liam', 'Ava', 'Noah', 'Emma', 'Mason', 'Olivia', 'Ethan', 'Sophia'];
const LAST_NAMES = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
const CITIES = ['Seattle', 'Austin', 'Miami', 'Chicago', 'Denver', 'Boston', 'Phoenix', 'Portland'];

const randomFrom = (values: readonly string[], index: number): string => values[index % values.length];

export function generateGridRows(count: number): GridRow[] {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const firstName = randomFrom(FIRST_NAMES, id * 7);
    const lastName = randomFrom(LAST_NAMES, id * 3);
    const city = randomFrom(CITIES, id * 5);

    return {
      id: String(id),
      firstName,
      lastName,
      city,
      score: (id * 13) % 100,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@grid.dev`,
    };
  });
}
