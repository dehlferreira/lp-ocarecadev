import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import * as tracking from '../src/scripts/tracking.js';

const {
  CONSENT_STORAGE_KEY,
  buildLeadPayload,
  initTracking,
  isConfigured,
  readConsent,
  trackEvent,
  writeConsent,
  clearConsent,
} = tracking;

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
}

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

function createConsentDocument() {
  const control = () => {
    const listeners = new Map();
    return {
      dataset: {},
      addEventListener: (name, listener) => listeners.set(name, listener),
      click: () => listeners.get('click')(),
    };
  };
  const accept = control();
  const reject = control();
  const preferences = control();
  const dialog = { hidden: false };

  return {
    dialog,
    accept,
    reject,
    preferences,
    querySelector: (selector) => ({
      '#cookie-consent': dialog,
      '#cookie-consent-accept': accept,
      '#cookie-consent-reject': reject,
    })[selector] ?? null,
    querySelectorAll: (selector) => selector === '[data-open-cookie-preferences]' ? [preferences] : [],
  };
}

test('accepts only valid provider identifiers', () => {
  assert.equal(isConfigured('G-ABC123', 'G-'), true);
  assert.equal(isConfigured('AW-123456789', 'AW-'), true);
  assert.equal(isConfigured('G-XXXXXXXXXX', 'G-'), false);
  assert.equal(isConfigured('', 'G-'), false);
  assert.equal(isConfigured(undefined, 'G-'), false);
});

test('reads only a current valid consent choice', () => {
  const accepted = { getItem: (key) => key === CONSENT_STORAGE_KEY ? '{"version":1,"choice":"accepted"}' : null };
  const stale = { getItem: () => '{"version":0,"choice":"accepted"}' };
  const malformed = { getItem: () => '{not-json}' };
  assert.equal(readConsent(accepted), 'accepted');
  assert.equal(readConsent(stale), null);
  assert.equal(readConsent(malformed), null);
});

test('first visit has no consent choice', () => {
  assert.equal(readConsent(createStorage()), null);
});

test('accepting persists the current consent schema', () => {
  const storage = createStorage();

  assert.equal(typeof writeConsent, 'function');
  writeConsent(storage, 'accepted');

  assert.equal(storage.getItem(CONSENT_STORAGE_KEY), '{"version":1,"choice":"accepted"}');
  assert.equal(readConsent(storage), 'accepted');
});

test('rejecting persists the current consent schema', () => {
  const storage = createStorage();

  assert.equal(typeof writeConsent, 'function');
  writeConsent(storage, 'rejected');

  assert.equal(storage.getItem(CONSENT_STORAGE_KEY), '{"version":1,"choice":"rejected"}');
  assert.equal(readConsent(storage), 'rejected');
});

test('accepting then reopening and rejecting prevents subsequent vendor dispatch', () => {
  const storage = createStorage();
  const consentDocument = createConsentDocument();
  const gtagCalls = [];
  const fbqCalls = [];
  const config = {
    gaId: 'G-TEST123',
    googleAdsId: 'AW-TEST123',
    googleAdsConversionLabel: 'test-label',
    metaPixelId: '987654321',
  };
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  globalThis.window = {
    localStorage: storage,
    gtag: (...args) => gtagCalls.push(args),
    fbq: (...args) => fbqCalls.push(args),
  };
  globalThis.document = consentDocument;

  try {
    initTracking(config);
    consentDocument.accept.click();
    assert.equal(consentDocument.dialog.hidden, true);
    assert.equal(readConsent(storage), 'accepted');
    assert.ok(gtagCalls.length + fbqCalls.length > 0, 'acceptance starts configured providers');

    consentDocument.preferences.click();

    assert.equal(typeof clearConsent, 'function');
    assert.equal(readConsent(storage), null);
    assert.equal(consentDocument.dialog.hidden, false);

    const callsBeforeReopenedInteraction = gtagCalls.length + fbqCalls.length;
    trackEvent(config, 'generate_lead', { event_id: 'after-reopen' });
    assert.equal(gtagCalls.length + fbqCalls.length, callsBeforeReopenedInteraction);

    consentDocument.reject.click();
    assert.equal(readConsent(storage), 'rejected');
    assert.equal(consentDocument.dialog.hidden, true);

    const callsBeforeRejectedInteraction = gtagCalls.length + fbqCalls.length;
    assert.equal(typeof trackEvent, 'function');
    trackEvent(config, 'generate_lead', { event_id: 'after-reopen-reject' });
    assert.equal(gtagCalls.length + fbqCalls.length, callsBeforeRejectedInteraction);
  } finally {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  }
});

test('tracked interactions stop when persisted consent is no longer accepted', () => {
  const storage = createStorage();
  const consentDocument = createConsentDocument();
  const gtagCalls = [];
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  globalThis.window = {
    localStorage: storage,
    gtag: (...args) => gtagCalls.push(args),
  };
  globalThis.document = consentDocument;

  try {
    writeConsent(storage, 'accepted');
    initTracking({ gaId: 'G-TEST123' });
    trackEvent({ gaId: 'G-TEST123' }, 'generate_lead', { event_id: 'before-revocation' });
    assert.ok(gtagCalls.length > 0, 'accepted consent allows configured providers');
    const callsBeforeRevocation = gtagCalls.length;

    writeConsent(storage, 'rejected');
    trackEvent({ gaId: 'G-TEST123' }, 'generate_lead', { event_id: 'after-revocation' });

    assert.equal(gtagCalls.length, callsBeforeRevocation);
    initTracking({ gaId: 'G-TEST123' });
  } finally {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  }
});

