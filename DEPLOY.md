# Deploy Highway Thrash

## Recommended: GitHub → Vercel

1. Ensure full source is on `main`:
   ```bash
   git clone https://github.com/FahadIbrahim93/highway-thrash.git
   # OR push local tree:
   cd road-rash-traffic
   git remote add origin https://github.com/FahadIbrahim93/highway-thrash.git
   git add -A && git commit -m "feat: full source" && git push -u origin main
   ```

2. Import in Vercel
   - https://vercel.com/new
   - Select `FahadIbrahim93/highway-thrash`
   - Framework: **Vite**
   - Install Command: `npm install --legacy-peer-deps`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. Environment
   - Node 20+
   - No secrets required for core loop

4. Post-deploy
   - Open production URL
   - Lighthouse PWA check
   - Test on a low-end Android + desktop Chrome

## Headers (vercel.json)
- SPA rewrite to `index.html`
- Long-cache hashed assets
- GLB Content-Type + weekly cache

## CI
GitHub Actions runs typecheck, lint, and build on every push to `main`.

## Local production smoke test
```bash
npm install --legacy-peer-deps
npm run build
npm run preview
```
