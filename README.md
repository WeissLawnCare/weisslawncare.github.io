# Weiss Lawn Care — Business Card Website

> "We cut grass, not corners!" | Grimes, IA | 515-250-0911

## Overview

Static one-page business card site with 4 selectable themes and a contact form powered by [Formspree](https://formspree.io).

---

## Themes

Use the **Theme** button (bottom-right corner of the site) to switch between:

| Theme    | Vibe                        |
|----------|-----------------------------|
| Emerald  | Classic deep green + gold    |
| Midnight | Dark/modern + electric green |
| Harvest  | Earthy warm tones + sage     |
| Coastal  | Clean blue + green accents   |

Once a theme is chosen, the client's preference is remembered in the browser via `localStorage`. To **lock a theme** for production, change the default `data-theme` on the `<html>` tag in `index.html`:

```html
<!-- Default to whichever theme the client picks: -->
<html lang="en" data-theme="emerald">
```

---

## Contact Form Setup (Formspree — Free)

The contact form requires a free [Formspree](https://formspree.io) account to deliver emails.

1. Go to [formspree.io](https://formspree.io) and sign up (free)
2. Click **+ New Form**, name it "Weiss Lawn Care"
3. Enter `weiss.lawncare@aol.com` as the notification email
4. Copy your form ID (looks like `xpwzgkdj`)
5. Open `index.html` and find this line:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

6. Replace `YOUR_FORM_ID` with your actual form ID:

   ```html
   action="https://formspree.io/f/xpwzgkdj"
   ```

7. Save and push — form submissions now arrive at weiss.lawncare@aol.com

Free plan: **50 submissions/month** (more than enough for a local lawn care business).

---

## Deploying to GitHub Pages

### First-time setup

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository named `weiss-lawn-care` (or create an Organization first)
3. Push this code:

   ```bash
   git init
   git add .
   git commit -m "Initial site launch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weiss-lawn-care.git
   git push -u origin main
   ```

4. In the GitHub repo, go to **Settings → Pages**
5. Set Source to **Deploy from a branch → main → / (root)**
6. Click Save — site will be live at `https://YOUR_USERNAME.github.io/weiss-lawn-care/`

### Custom Domain (optional)

To use a custom domain like `weisslawncare.com`:

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In GitHub Pages settings, enter your custom domain
3. Add a `CNAME` record at your DNS provider pointing to `YOUR_USERNAME.github.io`

---

## Customizing Content

| What to change        | Where                              |
|-----------------------|------------------------------------|
| Business info         | `index.html` — hero, footer, nav   |
| Services listed       | `index.html` — `#services` section |
| Service area cities   | `index.html` — `#area` section     |
| Theme colors          | `css/styles.css` — top of file     |
| Hero background image | `css/styles.css` — `--hero-img` per theme |
| Default theme         | `index.html` — `<html data-theme="...">` |

---

## File Structure

```
WeissLawnCare/
├── index.html        ← Main page (all content here)
├── css/
│   └── styles.css    ← All styles + 4 theme definitions
├── js/
│   └── main.js       ← Theme switcher, nav, form handler
└── README.md
```

---

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS — no frameworks, no dependencies
- [Google Fonts](https://fonts.google.com) — Montserrat + Open Sans
- [Font Awesome 6](https://fontawesome.com) — icons
- [Formspree](https://formspree.io) — contact form emails (free tier)
- [Unsplash](https://unsplash.com) — hero/about images (royalty-free)
- Hosted on [GitHub Pages](https://pages.github.com) — free
