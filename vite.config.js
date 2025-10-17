// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/mxm/',
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        about: path.resolve(__dirname, './about.html'),
        tabs: path.resolve(__dirname, './tabs.html'),
        team: path.resolve(__dirname, './team.html'),
        projects: path.resolve(__dirname, './projects.html'),
        contacts: path.resolve(__dirname, './contacts.html'),
        // Добавьте другие страницы по аналогии
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
