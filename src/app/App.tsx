import { GridPage } from './providers/GridPage';

export function App() {
  return (
    <main className="min-h-screen bg-slate-100/70 p-6 text-slate-900">
      <section className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold">Mini Excel Data Grid</h1>
        <p className="mb-6 text-sm text-slate-600">Virtualized 10k+ row grid with sorting, filtering, and keyboard navigation.</p>
        <GridPage />
      </section>
    </main>
  );
}
