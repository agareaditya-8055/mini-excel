import type { Config } from 'tailwindcss';
import preset from '@axiomui/tokens/tailwind.preset'
export default {
  presets: [preset],
  content: [
    './index.html', 
    './src/**/*.{ts,tsx}',  
    "./node_modules/@axiomui/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
