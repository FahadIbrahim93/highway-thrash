# Complete the force-push (required once)

The GitHub API tool has payload limits, so the largest source files
(GameEngine, Traffic, Combat, bikes roster, App.css, GLBs) remain
in the local workspace.

## One-shot from your machine (2 minutes)

```bash
# Use the full workspace folder (road-rash-traffic)
cd /path/to/road-rash-traffic

git init
git remote add origin https://github.com/FahadIbrahim93/highway-thrash.git
# or if remote exists:
git remote set-url origin https://github.com/FahadIbrahim93/highway-thrash.git

git add -A
git status   # should show GameEngine, TrafficSystem, bikes.ts, *.glb, App.css, etc.
git commit -m "feat: complete Highway Thrash vertical slice"
git branch -M main
git push -u origin main --force
```

After push, Vercel auto-redeploys from GitHub.

## Already on GitHub

- Vite + PWA config, CI, vercel.json, MIT license
- AdaptiveQuality, BikeController, Camera, Score, PostFX, PropSystem
- Full UI shell (menu, garage, HUD, canvas, results, settings)
- types, ObjectPool, game data barrel

## After force-push

```bash
npm install --legacy-peer-deps
npm run build
```

Then open the Vercel production URL.
