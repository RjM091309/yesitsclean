/**
 * PM2 — dev server lang (Vite).
 * Production: `npm run build` + i-serve ang `dist` (nginx/static) o `pm2` + `vite preview` hiwalay.
 */
module.exports = {
  apps: [
    {
      name: 'yesitsclean-dev',
      cwd: __dirname,
      script: 'node_modules/vite/bin/vite.js',
      args: '--port=2850 --host=0.0.0.0',
      interpreter: 'node',
      watch: false,
      autorestart: true,
      max_restarts: 15,
      min_uptime: '5s',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
