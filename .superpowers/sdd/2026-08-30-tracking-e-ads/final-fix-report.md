# Final fix report — tracking e ads

Date: 2026-08-31

Status: code, behavioral coverage, documentation, type checking, and static build completed locally. Real-provider validation remains explicitly deferred to an authorized preview/production environment.

## Scope and constraints

This wave addressed only the final review findings against `docs/superpowers/plans/2026-08-30-tracking-e-ads.md` and `docs/superpowers/specs/2026-08-30-tracking-e-ads-design.md`.

- No GTM, server-side tracking, Meta CAPI, consent dependency, or main-thread provider fallback was added.
- No provider platform, hosting, campaign, or budget change was made.
- No real GA4, Google Ads, Meta Pixel, conversion-label, phone, message, or personal-data value was added.
- `generate_lead` remains the sole primary ads conversion.
- Provider tags remain absent until explicit acceptance; invalid configuration remains isolated by provider.

## Findings resolved

1. `Layout.astro` now calls the tracking boot function directly at body-end. The exported `bootTracking()` function guards per document, and the future `astro:page-load` hook calls the same guarded function.
2. Google and Meta bootstrap/config scripts are inserted before their external `text/partytown` scripts. Each completed provider group dispatches `new CustomEvent('ptupdate')`, allowing Partytown to discover dynamic tags without moving providers to the main thread.
3. `astro.config.mjs` now supplies Partytown `resolveUrl`. Only `script` requests to `connect.facebook.net` are rewritten to the same-origin `/partytown-proxy?url=...` route. The README documents the required allowlisted hosting reverse proxy and explicitly states that the static Astro build does not create it.
4. Both Google `config` commands set `send_page_view: false`; one manual GA4 `page_view` follows configuration. Meta queues exactly one `PageView` after `init` and consent grant.
5. Reopening preferences or rejecting after acceptance sends Google Consent Mode denial for analytics/ad storage, ad user data, and ad personalization, plus Meta `fbq('consent', 'revoke')`, before disabling application dispatch. Reacceptance grants provider consent again without reloading tags or duplicating the page view.
6. `replace_with_conversion_label` and `XXXX`-style values are invalid Ads conversion labels. A valid GA4 configuration continues to receive `generate_lead` when the Ads label is invalid, while the direct Ads conversion is omitted.
7. The README now identifies the direct Google Ads website conversion as the primary path, documents exact `AW-ID/label` use and count `One`, and requires any optional GA4-imported duplicate to remain secondary.
8. The banner explicitly discloses Google Analytics, Google Ads, Meta, analytics/measurement, and marketing/remarketing. The README retains the production privacy policy and link as a launch prerequisite.
9. Behavioral tests now cover no pre-consent tags, immediate/idempotent boot, Partytown insertion order and update events, one page view, provider revocation, partial placeholder configuration, delegated CTA events and navigation, and Meta URL proxying.
10. Pricing visibility now requires `intersectionRatio >= 0.35`. Acceptance also performs a current visibility measurement, so an already-visible pricing section is recorded rather than waiting for a threshold transition that may never recur.

## Behavioral verification

The added browser-boundary harness exercises real runtime exports with controlled DOM, storage, observer, timer, provider queue, and navigation behavior. It does not assert only on mocks: it evaluates the generated provider bootstrap scripts and checks their resulting command queues.

- A first visit creates no vendor tags and dispatches no Partytown update.
- Repeated boot calls append one provider group only.
- Google commands place both `send_page_view: false` configs before one manual `page_view`.
- Meta commands place `init` and consent grant before one `PageView`.
- Revocation produces the provider denial/revoke commands and later runtime events produce no calls.
- A placeholder Ads label suppresses only `conversion`; GA4 still receives `generate_lead`.
- Internal CTA clicks are not prevented; same-tab WhatsApp navigation waits 250 ms and then proceeds; new-tab, rejected-consent, and non-JavaScript anchor behavior remain native.
- Pricing intersections below 0.35 do not emit, while 0.35 does; a section already visible when consent is accepted emits once.

## Verification results

- `node --test test/*.test.mjs`: 43 passed, 0 failed.
- `npx astro check`: 0 errors; 2 pre-existing hints (`tailwind.config.temp.js` module format and the existing async-font `onload` expression).
- `npm run build`: passed; 1 static page built.
- `git diff --check`: passed.
- Built artifact inspection confirms the serialized Partytown `resolveUrl`, direct guarded boot, `ptupdate`, and `send_page_view: false` logic are present.

## Deferred release requirements and concerns

- The hosting provider must implement `/partytown-proxy` as an allowlisted same-origin reverse proxy for HTTPS `GET` requests to `connect.facebook.net` only. It must not become an open proxy. No hosting change was made in this wave.
- GA4 DebugView, Google Ads conversion diagnostics, Meta Test Events/Pixel Helper, network checks after rejection/revocation, and one-lead-per-CTA checks still require authorized real IDs in preview/production.
- A production privacy-policy route and visible link remain mandatory before ads launch; the footer continues to state that the policy is coming soon rather than linking to a missing route.
- Provider scripts already loaded before revocation cannot be unloaded reliably. The implementation issues provider-level denial/revoke commands and prevents new application event dispatch; queued/in-flight network activity remains subject to each provider's consent implementation.
