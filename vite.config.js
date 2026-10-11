import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true'
    && process.env.GITHUB_REPOSITORY
    && !process.env.GITHUB_REPOSITORY.split('/')[1].endsWith('.github.io')
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
