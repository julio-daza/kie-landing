# kie-landing

Website for [`kie`](https://github.com/julio-daza/kie-cli), the zero-dependency KIE.ai media
generation CLI for agents. Astro 5, static output, English at `/` and Spanish at `/es/`.

**Live**: https://kie-landing.pages.dev

## Stack

- Astro 5 with the built-in i18n router (`en` default, `es` prefixed).
- One React island: **MaskedHeading** from [React Bits](https://reactbits.dev/text-animations/masked-heading)
  (MIT) for the hero and closing headlines. The media behind the glyphs is `public/mask.svg`,
  an animated SVG gradient — no external assets, no tracking.
- All copy lives in `src/i18n/ui.ts`. To add a language: extend `Lang`, add an entry to `ui`,
  create `src/pages/<lang>/index.astro`.
- Terminal transcripts are HTML strings in `src/components/terminals.ts` (Astro collapses
  whitespace inside slotted `<pre>`).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321 and /es/
npm run build      # → dist/
npm run preview
```

## Deploy

Cloudflare Pages project **`kie-landing`**, deployed by GitHub Actions
(`.github/workflows/deploy.yml`) with Wrangler — not by the Pages Git integration:

- push to `main` → production (`kie-landing.pages.dev`)
- pull request → preview deployment on the branch alias

Required repository secrets:

| Secret | Value |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | the Cloudflare account id |
| `CLOUDFLARE_API_TOKEN` | API token with **Account → Cloudflare Pages → Edit** |

Manual deploy from a laptop (same token in the environment):

```bash
npm run build
CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… npx wrangler pages deploy dist --project-name=kie-landing
```

If the site moves to a custom domain, update `site` in `astro.config.mjs` (canonical, hreflang
and Open Graph URLs derive from it).

## License

MIT. Not affiliated with KIE.ai; "KIE" and its logo belong to their owner.
