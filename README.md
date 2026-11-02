# nadinefarahdiansyah.github.io

Portfolio website of **Nadine Azzadiena Farahdiansyah** — Graphic & UI/UX Designer, Digital Innovation, ITS Surabaya.

Static HTML/CSS/JS with no framework and no build step, styled after [fadhiilhamizan.github.io](https://github.com/fadhiilhamizan/fadhiilhamizan.github.io).

## Structure

```
index.html          one-page portfolio: hero, about, work + gallery, experience, skills, awards, contact
project.html        case-study template, rendered from data by hash (project.html#trashney)
manifest.json
assets/
  site.css          design tokens, glass, aurora, layout, responsive
  site.js           theme, EN/ID toggle, reveal, count-up, gallery filter, lightbox
  works.js          ALL content data: gallery items + case studies
  project.js        case-study renderer
  works/<category>/ gallery images (<slug>.webp + <slug>-thumb.webp)
  case-studies/trashney/
  img/ icons/ favicon.svg og-image.png  Nadine-Azzadiena-Farahdiansyah-CV.pdf
```

## Editing content

- **Add a gallery piece:** put `<slug>.webp` (≈1600 px) and `<slug>-thumb.webp` (≈720 px) in `assets/works/<category>/`, then add one line to the `raw` list in `assets/works.js`.
- **Text on the main page:** edit `index.html`. Translatable elements carry `data-en` and `data-id`; both must be updated (add `data-html` when the text contains tags).
- **Case studies:** edit the `cs` object in `assets/works.js`.

## Run locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy (GitHub Pages)

1. Create a public repository named `nadinefarahdiansyah.github.io` on the `nadinefarahdiansyah` account.
2. Push these files to the `main` branch.
3. In **Settings → Pages**, set the source to `main` / root. The site goes live at https://nadinefarahdiansyah.github.io.
