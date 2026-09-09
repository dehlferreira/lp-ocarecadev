import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
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

test('setup documentation names every tracking credential and validation tool', () => {
  const env = read('.env.example');
  const readme = read('README.md');
  for (const name of ['PUBLIC_GA_ID', 'PUBLIC_GOOGLE_ADS_ID', 'PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'PUBLIC_META_PIXEL_ID']) {
    assert.match(env, new RegExp(name));
    assert.match(readme, new RegExp(name));
  }
  assert.match(readme, /GA4 DebugView/);
  assert.match(readme, /Meta Test Events/);
  assert.match(readme, /Google Ads/);
});

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

let freshImportNumber = 0;

function importFreshTracking() {
  freshImportNumber += 1;
  return import(`../src/scripts/tracking.js?test=${freshImportNumber}`);
}

function createBrowserHarness({ pricingRect = null } = {}) {
  const storage = createStorage();
  const documentListeners = new Map();
  const appendedScripts = [];
  const dispatchedWindowEvents = [];
  const timers = [];
  const observers = [];

  const control = () => {
    const listeners = new Map();
    return {
      dataset: {},
      addEventListener: (name, listener) => listeners.set(name, listener),
      click: () => listeners.get('click')?.({ currentTarget: this }),
    };
  };

  const dialog = { hidden: false };
  const accept = control();
  const reject = control();
  const preferences = control();
  const pricing = pricingRect ? { getBoundingClientRect: () => pricingRect } : null;
  const head = {
    append: (...scripts) => appendedScripts.push(...scripts),
  };
  const document = {
    head,
    documentElement: { scrollHeight: 2000 },
    querySelector(selector) {
      const controlBySelector = {
        '#cookie-consent': dialog,
        '#cookie-consent-accept': accept,
        '#cookie-consent-reject': reject,
      }[selector];
      if (controlBySelector) return controlBySelector;

      const provider = selector.match(/^script\[data-tracking-provider="([^"]+)"\]$/)?.[1];
      return provider
        ? appendedScripts.find((script) => script.dataset.trackingProvider === provider) ?? null
        : null;
    },
    querySelectorAll: (selector) => selector === '[data-open-cookie-preferences]' ? [preferences] : [],
    getElementById: (id) => id === 'pricing' ? pricing : null,
    createElement: (tagName) => ({ tagName: tagName.toUpperCase(), dataset: {}, textContent: '' }),
    addEventListener(name, listener) {
      const listeners = documentListeners.get(name) ?? [];
      listeners.push(listener);
      documentListeners.set(name, listeners);
    },
    dispatch(name, event) {
      for (const listener of documentListeners.get(name) ?? []) listener(event);
    },
  };
  const window = {
    localStorage: storage,
    innerHeight: 1000,
    scrollY: 0,
    location: { href: 'https://www.ocarecadev.com.br/' },
    requestAnimationFrame: (callback) => callback(),
    setTimeout(callback, delay) {
      timers.push({ callback, delay });
      return timers.length;
    },
    dispatchEvent(event) {
      dispatchedWindowEvents.push({ type: event.type, scriptCount: appendedScripts.length });
      return true;
    },
  };

  class FakeIntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      this.observed = [];
      observers.push(this);
    }

    observe(element) {
      this.observed.push(element);
    }

    disconnect() {
      this.disconnected = true;
    }

    trigger(entry) {
      this.callback([entry]);
    }
  }

  return {
    accept,
    appendedScripts,
    dialog,
    dispatchedWindowEvents,
    document,
    observers,
    preferences,
    reject,
    storage,
    timers,
    window,
    globals: {
      window,
      document,
      CustomEvent: class CustomEvent { constructor(type) { this.type = type; } },
      IntersectionObserver: FakeIntersectionObserver,
    },
  };
}

async function withBrowser(harness, callback) {
  const previous = new Map();
  for (const [name, value] of Object.entries(harness.globals)) {
    previous.set(name, Object.hasOwn(globalThis, name) ? globalThis[name] : undefined);
    globalThis[name] = value;
  }

  try {
    return await callback();
  } finally {
    for (const name of Object.keys(harness.globals)) {
      if (previous.get(name) === undefined) delete globalThis[name];
      else globalThis[name] = previous.get(name);
    }
  }
}

function trackedElement({ eventName, location = 'test', plan, value, href = '#pricing', target = '' }) {
  const dataset = {
    trackEvent: eventName,
    trackLocation: location,
    ...(plan ? { trackPlan: plan } : {}),
    ...(value ? { trackValue: value } : {}),
  };

  return {
    dataset,
    href,
    target,
    getAttribute: (name) => name === 'href' ? href : null,
  };
}

