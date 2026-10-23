# Kunal — Video Editor Portfolio

A static site: `index.html`, `styles.css`, `script.js`. No build step, no paid services. All paths are relative, so it works at `https://USERNAME.github.io/REPO/`.

## Replace the placeholders

| What | Where |
|---|---|
| Email, Instagram, YouTube, LinkedIn, optional form endpoint | `CONFIG` at the top of `script.js` (empty values show as disabled links) |
| Project titles, descriptions, thumbnails, video links | `PROJECTS` in `script.js` |
| Thumbnails | Put small JPG/WebP files in `assets/images/`, then set `thumb: "assets/images/p01.jpg"` |
| Videos | Set `video` to a YouTube/Vimeo link or a direct `.mp4`/`.webm` URL. Do not commit large video files |
| Concept label | Set `concept: false` on a project once it is real, completed work |
| Portrait | Swap the `.portrait` div in `index.html` (see the comment there) |
| Share image | Add `assets/images/og-image.jpg` (1200×630) and use its full URL in the `og:image` tag |
| Colours and fonts | CSS variables at the top of `styles.css` |

The form has no backend. With `CONFIG.email` set it opens the visitor's email app with the enquiry filled in. For a real submit, create a free form endpoint (for example Formspree) and paste its URL into `CONFIG.formEndpoint`. Until one is set, the form says it is not connected.

## Publish on GitHub Pages

1. Create a GitHub repository (public) and upload everything in this folder, keeping `index.html` at the repository root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at `https://USERNAME.github.io/REPO/`.
5. Optional custom domain: add it under **Settings → Pages → Custom domain** and set the DNS records GitHub shows.

## Test before you share

Open the site on a phone, tab through it with the keyboard, open and close a project, and try the form. Run Lighthouse yourself if you want performance numbers.
