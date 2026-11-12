# Installation & Deployment

## Requirements

- Node.js 20.19 or newer (22 recommended) and npm. Check with `node -v`.

## Install and run

```bash

npm install
npm run dev
```

Open the address printed in the terminal (normally http://localhost:5173).

## Production buildcd fahmida-portfolio

```bash
npm run build
```

The finished site is created in the `dist/` folder. To test it locally:

```bash
npm run preview
```

Asset paths are relative (`base: './'` in `vite.config.js`), so `dist/` works on
any static host or in a sub-folder.

## Deploy

The site is static, so any static host works. Upload or connect the project and
use these settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`

### Netlify
New site from Git, use the settings above. Or drag the `dist/` folder onto
https://app.netlify.com/drop.

### Vercel
Import the repository. Vercel detects Vite automatically; confirm the settings above.

### GitHub Pages
Run `npm run build`, then publish the contents of `dist/` (for example with a
GitHub Actions Pages workflow, or by pushing `dist/` to a `gh-pages` branch).

### Any web server
Copy everything inside `dist/` to the server's public folder.

## After deploying

Set `siteUrl` in `src/data/profile.js` to the live address, rebuild, and redeploy
so the canonical URL and Open Graph URL are included.

## Fonts

Newsreader and Figtree load from Google Fonts. If they are blocked, the site
falls back to Georgia and the system sans-serif and still works. To self-host,
download the fonts, add `@font-face` rules in `src/styles/index.css`, and
remove the Google Fonts `<link>` tags in `index.html`.
