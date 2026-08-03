# Highway Thrash

**Road Rash** spiritual successor × **Traffic Racer** endless highway combat racing.  
Progressive Web App · TypeScript · Three.js · React · Vite

## Quick start

```bash
npm install --legacy-peer-deps
npm run dev
```

## Production

```bash
npm run build && npm run preview
```

## Deploy to Vercel (industry standard)

1. Go to [vercel.com/new](https://vercel.com/new)
2. **Import** GitHub repo `FahadIbrahim93/highway-thrash`
3. Framework preset: **Vite**
4. Install: `npm install --legacy-peer-deps`
5. Build: `npm run build` · Output: `dist`
6. Deploy → production URL + preview deploys on every PR

CLI alternative:
```bash
npx vercel --prod
```

Config: `vercel.json` (SPA rewrites, long-cache assets, GLB Content-Type).

## CI
GitHub Actions on `main`: typecheck → lint → build (`.github/workflows/ci.yml`).

## Controls
| Input | Action |
|-------|--------|
| A/D or ←/→ | Steer |
| W / ↑ | Throttle |
| S / ↓ | Brake |
| Shift | Nitro |
| F / E | Attack |
| Space | Wheelie |
| C | Camera toggle |
| Touch | Left = steer, right = gas |

## Stack
- Vite 6 + React 19 + TypeScript strict
- Three.js (WebGL) + adaptive quality
- Zustand (persisted garage)
- vite-plugin-pwa (offline core)
- Modular systems: Road, Traffic, Bike, Combat, Weapons, Particles, Props, PostFX

## Assets
See `ATTRIBUTION.md`. Fictional bike names only.

## Status
Playable vertical slice: endless mode, combat, weapons, 20-bike garage, day/dusk cycle, free GLB pipeline.
