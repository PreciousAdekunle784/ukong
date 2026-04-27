# Olamide A. — Portfolio

A single-file portfolio site. No build step, no dependencies — just push and host.

## Deploying to GitHub Pages (fixing the 404)

The 404 you saw is because GitHub Pages serves **static files** — it can't render a `.jsx` file. This version is plain HTML, so it'll work straight away.

### Steps

1. **Put both files in the root of your repo:**
   - `index.html`
   - `portrait.jpg`

   Your repo should look like:
   ```
   your-repo/
   ├── index.html
   ├── portrait.jpg
   └── README.md
   ```

2. **Commit and push:**
   ```bash
   git add index.html portrait.jpg README.md
   git commit -m "Add portfolio"
   git push
   ```

3. **Enable GitHub Pages:**
   - Go to your repo on github.com → **Settings** → **Pages**
   - Under **Source**, select branch `main` (or `master`) and folder `/ (root)`
   - Click **Save**

4. **Wait ~1 minute**, then visit:
   - `https://<your-username>.github.io/<repo-name>/`
   - Or if your repo is named `<your-username>.github.io`, just visit `https://<your-username>.github.io/`

If you still see 404 after a few minutes, hard-refresh (Cmd/Ctrl + Shift + R) — Pages caches aggressively.

## Editing the content

Open `index.html` and search for `EDIT:` — every spot you should change is marked. The big ones:

| Where | What to change |
|---|---|
| `<title>` | Page title |
| Hero name | Change "OLAMIDE" / "ADEBAYO" to your name |
| `Currently` block | Your role + city |
| `Quick intro` block | Short pitch |
| Biography paragraphs | 2–3 paragraphs about you |
| Stats | Years, projects, etc. |
| Project rows (`Cultiva8`, `ScanMark`, `SynergoX`, `Lattes & Leases`) | Real blurbs and tags — `data-blurb` is what shows on hover |
| Posts | Real article titles + dates + links |
| Email | Your real email in `mailto:` and visible text |
| Socials | Real GitHub / LinkedIn / Twitter URLs |
| `portrait.jpg` | Swap in any portrait you prefer (3:4 portrait orientation works best) |

## What's in the design

- **Type system:** Fraunces (variable serif) + JetBrains Mono + DM Sans
- **Palette:** warm cream paper, ink black, vermillion accent
- **Custom cursor** (desktop only) — small dot + lagging ring that grows on hover
- **Hero stagger** — letters animate in on load
- **Scroll reveals** — sections fade up as they enter view
- **Animated stats counter** — numbers tick up when you scroll to the bio
- **Project hover** — rows invert to dark, blurb swaps in below
- **Marquee** — infinite-scrolling tech list in the dark stack section
- **Magnetic submit button** — the contact form's send button drifts toward your cursor
- **Live clock** in the nav and footer
- **SVG grain overlay** for paper texture

## Connecting the contact form

The form currently just shows a "thank you" message — it doesn't actually email anyone. To make it real, the easiest options are:

- **[Formspree](https://formspree.io)** — change the `<form>` tag to `<form action="https://formspree.io/f/YOUR_ID" method="POST">` and remove the JavaScript handler at the bottom.
- **[Resend](https://resend.com)** — needs a tiny serverless function (Vercel, Netlify, or Cloudflare Workers).
- **[Netlify Forms](https://www.netlify.com/products/forms/)** — if you host on Netlify instead of GitHub Pages, just add `netlify` as an attribute on the `<form>` tag.

## Custom domain (optional)

In your repo: **Settings → Pages → Custom domain**, enter `yourdomain.com`, then add a `CNAME` record at your domain registrar pointing to `<your-username>.github.io`.
