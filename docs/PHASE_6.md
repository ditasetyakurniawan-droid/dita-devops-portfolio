# Phase 6 — Personal profile and independent infrastructure

## Delivered

- Profile portrait, email, phone, LinkedIn and GitHub are configured from details supplied for public display. The header of the new CV and site contact controls use those same details. The footer offers `mailto:`, `tel:`, Copy email with fallback, LinkedIn and GitHub.
- Two-page, selectable-text CV generated from the earlier October 2025 PDF plus the current enterprise and independent work. Dita confirmed the prior DevOps role ended in 2025 and chose to omit the old HR Assistant role. The updated CV is versioned and available via `/resume`; the filename, update date and size appear on the download control. The coverage example was corrected to Go after auditing the original CI log; an old, unconfirmed location was removed. The current PDF still needs Dita's final editorial review before external circulation.
- Zabisa's private repository README, project state, deployment description, Jenkins runbook and known-limitations file informed two distinct sanitized cases: delivery and multi-VM platform. The repository is private and is deliberately **not linked** in public work cards. It should only be linked after its visibility and contents are deliberately reviewed for publication.
- The platform case describes three control-plane and three worker VMs plus dedicated supporting services on a **single physical host**. A cross-namespace inventory provided by Dita supports the presence of shared platform services and multiple application workloads. A pod snapshot does not prove availability, resilience to host loss, or public-production readiness.

## Publication boundary

The public site contains no internal or external infrastructure IPs, SSH ProxyJump target, VM hostnames, service DNS names, credentials or live telemetry. A visitor can see the platform story and selected tools without a route into the home network. The portfolio remains `noindex` until SEO and deployment acceptance are complete.

## Acceptance

1. Home portrait renders with descriptive alt text; inspect desktop and narrow mobile sizes.
2. Footer mail, phone, LinkedIn and GitHub actions work. Copy email announces success or selects the visible address if clipboard permissions deny access.
3. `/resume` loads, and its PDF download opens the two-page versioned document. Ensure the described role, period and profile are accurate before external sharing.
4. `/work?scope=independent` shows Zabisa delivery plus the independent platform case. All internal topology details stay private; both cases show sanitized evidence status.
5. Run `npm run typecheck`, `npm run build`, background tests, and an HTTP smoke test for the portrait, PDF and case routes.

## Remaining PRD work

F07 needs a confirmed public hostname for canonical metadata, sitemap, Open Graph and structured `Person` data. F08 privacy-conscious analytics requires a deliberate choice. The final gate covers WCAG, mobile/responsive QA, Lighthouse/Core Web Vitals, content review and homelab deployment with TLS.
