# ClearCart Prototype — GitHub Pages Deploy

This is the ClearCart checkout prototype (Vite + React), pre-configured to deploy
to GitHub Pages automatically via GitHub Actions.

## 1. Push it to a new GitHub repo

```bash
cd clearcart-site
git init
git add .
git commit -m "ClearCart prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, without a README/license, so the push
above doesn't conflict.)

## 2. Turn on Pages

In your repo on GitHub: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

That's it — the workflow at `.github/workflows/deploy.yml` already builds the
site and deploys it on every push to `main`. Check the **Actions** tab for
progress; when the `pages build and deployment` job finishes, your site is
live at:

```
https://<your-username>.github.io/<your-repo>/
```

## Local development

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Notes

- `vite.config.js` uses a relative base path (`base: './'`) so the build works
  under a GitHub Pages project URL without any repo-name-specific config.
- Tailwind is loaded via the CDN script in `index.html` (no build step needed
  for styling) — fine for a prototype; swap for a proper Tailwind build if
  this grows into a production app.
- `src/App.jsx` is the ClearCart prototype component itself.
