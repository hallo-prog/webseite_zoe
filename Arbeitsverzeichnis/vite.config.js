import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    strictPort: false,
    port: Number(process.env.PORT || 5173),
  // Hinweis: Eigene HMR-Host/Port Konfiguration entfernt.
  // Grund: In Codespaces/Gitpod kollidierte ein fest verdrahteter Host (…-5173.app.github.dev)
  // mit automatisch hochgezählten Ports (5174/5175). Dadurch versuchte der Client über HTTP
  // auf den ursprünglichen Port zuzugreifen -> Mixed Content & WebSocket Fehler.
  // Vite erkennt in diesen Umgebungen den Forwarding-Host korrekt selbst.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/posts': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/api/chat': {
        target: 'http://localhost:8787', // Dummy Backend (kann mit z.B. Cloudflare Worker/Express ersetzt werden)
        changeOrigin: true,
        secure: false
      }
    }
  }
}));
