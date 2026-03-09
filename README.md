# CSS Reference Guide

A complete 21-chapter CSS reference for developers — from fundamentals to cutting-edge features. Pure static site with offline support, a live playground, dark/light mode, and global search. No framework, no build step.

## Features

- 21 in-depth chapters covering every CSS topic
- Live CSS Playground with 7 built-in templates
- Dark / Light theme toggle
- Global search (Ctrl+K / Cmd+K)
- Offline support via Service Worker (PWA-ready)
- Scroll progress indicator
- Copy-to-clipboard code blocks with cross-browser fallback
- Keyboard navigation
- Font size controls
- Progress tracking via localStorage
- Fully responsive — mobile, tablet, and desktop

## Chapters

| # | Topic |
|---|-------|
| 01 | CSS Basics |
| 02 | Box Model |
| 03 | Typography |
| 04 | Colors & Backgrounds |
| 05 | Display & Positioning |
| 06 | Flexbox |
| 07 | CSS Grid |
| 08 | Responsive Design |
| 09 | Pseudo-classes & Elements |
| 10 | CSS Variables |
| 11 | Transitions & Animations |
| 12 | Transforms |
| 13 | Filters & Effects |
| 14 | CSS Functions |
| 15 | Selectors Deep Dive |
| 16 | Logical Properties |
| 17 | Shapes & Clip-path |
| 18 | Scrollbar Styling |
| 19 | Print Styles |
| 20 | Architecture & Best Practices |
| 21 | Modern CSS |

## Running Locally

No build required. Serve with any static file server:

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

> The Service Worker and Clipboard API require a secure context (HTTPS or localhost). Opening `file://` URLs directly will disable those features.

## Deploying to Netlify

1. Push this repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Select your repository. Netlify picks up `netlify.toml` automatically — publish directory is `.` (the repo root).
4. Click **Deploy site**.

The `netlify.toml` configures security headers, asset caching, service-worker cache control, and the custom 404 page.

## Setting Up Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console) and add your property.
2. Verify ownership (HTML file upload or DNS record).
3. Submit your sitemap: `https://YOUR_DOMAIN/sitemap.xml`

**After deploying, replace the `YOUR_DOMAIN` placeholder** in these files with your actual domain (e.g. `my-css-guide.netlify.app`):

- `sitemap.xml` — all `<loc>` entries
- `robots.txt` — `Sitemap:` line
- Every `.html` file — `og:url` and `<link rel="canonical">`

Quick replace (run from the project root):

```bash
# macOS / Linux
find . \( -name "*.html" -o -name "*.xml" -o -name "*.txt" \) \
  | xargs sed -i 's|YOUR_DOMAIN|your-site.netlify.app|g'

# Windows PowerShell
Get-ChildItem -Recurse -Include *.html,*.xml,*.txt |
  ForEach-Object {
    (Get-Content $_.FullName) -replace 'YOUR_DOMAIN','your-site.netlify.app' |
    Set-Content $_.FullName
  }
```

## Browser Support

Targets all modern browsers. Internet Explorer is not supported.

| Browser | Minimum |
|---------|---------|
| Chrome  | 99+     |
| Firefox | 100+    |
| Safari  | 15+     |
| Edge    | 99+     |

## Tech Stack

- HTML5 — semantic markup, no framework
- CSS3 — custom properties, flexbox, grid
- Vanilla JavaScript — zero dependencies
- Service Worker — offline / cache-first strategy

## License

MIT
