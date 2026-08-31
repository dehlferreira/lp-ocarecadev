# Tracking e Ads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement consent-gated GA4, Google Ads and Meta Pixel tracking that measures visits and WhatsApp lead intent, including the selected plan.

**Architecture:** A small browser tracking runtime owns consent persistence, lazy third-party initialization through Partytown, event normalization and navigation-safe CTA reporting. Astro components only declare semantics through `data-track-*` attributes; they do not call vendor APIs. GA4 is the measurement source of truth, while Google Ads and Meta receive only the compatible advertising events after explicit consent.

**Tech Stack:** Astro 6, vanilla browser JavaScript, `@astrojs/partytown`, Node built-in test runner, Google Analytics 4, Google Ads and Meta Pixel.

**Spec:** `docs/superpowers/specs/2026-08-30-tracking-e-ads-design.md`

## Global Constraints

- Do not add Google Tag Manager, server-side GTM, Meta Conversions API or a third-party consent-management dependency.
- Do not send GA4, Google Ads or Meta requests until the visitor explicitly accepts analytics/marketing cookies.
- Keep third-party tags off the main thread using the existing Partytown integration.
- Treat only `generate_lead` as the primary ads conversion; configure Google Ads to count one conversion per ad click.
- Never send phone number, WhatsApp message, name, email or other personal data in events.
- Missing, blank or placeholder environment IDs must disable only that provider and must not affect navigation.
- Do not version actual platform IDs; document only variable names in `.env.example`.
- Preserve the existing landing experience when the visitor rejects tracking, blocks scripts or has no JavaScript.

---

## File Structure

| File                                     | Responsibility                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/scripts/tracking.js`                | Browser-only consent state, provider loading, event dispatch, CTA/scroll observers and exported pure helpers. |
| `src/components/ui/CookieConsent.astro`  | Accessible cookie banner and preference-reopen control; delegates behavior to `tracking.js`.                  |
| `src/layouts/Layout.astro`               | Supplies public provider configuration to the runtime and includes the banner/runtime once per page.          |
| `src/components/ui/Button.astro`         | Extends the existing button prop contract so `data-track-*` attributes pass through without loss.             |
| `src/components/sections/Header.astro`   | Labels the desktop and mobile WhatsApp CTAs as generic leads.                                                 |
| `src/components/sections/Hero.astro`     | Labels internal navigation CTAs as non-conversion content selections.                                         |
| `src/components/sections/Pricing.astro`  | Labels plan CTAs with plan name, BRL reference value and location.                                            |
| `src/components/sections/CtaFinal.astro` | Labels the final WhatsApp CTA as a generic lead.                                                              |
| `src/components/sections/Footer.astro`   | Adds a visible control to reopen cookie preferences and privacy-policy link target.                           |
| `src/scripts/scrollAnimations.js`        | Removes the incorrect hard-coded lead handler; retains presentation behavior only.                            |
| `astro.config.mjs`                       | Configures the required Partytown forwarding for `dataLayer.push` and `fbq`.                                  |
| `.env.example`                           | Documents public tracking variables and safe placeholder values.                                              |
| `test/tracking.test.mjs`                 | Tests the runtime's consent/event contract and verifies all CTA declarations.                                 |
| `README.md`                              | Documents local configuration, preview validation and production platform setup.                              |

## Event Contract

`tracking.js` must expose these functions for tests and page initialization:

```js
export const CONSENT_STORAGE_KEY = "ocarecadev_tracking_consent";
export const CONSENT_VERSION = 1;

export function isConfigured(value, prefix) {}
export function readConsent(storage) {}
export function createEventId() {}
export function buildLeadPayload(element) {}
export function initTracking(config) {}
```

`readConsent(storage)` returns `'accepted'`, `'rejected'` or `null`; stored data is JSON with `{ version: CONSENT_VERSION, choice: 'accepted' | 'rejected' }`. `buildLeadPayload(element)` returns `{ cta_location, plan_name?, plan_value?, currency: 'BRL', event_id }` and reads only `data-track-*` attributes. `initTracking(config)` attaches the banner, CTA and `#pricing` visibility listeners; it must not create vendor tags until consent is accepted.

