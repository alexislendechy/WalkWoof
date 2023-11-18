import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ['mock-aws-s3', 'aws-sdk', 'nock'],
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});