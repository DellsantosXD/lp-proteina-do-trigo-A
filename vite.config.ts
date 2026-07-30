import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { execSync } from 'child_process';

function commitHashPlugin() {
  return {
    name: 'commit-hash-plugin',
    transformIndexHtml(html: string) {
      let hash = 'unknown';
      try {
        hash = execSync('git rev-parse --short HEAD').toString().trim();
      } catch (e) {}
      return html.replace(/__BUILD_VERSION__/g, `build-${hash}`);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [commitHashPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
