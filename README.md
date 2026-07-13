# Abhishek Kumar — portfolio

Vite + React portfolio built around GSAP motion, Lenis scrolling, and a small React Three Fiber particle field.

## Animation architecture

- `src/App.jsx` owns the Lenis request-animation-frame loop and synchronizes it with GSAP ScrollTrigger.
- `SceneLoader`, `SiteChrome`, and individual routed page sections use `useGSAP()` so timelines and ScrollTriggers are reverted during unmounts.
- `SiteChrome` owns the fixed route curtain. Scroll entrances, the ticker, and the desktop-pinned About sequence are reusable route/page effects in `PortfolioPages.jsx`.
- `HeroCanvas` is lazy-loaded, keeping the Three.js bundle out of the initial JavaScript path. The canvas and custom cursor are disabled on coarse pointers or reduced-motion preferences.

## Add a project

Add its resume-verified entry to `portfolioData.projects` in `src/data.js`, including title, category, image, stack, summary, problem, features, impact, and optional live URL. The project grid and `/projects/:slug` case-study route are generated from that array automatically.

## Run

`npm run dev` starts the local development server and `npm run build` creates the production bundle.
