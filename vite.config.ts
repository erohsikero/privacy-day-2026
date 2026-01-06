import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Set base path for GitHub Pages
    // If CNAME exists with custom domain, use '/' otherwise use '/privacy-day-2026/'
    let base = '/';
    if (process.env.GITHUB_PAGES === 'true') {
      const cnamePath = path.resolve(__dirname, 'CNAME');
      if (existsSync(cnamePath)) {
        const cnameContent = readFileSync(cnamePath, 'utf-8').trim();
        // If CNAME contains a custom domain (not github.io), use root base
        if (cnameContent && !cnameContent.includes('github.io') && cnameContent !== 'example.com') {
          base = '/';
        } else {
          base = '/privacy-day-2026/';
        }
      } else {
        base = '/privacy-day-2026/';
      }
    }
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
