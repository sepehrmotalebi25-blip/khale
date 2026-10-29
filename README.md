# Birthday surprise site

A static, single-page Persian birthday website. The cake and gift are generated from Three.js geometry; the original three memory photos, Persian letter, countdown and interactions are preserved.

## Deploy to Netlify

1. Extract the ZIP.
2. In Netlify, choose **Add new site → Deploy manually**.
3. Upload the `birthday-site-v2` folder (the folder containing `index.html`).
4. Keep internet access enabled for the Three.js module CDN and Google Fonts.

No build command or publish directory configuration is required. If deploying from a Git repository, use an empty build command and set the publish directory to `birthday-site-v2` (or the root directory if you move the files there).

## Notes
- Three.js is loaded from jsDelivr using an import map.
- The original photos are in `assets/` and are referenced locally.
- The page requires a modern browser with WebGL enabled.