## Task 1: Create the tested tracking runtime

**Files:**

- Create: `src/scripts/tracking.js`
- Create: `test/tracking.test.mjs`
- Modify: `astro.config.mjs`

**Interfaces:**

- Consumes: `TrackingConfig = { gaId?: string, googleAdsId?: string, googleAdsConversionLabel?: string, metaPixelId?: string }` supplied by `Layout.astro` in Task 2.
- Produces: `initTracking(config)`, `isConfigured(value, prefix)`, `readConsent(storage)`, `createEventId()` and `buildLeadPayload(element)` for Tasks 2 and 3.

- [ ] **Step 1: Write the failing helper-contract tests**

Create `test/tracking.test.mjs` with the following tests. Use a minimal mock element exposing `dataset`, so tests do not require a DOM package.

```js
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CONSENT_STORAGE_KEY,
  buildLeadPayload,
  isConfigured,
  readConsent,
} from "../src/scripts/tracking.js";

test("accepts only valid provider identifiers", () => {
  assert.equal(isConfigured("G-ABC123", "G-"), true);
  assert.equal(isConfigured("AW-123456789", "AW-"), true);
  assert.equal(isConfigured("G-XXXXXXXXXX", "G-"), false);
  assert.equal(isConfigured("", "G-"), false);
  assert.equal(isConfigured(undefined, "G-"), false);
});

test("reads only a current valid consent choice", () => {
  const accepted = {
    getItem: (key) =>
      key === CONSENT_STORAGE_KEY ? '{"version":1,"choice":"accepted"}' : null,
  };
  const stale = { getItem: () => '{"version":0,"choice":"accepted"}' };
  const malformed = { getItem: () => "{not-json}" };
  assert.equal(readConsent(accepted), "accepted");
  assert.equal(readConsent(stale), null);
  assert.equal(readConsent(malformed), null);
});

test("builds a non-personal payload for a plan lead", () => {
  const payload = buildLeadPayload({
    dataset: {
      trackLocation: "pricing",
      trackPlan: "landing_que_vende",
      trackValue: "997",
    },
  });
  assert.equal(payload.cta_location, "pricing");
  assert.equal(payload.plan_name, "landing_que_vende");
  assert.equal(payload.plan_value, 997);
  assert.equal(payload.currency, "BRL");
  assert.match(payload.event_id, /^[a-z0-9-]+$/);
  assert.deepEqual(Object.keys(payload).sort(), [
    "cta_location",
    "currency",
    "event_id",
    "plan_name",
    "plan_value",
  ]);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tracking.test.mjs`

Expected: failure because `src/scripts/tracking.js` does not exist.

- [ ] **Step 3: Implement pure configuration, consent and payload helpers**

Create `src/scripts/tracking.js`. Keep top-level code safe to import in Node: access `window`, `document`, `localStorage` and `crypto` only inside functions. Implement the exports exactly as declared in the Event Contract. `isConfigured` rejects whitespace-only values and values containing `XXXX` or equal to `1234567890`. `readConsent` catches invalid JSON and validates both version and choice. `createEventId` uses `crypto.randomUUID()` when present and otherwise returns a lowercase base-36 timestamp/random string. `buildLeadPayload` converts `trackValue` to a finite number only, and omits plan fields for non-plan CTAs.

