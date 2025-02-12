import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import manifest from './manifest.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), crx({ manifest })],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'index.css') return 'index.css';

                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
});
