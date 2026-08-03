# Project status — Highway Thrash

**Repo:** https://github.com/FahadIbrahim93/highway-thrash  
**Vercel:** https://highway-thrash-hopetheorybd-2156s-projects.vercel.app

## Sync note

Core config, CI, UI shells, AdaptiveQuality, Score, Camera, ObjectPool, docs, and license are on `main`.

**Full game source** (GameEngine, Traffic, Combat, Weapons, Road, Particles, bikes data, GLBs, App.css) lives in the development workspace zip. To complete the repo in one shot from the zip:

```bash
unzip highway-thrash-latest.zip && cd road-rash-traffic
git init
git remote add origin https://github.com/FahadIbrahim93/highway-thrash.git
git add -A
git commit -m "feat: complete vertical slice"
git branch -M main
git push -u origin main --force
```

Then Vercel auto-redeploys from GitHub.

## Implemented

- Endless traffic rush loop
- Near-miss scoring + combat + weapon pickups
- 20-bike garage + upgrades
- Adaptive quality + PostFX bloom (gated)
- Day/dusk cycle + roadside props
- Free Kenney / hero GLB pipeline
- PWA config (vite-plugin-pwa)
- Crash tumble recovery

## Remaining toward 10/10

- Full source on GitHub (one local push)
- Audio (engine, hits, UI)
- Thrash mode rules
- Rival AI counter-attacks
- Garage 3D preview
- Lighthouse PWA audit pass