```js
export const CONSENT_STORAGE_KEY = "ocarecadev_tracking_consent";
export const CONSENT_VERSION = 1;

export function isConfigured(value, prefix) {
  return (
    typeof value === "string" &&
    value.trim().startsWith(prefix) &&
    !value.includes("XXXX") &&
    value !== "1234567890"
  );
}

export function readConsent(storage) {
  try {
    const value = JSON.parse(storage.getItem(CONSENT_STORAGE_KEY));
    return value?.version === CONSENT_VERSION &&
      ["accepted", "rejected"].includes(value.choice)
      ? value.choice
      : null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run the helper tests and Astro type checking**

Run: `node --test test/tracking.test.mjs && npx astro check`

Expected: all three tests pass and Astro reports no errors.

- [ ] **Step 5: Add consent-gated provider initialization and dispatch**

In the same runtime, implement private `loadGoogle`, `loadMeta`, `trackPageView`, `trackEvent`, `trackLead`, `trackPlanView` and `trackScrollDepth` functions. They must:

```js
function trackLead(element) {
  const payload = buildLeadPayload(element);
  trackEvent("generate_lead", payload);
  if (payload.plan_name)
    trackEvent("select_item", {
      ...payload,
      items: [{ item_name: payload.plan_name, price: payload.plan_value }],
    });
}
```

- Inject the GA4/Google Ads and Meta scripts with `type = 'text/partytown'` only from the accepted-consent path.
- Call `gtag('config', gaId)` and `gtag('config', googleAdsId)` only for valid configured IDs; call `fbq('init', metaPixelId)` only for a valid Meta ID.
- Map `page_view` to GA4 and Meta `PageView`; map a first-time pricing-section visibility to GA4 `view_item_list` and Meta `ViewContent`; map a lead to GA4 `generate_lead`, Google Ads `conversion` with the configured `send_to`, and Meta `Lead`.
- Use a `Set` of emitted event IDs/scroll thresholds to prevent repeat firing in a page view.
- Catch provider invocation failures and return; never block a CTA because a vendor library failed.

Update `astro.config.mjs` to forward `dataLayer.push` and `fbq` to Partytown, preserving the existing `site` and `server` settings:

```js
integrations: [partytown({ forward: ['dataLayer.push', 'fbq'] })],
```

- [ ] **Step 6: Extend the runtime tests for provider isolation**

Add a test that imports `initTracking` successfully when no browser globals exist, and source assertions that verify `loadGoogle` and `loadMeta` are only called from the accepted-consent branch. Keep the assertions concrete:

```js
test("runtime import has no browser side effects", async () => {
  const runtime = await import("../src/scripts/tracking.js");
  assert.equal(typeof runtime.initTracking, "function");
});
```

- [ ] **Step 7: Run the runtime test suite and build**

Run: `node --test test/tracking.test.mjs && npm run build`

Expected: all runtime tests pass and Astro completes a production build.

- [ ] **Step 8: Commit the runtime foundation**

```bash
git add src/scripts/tracking.js test/tracking.test.mjs astro.config.mjs
git commit -m "feat: add consent-gated tracking runtime"
```

## Task 2: Add the consent experience and wire the runtime into the layout

**Files:**

- Create: `src/components/ui/CookieConsent.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/sections/Footer.astro`
- Modify: `test/tracking.test.mjs`

**Interfaces:**

- Consumes: `initTracking(config)` and `CONSENT_STORAGE_KEY` from Task 1.
- Produces: `#cookie-consent`, `#cookie-consent-accept`, `#cookie-consent-reject`, and `[data-open-cookie-preferences]` elements used by `initTracking`.

- [ ] **Step 1: Write failing markup-contract tests**

Append tests that read Astro files with `readFileSync` and assert these exact controls:

```js
test("cookie controls offer equal accept and reject actions", () => {
  const consent = read("src/components/ui/CookieConsent.astro");
  assert.match(consent, /id="cookie-consent"/);
  assert.match(consent, /id="cookie-consent-accept"/);
  assert.match(consent, /id="cookie-consent-reject"/);
  assert.match(consent, /aria-labelledby="cookie-consent-title"/);
});

test("layout supplies all public tracking configuration without hard-coded IDs", () => {
  const layout = read("src/layouts/Layout.astro");
  assert.match(layout, /PUBLIC_GOOGLE_ADS_ID/);
  assert.match(layout, /PUBLIC_GOOGLE_ADS_CONVERSION_LABEL/);
  assert.match(layout, /<CookieConsent \/>/);
  assert.doesNotMatch(layout, /fbq\('init'/);
});
```