test('builds a non-personal payload for a plan lead', () => {
  const payload = buildLeadPayload({ dataset: {
    trackLocation: 'pricing', trackPlan: 'landing_que_vende', trackValue: '997',
  }});
  assert.equal(payload.cta_location, 'pricing');
  assert.equal(payload.plan_name, 'landing_que_vende');
  assert.equal(payload.plan_value, 997);
  assert.equal(payload.currency, 'BRL');
  assert.match(payload.event_id, /^[a-z0-9-]+$/);
  assert.deepEqual(Object.keys(payload).sort(), ['cta_location', 'currency', 'event_id', 'plan_name', 'plan_value']);
});

test('omits a missing plan reference value instead of sending zero', () => {
  const payload = buildLeadPayload({ dataset: {
    trackLocation: 'pricing', trackPlan: 'landing_que_vende', trackValue: '',
  }});

  assert.equal(payload.plan_name, 'landing_que_vende');
  assert.equal(Object.hasOwn(payload, 'plan_value'), false);
});

test('runtime import has no browser side effects', async () => {
  const runtime = await import('../src/scripts/tracking.js');
  assert.equal(typeof runtime.initTracking, 'function');
});

test('providers initialize only from the accepted-consent branch', () => {
  const source = readFileSync(new URL('../src/scripts/tracking.js', import.meta.url), 'utf8');
  const acceptedBranch = source.match(/if \(consent === 'accepted'\) \{([\s\S]*?)\n  \}/);

  assert.ok(acceptedBranch, 'initTracking must have an accepted-consent branch');
  assert.match(acceptedBranch[1], /startAcceptedTracking\(config\);/);
  const starter = source.match(/function startAcceptedTracking\(config\) \{([\s\S]*?)\n\}/);
  assert.ok(starter, 'accepted tracking must be started through a consent-gated helper');
  assert.match(starter[1], /loadGoogle\(config\);/);
  assert.match(starter[1], /loadMeta\(config\);/);
});

test('scroll depth deduplicates each threshold independently', () => {
  const source = readFileSync(new URL('../src/scripts/tracking.js', import.meta.url), 'utf8');
  assert.match(source, /scroll_depth:\$\{payload\.percent_scrolled\}/);
});

test('cookie controls offer equal accept and reject actions', () => {
  const consent = read('src/components/ui/CookieConsent.astro');
  assert.match(consent, /id="cookie-consent"/);
  assert.match(consent, /id="cookie-consent-accept"/);
  assert.match(consent, /id="cookie-consent-reject"/);
  assert.match(consent, /aria-labelledby="cookie-consent-title"/);
});

test('layout supplies all public tracking configuration without hard-coded IDs', () => {
  const layout = read('src/layouts/Layout.astro');
  assert.match(layout, /PUBLIC_GOOGLE_ADS_ID/);
  assert.match(layout, /PUBLIC_GOOGLE_ADS_CONVERSION_LABEL/);
  assert.match(layout, /<CookieConsent \/>/);
  assert.doesNotMatch(layout, /fbq\('init'/);
});

test('scroll animations do not emit vendor events before consent', () => {
  const scrollAnimations = read('src/scripts/scrollAnimations.js');

  assert.doesNotMatch(scrollAnimations, /\bfbq\s*\(/);
  assert.doesNotMatch(scrollAnimations, /\bgtag\s*\(/);
});

test('only WhatsApp CTAs declare lead tracking', () => {
  const hero = read('src/components/sections/Hero.astro');
  const header = read('src/components/sections/Header.astro');
  const pricing = read('src/components/sections/Pricing.astro');
  const finalCta = read('src/components/sections/CtaFinal.astro');
  assert.match(hero, /data-track-event="select_content"/);
  assert.doesNotMatch(hero, /data-track-event="lead"/);
  assert.equal((header.match(/data-track-event="lead"/g) ?? []).length, 2);
  assert.equal((pricing.match(/data-track-event="lead"/g) ?? []).length, 3);
  assert.equal((finalCta.match(/data-track-event="lead"/g) ?? []).length, 1);
});

test('each pricing CTA declares its plan and BRL reference value', () => {
  const pricing = read('src/components/sections/Pricing.astro');
  assert.match(pricing, /data-track-plan="express"[\s\S]*data-track-value="597"/);
  assert.match(pricing, /data-track-plan="landing_que_vende"[\s\S]*data-track-value="997"/);
  assert.match(pricing, /data-track-plan="maquina_de_clientes"[\s\S]*data-track-value="2497"/);
});

test('legacy animation script does not dispatch vendor conversion events', () => {
  const scroll = read('src/scripts/scrollAnimations.js');
  assert.doesNotMatch(scroll, /generate_lead|fbq\('track', 'Lead'\)|gtag\('event'/);
});

test('tracking runtime observes pricing and all approved scroll thresholds', () => {
  const runtime = read('src/scripts/tracking.js');
  assert.match(runtime, /document\.getElementById\('pricing'\)/);
  assert.match(runtime, /\[25, 50, 75, 90\]/);
  assert.match(runtime, /data-track-event/);
});
