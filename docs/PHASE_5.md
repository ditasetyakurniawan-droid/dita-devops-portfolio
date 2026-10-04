# Phase 5 — Scripting and public profile foundations

## Added

- The six-card Expertise layout retains the PRD density. Its CI/CD card now points to a dedicated, sanitized scripting case. `/work` contains five cases and the new topic filter `Scripting & automation`. Three featured cards remain aligned with the PRD's proof priorities.
- The case describes Bamboo inline scripting, scripts kept in the Helm repository, and isolated-to-existing promotion across production locations. This is an editorial composite, not leaked source code or independent proof of production outcomes.
- `/resume` is a reviewable public professional summary built from the existing case records and skill scope. It never exposes an inactive PDF download.
- `/privacy` explains the current application behavior and notes that host or proxy logging must be reviewed against the actual homelab deployment.
- The footer offers GitHub and links to `/resume` and `/privacy`. A public email, `mailto:` and accessible Copy email action appear only after `profile.publicEmail` is set.
- The root `<html>` declares its intentional smooth scroll behavior for Next.js route transitions; reduced-motion CSS still switches scrolling to `auto`.

## Configure approved details

In `src/content/profile.ts`, set `publicEmail` to an address approved for publication. The copy action writes exactly this address and announces success. If Clipboard API is unavailable, it selects the visible address and instructs the visitor to copy it manually. No email value is invented by the app.

To enable the CV download, put an approved, versioned PDF into `public/resume/` and set `resumePdf` with `href`, `updated`, and `size`. A missing or incorrectly configured PDF fails the build. Until then `/resume` remains useful as a public summary and has no misleading download button.

The canonical hostname, social preview, sitemap, analytics and Lighthouse release gate still require actual deployment values or manual review. The site remains `noindex`.

## Acceptance checks

1. `/work?scope=enterprise&topic=automation` shows exactly the scripting case; clicking it opens the new detail route with `Sanitized` evidence status and no internal site names.
2. Home Expertise and Experience links open that route; three featured cards and the continuous background remain as before.
3. `/resume` lists the verified roles and competency links, with no download control until a real PDF is configured. `/privacy` loads from every page's footer.
4. Keyboard focus and `Escape` work in the mobile menu. If a public email is set, test mailto, clipboard success, and clipboard rejection fallback.
5. Run `npm run typecheck`, `npm run build`, and the existing background geometry tests. Test build output for private names and numeric outcomes before publishing.