- [ ] **Step 2: Run the markup tests to verify they fail**

Run: `node --test test/tracking.test.mjs`

Expected: failure because the cookie component and required layout integration do not exist.

- [ ] **Step 3: Implement accessible consent UI and preference reopening**

Create `CookieConsent.astro` as a `role="dialog"`, `aria-live="polite"` region with plain Portuguese purpose text, “Aceitar” and “Recusar” buttons of equal visual weight. Render it hidden only when a stored choice exists; the runtime updates visibility after selection. Do not include vendor scripts in this component.

Add to `Footer.astro` a `button type="button" data-open-cookie-preferences` labelled “Preferências de cookies” and a link to `/privacidade` only if that route will be created in this change; otherwise use a non-deceptive “Política de privacidade em breve” text rather than a broken link.

In `Layout.astro`, remove the current eager GA/Meta Partytown script blocks. Import and render `<CookieConsent />`; build a `trackingConfig` object from the four `PUBLIC_*` variables; pass it to a bundled module script that invokes `initTracking(trackingConfig)` on `astro:page-load` and only once per document. Preserve the existing scroll animation script separately.

- [ ] **Step 4: Add consent lifecycle tests**

Add unit tests using a Map-backed storage mock for: first visit returns `null`; accepting persists the current schema; rejecting persists the current schema; reopening preferences removes the stored value and displays the banner. Expose a small exported `writeConsent(storage, choice)` helper from `tracking.js` if needed, and add it to the Event Contract in the implementation.

- [ ] **Step 5: Run tests, type check and build**

Run: `node --test test/tracking.test.mjs && npx astro check && npm run build`

Expected: all tests pass, no Astro diagnostics and a successful production build.

- [ ] **Step 6: Commit the consent integration**

```bash
git add src/components/ui/CookieConsent.astro src/layouts/Layout.astro src/components/sections/Footer.astro src/scripts/tracking.js test/tracking.test.mjs
git commit -m "feat: add cookie consent controls"
```

## Task 3: Declare every CTA and funnel observation

**Files:**

- Modify: `src/components/ui/Button.astro`
- Modify: `src/components/sections/Header.astro`
- Modify: `src/components/sections/Hero.astro`
- Modify: `src/components/sections/Pricing.astro`
- Modify: `src/components/sections/CtaFinal.astro`
- Modify: `src/scripts/scrollAnimations.js`
- Modify: `src/scripts/tracking.js`
- Modify: `test/tracking.test.mjs`

**Interfaces:**

- Consumes: `data-track-event`, `data-track-location`, `data-track-plan` and optional `data-track-value` from Astro markup; `initTracking(config)` from Task 1.
- Produces: one delegated click listener that dispatches `select_content`, `select_item` and `generate_lead`; IntersectionObserver measurements for pricing view and 25/50/75/90 scroll depth.

- [ ] **Step 1: Write failing funnel declaration tests**

Add the following source-level tests:

```js
test("only WhatsApp CTAs declare lead tracking", () => {
  const hero = read("src/components/sections/Hero.astro");
  const header = read("src/components/sections/Header.astro");
  const pricing = read("src/components/sections/Pricing.astro");
  const finalCta = read("src/components/sections/CtaFinal.astro");
  assert.match(hero, /data-track-event="select_content"/);
  assert.doesNotMatch(hero, /data-track-event="lead"/);
  assert.equal((header.match(/data-track-event="lead"/g) ?? []).length, 2);
  assert.equal((pricing.match(/data-track-event="lead"/g) ?? []).length, 3);
  assert.equal((finalCta.match(/data-track-event="lead"/g) ?? []).length, 1);
});

test("each pricing CTA declares its plan and BRL reference value", () => {
  const pricing = read("src/components/sections/Pricing.astro");
  assert.match(
    pricing,
    /data-track-plan="express"[\s\S]*data-track-value="597"/,
  );
  assert.match(
    pricing,
    /data-track-plan="landing_que_vende"[\s\S]*data-track-value="997"/,
  );
  assert.match(
    pricing,
    /data-track-plan="maquina_de_clientes"[\s\S]*data-track-value="2497"/,
  );
});
```