function clickEvent(element, overrides = {}) {
  return {
    target: { closest: (selector) => selector === '[data-track-event]' ? element : null },
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...overrides,
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

test('providers remain absent before explicit consent', async () => {
  const harness = createBrowserHarness();

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking({ gaId: 'G-TEST123', metaPixelId: '987654321' });
  });

  assert.equal(harness.appendedScripts.length, 0);
  assert.equal(harness.dispatchedWindowEvents.length, 0);
  assert.equal(harness.dialog.hidden, false);
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

test('body-end boot initializes immediately and remains idempotent for later router events', async () => {
  const harness = createBrowserHarness();
  writeConsent(harness.storage, 'accepted');

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    assert.equal(runtime.bootTracking({ gaId: 'G-TEST123' }), true);
    assert.equal(runtime.bootTracking({ gaId: 'G-TEST123' }), false);
  });

  assert.equal(harness.appendedScripts.filter((script) => script.src).length, 1);
  const layout = read('src/layouts/Layout.astro');
  const directBoot = layout.indexOf('bootTracking(trackingConfig)');
  const routerListener = layout.indexOf("document.addEventListener('astro:page-load'");
  assert.ok(directBoot > -1, 'layout must boot tracking directly at body-end');
  assert.ok(routerListener > directBoot, 'future router event registration comes after direct boot');
});

test('accepted providers append ordered Partytown scripts, notify each group, and emit one page view', async () => {
  const harness = createBrowserHarness();
  writeConsent(harness.storage, 'accepted');

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking({
      gaId: 'G-TEST123',
      googleAdsId: 'AW-TEST123',
      googleAdsConversionLabel: 'valid-label',
      metaPixelId: '987654321',
    });
  });

  assert.deepEqual(
    harness.appendedScripts.map((script) => [script.dataset.trackingProvider, script.src ? 'external' : 'config']),
    [
      ['google', 'config'],
      ['google', 'external'],
      ['meta', 'config'],
      ['meta', 'external'],
    ],
  );
  assert.deepEqual(harness.dispatchedWindowEvents, [
    { type: 'ptupdate', scriptCount: 2 },
    { type: 'ptupdate', scriptCount: 4 },
  ]);

  const googleScript = harness.appendedScripts.find((script) => script.dataset.trackingProvider === 'google' && !script.src);
  const googleSandbox = { window: {} };
  runInNewContext(googleScript.textContent, googleSandbox);
  const googleCommands = Array.from(googleSandbox.window.dataLayer, (args) => Array.from(args));
  const gaConfigIndex = googleCommands.findIndex(([command, id]) => command === 'config' && id === 'G-TEST123');
  const adsConfigIndex = googleCommands.findIndex(([command, id]) => command === 'config' && id === 'AW-TEST123');
  const pageViewIndexes = googleCommands
    .map((command, index) => command[0] === 'event' && command[1] === 'page_view' ? index : -1)
    .filter((index) => index >= 0);
  assert.equal(googleCommands[gaConfigIndex][2].send_page_view, false);
  assert.equal(googleCommands[adsConfigIndex][2].send_page_view, false);
  assert.deepEqual(pageViewIndexes, [Math.max(gaConfigIndex, adsConfigIndex) + 1]);

  const metaScript = harness.appendedScripts.find((script) => script.dataset.trackingProvider === 'meta' && !script.src);
  const metaSandbox = { window: {} };
  runInNewContext(metaScript.textContent, metaSandbox);
  const metaCommands = Array.from(metaSandbox.window.fbq.queue, (args) => Array.from(args));
  assert.equal(metaCommands.filter(([command, event]) => command === 'track' && event === 'PageView').length, 1);
  assert.ok(
    metaCommands.findIndex(([command]) => command === 'init')
      < metaCommands.findIndex(([command, choice]) => command === 'consent' && choice === 'grant'),
  );
});

test('reopening preferences revokes provider consent and blocks later sends', async () => {
  const harness = createBrowserHarness();
  writeConsent(harness.storage, 'accepted');
  const gtagCalls = [];
  const fbqCalls = [];
  harness.window.gtag = (...args) => gtagCalls.push(args);
  harness.window.fbq = (...args) => fbqCalls.push(args);
  const config = {
    gaId: 'G-TEST123',
    googleAdsId: 'AW-TEST123',
    googleAdsConversionLabel: 'valid-label',
    metaPixelId: '987654321',
  };

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking(config);
    harness.preferences.click();

    assert.deepEqual(gtagCalls, [[
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]]);
    assert.deepEqual(fbqCalls, [['consent', 'revoke']]);

    const callsAfterRevocation = gtagCalls.length + fbqCalls.length;
    runtime.trackEvent(config, 'generate_lead', { event_id: 'revoked-lead' });
    assert.equal(gtagCalls.length + fbqCalls.length, callsAfterRevocation);
  });
});

test('placeholder Ads conversion label disables only the direct Ads conversion', async () => {
  const harness = createBrowserHarness();
  writeConsent(harness.storage, 'accepted');
  const gtagCalls = [];
  harness.window.gtag = (...args) => gtagCalls.push(args);
  const config = {
    gaId: 'G-TEST123',
    googleAdsId: 'AW-TEST123',
    googleAdsConversionLabel: 'replace_with_conversion_label',
  };

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking(config);
    runtime.trackEvent(config, 'generate_lead', { event_id: 'partial-config' });
  });

  assert.equal(gtagCalls.filter(([command, event]) => command === 'event' && event === 'generate_lead').length, 1);
  assert.equal(gtagCalls.filter(([command, event]) => command === 'event' && event === 'conversion').length, 0);
});

