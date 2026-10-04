# Phase 4 — Selected Work and Case Studies

## Delivered against PRD

- F01: `/work` offers scope (All, Enterprise, Independent) and topic filters. Their values persist in `?scope=` and `?topic=`. The results count uses `role="status"` and an empty state offers a reset. Unknown query values normalize to All; a bookmarked URL is filtered on the server before hydration.
- F02: `src/content/cases.ts` is the single typed record for six case pages, three featured cards, scope, confidentiality and links. Required strings, slugs, minimum flow/validation fields, and safe link formats are checked during module evaluation and thus on build. `caseHref` rejects links to unknown case slugs.
- F04: Evidence labels are drawn from records: Sanitized and In progress. The Zabisa repository is private, so no case claims public source evidence. The terminal retains its separate illustrative label.
- F06 (scope for this phase): Desktop and mobile site navigation; the mobile disclosure has a keyboard operable trigger, Escape close with focus return, and outside click close. Filters are native buttons/select with 44 px targets and visible focus.
- Case detail order: context and constraints; problem, personal contribution and known result; a reconstructed workflow; implementation; validation; evidence boundaries; public links when safe; next case.

## Editorial review

| Case | Scope | Evidence status | Critical constraint |
| --- | --- | --- | --- |
| Enterprise delivery diagnostics | BRI vendor role | Sanitized | Composite workflow: coordination with release and banking operations; no exclusive production ownership or published service count. |
| Scripted production promotion | BRI vendor role | Sanitized | Bamboo inline and Helm-repository scripts; no public source, production locations, or outcome metrics. |
| Go coverage / SonarQube | BRI vendor role | Sanitized | Private log loads `coverage.out` through Go Cover and passes the quality gate; the log itself is not published. |
| Bun runtime for CI | BRI vendor role | In progress | Image and wrapper validated; repository migration is incomplete. |
| Zabisa controlled delivery | Independent multi-VM homelab | Sanitized | Source repo is private; runtime evidence is internal and one physical host remains a failure domain. |
| Multi-VM Kubernetes platform | Independent shared cluster | Sanitized | Three control-plane and three worker VMs on one physical server; no IPs or hostnames published. |

No numerical reliability claims or private system details appear on these pages. The Zabisa repository is private; visitors cannot inspect it, so neither the case nor the CV links to it as public proof.

The enterprise case now represents a sanitized composite of delivery work across a large service estate, including CI, Dockerfiles, Helm, logs and production handoffs. The `/work?scope=enterprise&topic=operations` filter leads to this case. A specific service count remains out of public copy until the number and permission to publish it are confirmed. Internal program names and production location labels are likewise omitted. SAST/SCA setup appears in the Expertise scope; a separate claimed outcome needs evidence before it becomes a case study.

The scripting case uses `/work?scope=enterprise&topic=automation`. The status badge indicates that the account has been sanitized; it does not certify external evidence. Execution authority belongs to the shared release process, and the story deliberately avoids real production scripts and site identifiers.

## Manual acceptance

1. Open `/work`, set Enterprise and Quality gates, then reload the URL. It must show one coverage case, selected controls and `1 case study`.
2. Set Enterprise and GitOps & recovery. It must show `0 case studies`, explanatory text and Show all work; activating reset should restore all six.
3. Open each of six detail routes, follow breadcrumb and Next links, and verify the scope and evidence label agree with the copy.
4. From the home page follow three featured cards, an Expertise card and a timeline case link; verify `#expertise`, `#work` and `#experience` anchors land at their intended sections.
5. At mobile width, open the menu with keyboard, close it with Escape, and verify focus returns to the trigger. Repeat with reduced motion enabled; content stays present.

## Remaining PRD gates

F03 and F05 have public email and a versioned PDF CV, pending device and permission smoke tests. F07 needs the public hostname for canonical metadata and sitemap; F08 needs a privacy decision. Public screenshots and quantitative outcomes need source and publication review. Audit Lighthouse, Core Web Vitals and accessibility on the deployment target before lifting `noindex`.