- [ ] **Step 2: Run the funnel tests to verify they fail**

Run: `node --test test/tracking.test.mjs`

Expected: failure because the current CTAs lack the declared tracking attributes.

- [ ] **Step 3: Add semantic tracking declarations to CTAs**

Ensure `Button.astro` keeps rest props on the rendered element, then add:

```astro
<!-- Hero: both links are navigation signals, not leads -->
data-track-event="select_content"
data-track-location="hero"

<!-- Generic WhatsApp CTA -->
data-track-event="lead"
data-track-location="header"

<!-- Plan WhatsApp CTA -->
data-track-event="lead"
data-track-location="pricing"
data-track-plan="landing_que_vende"
data-track-value="997"
```

Use `header` and `header_mobile` for the two header buttons; `hero_primary` and `hero_secondary` for its internal links; `pricing` for all plan buttons; and `final_cta` for the last WhatsApp button. Apply plan/value pairs `express`/`597`, `landing_que_vende`/`997`, and `maquina_de_clientes`/`2497`.

- [ ] **Step 4: Replace the hard-coded handler with delegated tracking**

Delete `initAnalytics` and its call from `scrollAnimations.js`; it currently reports `generate_lead` for a non-lead hero button and directly references inaccessible vendor globals.

In `tracking.js`, use one document click listener. For a matching `[data-track-event]` element, emit `select_content` for internal navigation. For a `lead` element, emit `select_item` first when a plan is present, then `generate_lead`. If the element points to `https://wa.me/`, delay same-tab navigation for at most 250 ms to allow queued events to begin; preserve modifier-click behavior, `target="_blank"`, keyboard activation and normal navigation if consent is not accepted.

Add an `IntersectionObserver` for `#pricing` with threshold `0.35` and disconnect after its first accepted-consent `view_item_list`. Add a passive throttled scroll listener that emits each `scroll_depth` threshold at 25, 50, 75 and 90 percent once. The thresholds must be calculated from `document.documentElement.scrollHeight - window.innerHeight`, guarding zero/negative denominators.

- [ ] **Step 5: Expand tests for the corrected event behavior**

Add tests that inspect `scrollAnimations.js` and `tracking.js`:

```js
test("legacy animation script does not dispatch vendor conversion events", () => {
  const scroll = read("src/scripts/scrollAnimations.js");
  assert.doesNotMatch(
    scroll,
    /generate_lead|fbq\('track', 'Lead'\)|gtag\('event'/,
  );
});

test("tracking runtime observes pricing and all approved scroll thresholds", () => {
  const runtime = read("src/scripts/tracking.js");
  assert.match(runtime, /document\.getElementById\('pricing'\)/);
  assert.match(runtime, /\[25, 50, 75, 90\]/);
  assert.match(runtime, /data-track-event/);
});
```

- [ ] **Step 6: Run the full automated suite and production build**

Run: `node --test test/*.test.mjs && npx astro check && npm run build`

Expected: all existing site-polish tests and all tracking tests pass; Astro type checking and production build succeed.

- [ ] **Step 7: Commit CTA instrumentation**

```bash
git add src/components/ui/Button.astro src/components/sections/Header.astro src/components/sections/Hero.astro src/components/sections/Pricing.astro src/components/sections/CtaFinal.astro src/scripts/scrollAnimations.js src/scripts/tracking.js test/tracking.test.mjs
git commit -m "feat: track CTA and plan lead intent"
```

