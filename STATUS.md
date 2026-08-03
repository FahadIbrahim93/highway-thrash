# Highway Thrash — Status

**GitHub:** https://github.com/FahadIbrahim93/highway-thrash  
**Vercel:** https://highway-thrash-hopetheorybd-2156s-projects.vercel.app

## On `main` now

- Project config: package.json, vercel.json, vite.config.ts (PWA), tsconfig, CI
- License (MIT), DEPLOY.md, README, ATTRIBUTION, GDD
- Core: types, AdaptiveQuality, BikeController, Camera, Score, ObjectPool, PostFX
- UI: App, MainMenu, HUD, Results, Settings, ErrorBoundary
- Entry: main.tsx, index.html, index.css

## Still in workspace zip (one push to finish)

- GameEngine, InputManager, Road/Traffic/Combat/Weapon/Particle systems
- gameStore, bikes.ts (20 roster), BikeAssetLoader
- GameCanvas, Garage, App.css
- GLB models (Kenney + hero)

## Complete the repo (2 min)

```bash
unzip highway-thrash-latest.zip && cd road-rash-traffic
git init && git remote add origin https://github.com/FahadIbrahim93/highway-thrash.git
git add -A && git commit -m "feat: complete vertical slice"
git branch -M main && git push -u origin main --force
```

Vercel will auto-rebuild from GitHub.

## Product progress

Playable vertical slice locally: endless mode, combat, weapons, 20-bike garage, day/dusk, free GLBs, adaptive quality, crash tumble.  
Toward 10/10: audio, Thrash mode, rival AI, full GitHub sync, Lighthouse PWA pass.