test('delegated CTA tracking preserves internal and blocked navigation behavior', async () => {
  const harness = createBrowserHarness();
  writeConsent(harness.storage, 'accepted');
  const gtagCalls = [];
  harness.window.gtag = (...args) => gtagCalls.push(args);
  const config = {
    gaId: 'G-TEST123',
    googleAdsId: 'AW-TEST123',
    googleAdsConversionLabel: 'valid-label',
  };

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking(config);

    const internalClick = clickEvent(trackedElement({ eventName: 'select_content' }));
    harness.document.dispatch('click', internalClick);
    assert.equal(internalClick.defaultPrevented, false);

    const whatsappHref = 'https://wa.me/test-destination';
    const leadClick = clickEvent(trackedElement({
      eventName: 'lead',
      location: 'pricing',
      plan: 'express',
      value: '597',
      href: whatsappHref,
    }));
    harness.document.dispatch('click', leadClick);

    assert.equal(leadClick.defaultPrevented, true);
    assert.equal(harness.timers.length, 1);
    assert.equal(harness.timers[0].delay, 250);
    assert.deepEqual(
      gtagCalls.filter(([command]) => command === 'event').map(([, eventName]) => eventName),
      ['select_content', 'select_item', 'generate_lead', 'conversion'],
    );
    assert.equal(gtagCalls.filter(([, eventName]) => eventName === 'generate_lead').length, 1);

    harness.timers[0].callback();
    assert.equal(harness.window.location.href, whatsappHref);

    const newTabClick = clickEvent(trackedElement({ eventName: 'lead', href: whatsappHref, target: '_blank' }));
    harness.document.dispatch('click', newTabClick);
    assert.equal(newTabClick.defaultPrevented, false);
  });

  const rejectedHarness = createBrowserHarness();
  writeConsent(rejectedHarness.storage, 'rejected');
  await withBrowser(rejectedHarness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking(config);
    const rejectedClick = clickEvent(trackedElement({ eventName: 'lead', href: 'https://wa.me/test-destination' }));
    rejectedHarness.document.dispatch('click', rejectedClick);
    assert.equal(rejectedClick.defaultPrevented, false);
  });
});

test('pricing view requires 35 percent visibility and is caught when consent arrives later', async () => {
  const harness = createBrowserHarness({ pricingRect: { top: 1100, bottom: 1500, height: 400 } });
  writeConsent(harness.storage, 'accepted');
  const gtagCalls = [];
  harness.window.gtag = (...args) => gtagCalls.push(args);

  await withBrowser(harness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking({ gaId: 'G-TEST123' });
    assert.equal(harness.observers.length, 1);
    harness.observers[0].trigger({ isIntersecting: true, intersectionRatio: 0.34 });
    assert.equal(gtagCalls.some(([, event]) => event === 'view_item_list'), false);
    harness.observers[0].trigger({ isIntersecting: true, intersectionRatio: 0.35 });
    assert.equal(gtagCalls.filter(([, event]) => event === 'view_item_list').length, 1);
    assert.equal(harness.observers[0].disconnected, true);
  });

  const laterHarness = createBrowserHarness({ pricingRect: { top: 100, bottom: 500, height: 400 } });
  const laterGtagCalls = [];
  laterHarness.window.gtag = (...args) => laterGtagCalls.push(args);
  await withBrowser(laterHarness, async () => {
    const runtime = await importFreshTracking();
    runtime.bootTracking({ gaId: 'G-TEST123' });
    laterHarness.accept.click();
    assert.equal(laterGtagCalls.filter(([, event]) => event === 'view_item_list').length, 1);
  });
});

test('Partytown resolves only Meta script requests through the documented same-origin proxy', async () => {
  const { resolvePartytownUrl } = await import('../astro.config.mjs');
  const location = { origin: 'https://www.ocarecadev.com.br' };
  const metaUrl = new URL('https://connect.facebook.net/en_US/fbevents.js');
  const googleUrl = new URL('https://www.googletagmanager.com/gtag/js?id=G-TEST123');

  const resolvedMeta = resolvePartytownUrl(metaUrl, location, 'script');
  assert.equal(resolvedMeta.origin, location.origin);
  assert.equal(resolvedMeta.pathname, '/partytown-proxy');
  assert.equal(resolvedMeta.searchParams.get('url'), metaUrl.href);
  assert.equal(resolvePartytownUrl(googleUrl, location, 'script'), googleUrl);
});

test('consent copy and runbook disclose marketing providers and one primary Ads conversion path', () => {
  const consent = read('src/components/ui/CookieConsent.astro');
  assert.match(consent, /análise|analytics/i);
  assert.match(consent, /marketing|remarketing/i);
  assert.match(consent, /Google/);
  assert.match(consent, /Meta/);

  const readme = read('README.md');
  assert.match(readme, /conversão direta[^\n]*primária/i);
  assert.match(readme, /importad[^\n]*GA4[^\n]*secundári/i);
  assert.match(readme, /\/partytown-proxy/);
  assert.match(readme, /connect\.facebook\.net/);
  assert.match(readme, /política de privacidade[^\n]*pré-requisito/i);
});