## Task 4: Document configuration and perform provider validation

**Files:**

- Create: `.env.example`
- Modify: `README.md`
- Modify: `test/tracking.test.mjs`

**Interfaces:**

- Consumes: the four `PUBLIC_*` variable names and event contract from Tasks 1–3.
- Produces: reproducible developer setup and a release checklist for GA4, Google Ads and Meta validation.

- [ ] **Step 1: Write failing documentation/configuration tests**

Add tests that read `.env.example` and `README.md` and assert all four variable names, `generate_lead`, `GA4 DebugView`, `Meta Test Events`, and `Google Ads` are documented.

```js
test("setup documentation names every tracking credential and validation tool", () => {
  const env = read(".env.example");
  const readme = read("README.md");
  for (const name of [
    "PUBLIC_GA_ID",
    "PUBLIC_GOOGLE_ADS_ID",
    "PUBLIC_GOOGLE_ADS_CONVERSION_LABEL",
    "PUBLIC_META_PIXEL_ID",
  ]) {
    assert.match(env, new RegExp(name));
    assert.match(readme, new RegExp(name));
  }
  assert.match(readme, /GA4 DebugView/);
  assert.match(readme, /Meta Test Events/);
  assert.match(readme, /Google Ads/);
});
```

- [ ] **Step 2: Run documentation tests to verify they fail**

Run: `node --test test/tracking.test.mjs`

Expected: failure because no environment example and no tracking runbook exist.

- [ ] **Step 3: Add safe environment configuration and operator runbook**

Create `.env.example` with exactly:

```dotenv
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=replace_with_conversion_label
PUBLIC_META_PIXEL_ID=1234567890
```

Add a “Tracking e anúncios” section to `README.md` that covers: copying `.env.example` to `.env`; deploying variables in the hosting provider; creating GA4 and linking it to Google Ads; marking `generate_lead` as a GA4 key event; importing it with category Lead and count One; creating the Meta Pixel and using `Lead` for optimization; preserving UTM, `gclid` and `fbclid` query parameters; and the exact browser validation sequence below.

```text
1. Open a private window and load the production or preview URL.
2. Reject cookies; confirm DevTools Network has no requests to googletagmanager.com, google-analytics.com, googleadservices.com or connect.facebook.net.
3. Reopen preferences, accept cookies and reload once.
4. In GA4 DebugView, confirm page_view, view_item_list, scroll_depth and generate_lead.
5. Click each plan; confirm select_item includes its plan and exactly one generate_lead occurs.
6. In Meta Test Events or Pixel Helper, confirm PageView, ViewContent and Lead.
7. In Google Ads conversion diagnostics, confirm the Lead action receives test activity after account linking.
```

- [ ] **Step 4: Run all automated checks**

Run: `node --test test/*.test.mjs && npx astro check && npm run build`

Expected: all test files pass, Astro has no errors and the production build completes.

- [ ] **Step 5: Execute the manual preview smoke test**

Run: `npm run dev`

Expected: Astro prints a local URL. In a private browser window, follow the seven validation steps documented in the README using safe placeholder IDs first; repeat with real IDs only in an authorized preview/production environment. Record pass/fail for consent refusal, acceptance, every CTA, the three plan values, and each provider debugger in the pull request or release note.

- [ ] **Step 6: Commit documentation and validation coverage**

```bash
git add .env.example README.md test/tracking.test.mjs
git commit -m "docs: add tracking setup and validation guide"
```

## Final Verification

- [ ] Run `git diff main...HEAD --check` and confirm no whitespace errors.
- [ ] Run `node --test test/*.test.mjs && npx astro check && npm run build` once from a clean checkout.
- [ ] Confirm no actual provider ID, conversion label, phone number, WhatsApp message or personal data is present in the diff.
- [ ] Confirm the production privacy-policy route/link is available before making ads live.
- [ ] Confirm the manual provider validation record shows one lead per WhatsApp CTA and no traffic after consent rejection.
