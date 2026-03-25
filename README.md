# Mini Excel

A production-ready scaffold for a high-performance mini-Excel data grid built with React + TypeScript.

## Stack

- React + TypeScript
- Vite
- Zustand
- Tailwind CSS
- @tanstack/react-table
- @tanstack/react-virtual

## Scripts

```bash
npm install
npm run dev
npm run build
npm run typecheck
```

## Architecture

Feature-first architecture under `src/features/data-grid`:

- `components/`: presentational parts (`Grid`, `Header`, `VirtualizedBody`, `Row`, `Cell`)
- `hooks/`: orchestration + interaction (`useVirtualGrid`, `useGridKeyboard`, `useGridSelection`)
- `stores/`: split Zustands stores (`gridData.store`, `gridUI.store`)
- `services/`: data generation (`dataGenerator`)
- `utils/`: pure helpers (`sorting`, `filtering`)
- `types/`: strict data contracts
- `constants/`: core sizing/column config

## Features implemented

- 10,000 row mock dataset
- Sticky header
- Row virtualization
- Sorting via column headers
- Basic text filtering
- Cell selection and keyboard navigation
