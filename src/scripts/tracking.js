export const CONSENT_STORAGE_KEY = 'ocarecadev_tracking_consent';
export const CONSENT_VERSION = 1;

export function isConfigured(value, prefix) {
  return typeof value === 'string'
    && value.trim().startsWith(prefix)
    && !value.includes('XXXX')
    && value !== '1234567890';
}

export function readConsent(storage) {
  try {
    const value = JSON.parse(storage.getItem(CONSENT_STORAGE_KEY));
    return value?.version === CONSENT_VERSION && ['accepted', 'rejected'].includes(value.choice)
      ? value.choice
      : null;
  } catch {
    return null;
  }
}

// Event Contract: stores only the consent schema { version, choice }.
export function writeConsent(storage, choice) {
  if (!storage || !['accepted', 'rejected'].includes(choice)) return null;

  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ version: CONSENT_VERSION, choice }));
    return choice;
  } catch {
    return null;
  }
}

// Event Contract: removes a stored choice before reopening the consent controls.
export function clearConsent(storage) {
  try {
    storage?.removeItem(CONSENT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function createEventId() {
  const randomUUID = globalThis.crypto?.randomUUID;

  if (typeof randomUUID === 'function') return randomUUID.call(globalThis.crypto).toLowerCase();

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function buildLeadPayload(element) {
  const { trackLocation, trackPlan, trackValue } = element.dataset;
  const payload = {
    cta_location: trackLocation,
    currency: 'BRL',
    event_id: createEventId(),
  };

  if (!trackPlan) return payload;

  payload.plan_name = trackPlan;
  const planValue = Number(trackValue);
  if (trackValue?.trim() && Number.isFinite(planValue)) payload.plan_value = planValue;

  return payload;
}

const emittedEventKeys = new Set();
let acceptedTrackingStarted = false;
let hasActiveConsent = false;
const bootedTrackingDocuments = new WeakSet();
const funnelTrackingDocuments = new WeakSet();
const pricingObservers = new WeakMap();
const startedProviders = { google: false, meta: false };

const GRANTED_GOOGLE_CONSENT = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
};

const DENIED_GOOGLE_CONSENT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

function getConfiguredId(value, prefix) {
  return isConfigured(value, prefix) ? value.trim() : null;
}

function getGoogleAdsConversionLabel(value) {
  if (typeof value !== 'string') return null;

  const label = value.trim();
  return label
    && !/x{4}/i.test(label)
    && label !== 'replace_with_conversion_label'
      ? label
      : null;
}

function getMetaPixelId(value) {
  const pixelId = getConfiguredId(value, '');
  return pixelId && /^\d+$/.test(pixelId) ? pixelId : null;
}

function safeCall(callback) {
  try {
    return callback();
  } catch {
    return undefined;
  }
}

function createPartytownScript(provider, { src, textContent } = {}) {
  const script = document.createElement('script');
  script.type = 'text/partytown';
  script.dataset.trackingProvider = provider;
  if (src) script.src = src;
  if (textContent) script.textContent = textContent;
  return script;
}

function appendPartytownScripts(provider, scripts) {
  return safeCall(() => {
    if (document.querySelector(`script[data-tracking-provider="${provider}"]`)) return false;

    document.head.append(...scripts);
    window.dispatchEvent(new CustomEvent('ptupdate'));
    return true;
  });
}

function scriptValue(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function googleBootstrap(config) {
  const gaId = getConfiguredId(config.gaId, 'G-');
  const googleAdsId = getConfiguredId(config.googleAdsId, 'AW-');
  const commands = [
    'window.dataLayer = window.dataLayer || [];',
    'window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };',
    `window.gtag('consent', 'update', ${scriptValue(GRANTED_GOOGLE_CONSENT)});`,
    "window.gtag('js', new Date());",
  ];

  if (gaId) commands.push(`window.gtag('config', ${scriptValue(gaId)}, { send_page_view: false });`);
  if (googleAdsId) commands.push(`window.gtag('config', ${scriptValue(googleAdsId)}, { send_page_view: false });`);
  if (gaId) commands.push("window.gtag('event', 'page_view');");

  return commands.join('\n');
}

function metaBootstrap(metaPixelId) {
  return [
    'window.fbq = window.fbq || function(){ (window.fbq.queue = window.fbq.queue || []).push(arguments); };',
    'window.fbq.queue = window.fbq.queue || [];',
    `window.fbq('init', ${scriptValue(metaPixelId)});`,
    "window.fbq('consent', 'grant');",
    "window.fbq('track', 'PageView');",
  ].join('\n');
}

function callGtag(...args) {
  return safeCall(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...command) => window.dataLayer.push(command));
    window.gtag(...args);
  });
}

function callFbq(...args) {
  return safeCall(() => {
    window.fbq = window.fbq || ((...command) => window.fbq.queue.push(command));
    window.fbq.queue = window.fbq.queue || [];
    window.fbq(...args);
  });
}

function loadGoogle(config) {
  if (!hasCurrentConsent()) return false;

  const gaId = getConfiguredId(config.gaId, 'G-');
  const googleAdsId = getConfiguredId(config.googleAdsId, 'AW-');

  if (!gaId && !googleAdsId) return false;

  return safeCall(() => appendPartytownScripts('google', [
    createPartytownScript('google', { textContent: googleBootstrap(config) }),
    createPartytownScript('google', {
      src: `https://www.googletagmanager.com/gtag/js?id=${gaId || googleAdsId}`,
    }),
  ])) === true;
}

function loadMeta(config) {
  if (!hasCurrentConsent()) return false;

  const metaPixelId = getMetaPixelId(config.metaPixelId);

  if (!metaPixelId) return false;

  return safeCall(() => appendPartytownScripts('meta', [
    createPartytownScript('meta', { textContent: metaBootstrap(metaPixelId) }),
    createPartytownScript('meta', { src: 'https://connect.facebook.net/en_US/fbevents.js' }),
  ])) === true;
}

function eventKey(eventName, payload) {
  if (eventName === 'scroll_depth') return `scroll_depth:${payload.percent_scrolled}`;
  return payload.event_id ? `${eventName}:${payload.event_id}` : eventName;
}

// Event Contract: dispatches only while the current page has active consent.
export function trackEvent(config, eventName, payload = {}) {
  if (!hasCurrentConsent()) return;

  const key = eventKey(eventName, payload);
  if (emittedEventKeys.has(key)) return;
  emittedEventKeys.add(key);

  if (getConfiguredId(config.gaId, 'G-')) callGtag('event', eventName, payload);

  if (eventName === 'generate_lead') {
    const googleAdsId = getConfiguredId(config.googleAdsId, 'AW-');
    const conversionLabel = getGoogleAdsConversionLabel(config.googleAdsConversionLabel);
    if (googleAdsId && conversionLabel) {
      callGtag('event', 'conversion', { ...payload, send_to: `${googleAdsId}/${conversionLabel}` });
    }
  }

  const metaEvent = {
    page_view: 'PageView',
    view_item_list: 'ViewContent',
    generate_lead: 'Lead',
  }[eventName];
  if (metaEvent && getMetaPixelId(config.metaPixelId)) callFbq('track', metaEvent, payload);
}

function trackLead(element, config) {
  const payload = buildLeadPayload(element);

  if (payload.plan_name) {
    trackEvent(config, 'select_item', {
      ...payload,
      items: [{ item_name: payload.plan_name, price: payload.plan_value }],
    });
  }
  trackEvent(config, 'generate_lead', payload);
}

function trackPlanView(config) {
  trackEvent(config, 'view_item_list');
}

function trackScrollDepth(config, threshold) {
  trackEvent(config, 'scroll_depth', { percent_scrolled: threshold });
}

function trackContent(element, config) {
  trackEvent(config, 'select_content', {
    cta_location: element.dataset.trackLocation,
    event_id: createEventId(),
  });
}

function shouldDelayWhatsAppNavigation(event, element) {
  const href = element.getAttribute?.('href') || '';
  const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

  return href.startsWith('https://wa.me/')
    && !event.defaultPrevented
    && !isModifiedClick
    && event.button === 0
    && (!element.target || element.target === '_self');
}

function delayWhatsAppNavigation(event, element) {
  event.preventDefault();
  const href = element.href;
  window.setTimeout(() => {
    window.location.href = href;
  }, 250);
}

function setupPricingViewTracking(config) {
  const pricing = document.getElementById('pricing');
  if (!pricing) return;

  const trackVisiblePricing = (intersectionRatio) => {
    if (intersectionRatio < 0.35 || !hasCurrentConsent()) return false;

    trackPlanView(config);
    pricingObservers.get(document)?.disconnect();
    pricingObservers.delete(document);
    return true;
  };

  const rect = safeCall(() => pricing.getBoundingClientRect?.());
  if (rect?.height > 0) {
    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    if (trackVisiblePricing(visibleHeight / rect.height)) return;
  }

  if (pricingObservers.has(document) || typeof IntersectionObserver !== 'function') return;

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries.find((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35);
    if (visibleEntry) trackVisiblePricing(visibleEntry.intersectionRatio);
  }, { threshold: 0.35 });

  pricingObservers.set(document, observer);
  observer.observe(pricing);
}

function setupScrollDepthTracking(config) {
  const thresholds = [25, 50, 75, 90];
  let ticking = false;

  const measureScrollDepth = () => {
    ticking = false;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const percentScrolled = (window.scrollY / scrollableHeight) * 100;
    thresholds.forEach((threshold) => {
      if (percentScrolled >= threshold) trackScrollDepth(config, threshold);
    });
  };

  document.addEventListener('scroll', () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(measureScrollDepth);
  }, { passive: true });
}

function setupFunnelTracking(config) {
  if (typeof document.addEventListener !== 'function') return;
  if (!funnelTrackingDocuments.has(document)) {
    funnelTrackingDocuments.add(document);

    document.addEventListener('click', (event) => {
      const element = event.target?.closest?.('[data-track-event]');
      if (!element || !hasCurrentConsent()) return;

      if (element.dataset.trackEvent === 'select_content') {
        trackContent(element, config);
        return;
      }

      if (element.dataset.trackEvent !== 'lead') return;

      trackLead(element, config);
      if (shouldDelayWhatsAppNavigation(event, element)) delayWhatsAppNavigation(event, element);
    });

    setupScrollDepthTracking(config);
  }

  setupPricingViewTracking(config);
}

function getLocalStorage() {
  return safeCall(() => window.localStorage) || null;
}

function hasCurrentConsent() {
  if (!hasActiveConsent) return false;

  const storage = getLocalStorage();
  return !storage || readConsent(storage) === 'accepted';
}

function setConsentDialogVisibility(dialog, visible) {
  if (dialog) dialog.hidden = !visible;
}

function startAcceptedTracking(config) {
  hasActiveConsent = true;
  if (!acceptedTrackingStarted) {
    acceptedTrackingStarted = true;
    startedProviders.google = loadGoogle(config) === true;
    startedProviders.meta = loadMeta(config) === true;
  } else {
    if (startedProviders.google) callGtag('consent', 'update', GRANTED_GOOGLE_CONSENT);
    if (startedProviders.meta) callFbq('consent', 'grant');
  }
  setupFunnelTracking(config);
}

function disableTracking({ notifyProviders = false } = {}) {
  if (notifyProviders && hasActiveConsent) {
    if (startedProviders.google) callGtag('consent', 'update', DENIED_GOOGLE_CONSENT);
    if (startedProviders.meta) callFbq('consent', 'revoke');
  }
  hasActiveConsent = false;
}

function listenOnce(element, eventName, listener) {
  if (!element || element.dataset.trackingListener === eventName) return;
  element.dataset.trackingListener = eventName;
  element.addEventListener('click', listener);
}

export function initTracking(config = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const storage = getLocalStorage();
  const dialog = document.querySelector('#cookie-consent');
  const consent = readConsent(storage);

  setConsentDialogVisibility(dialog, !consent);
  if (consent === 'accepted') {
    startAcceptedTracking(config);
  } else {
    disableTracking({ notifyProviders: true });
  }

  listenOnce(document.querySelector('#cookie-consent-accept'), 'accept', () => {
    writeConsent(storage, 'accepted');
    setConsentDialogVisibility(dialog, false);
    startAcceptedTracking(config);
  });

  listenOnce(document.querySelector('#cookie-consent-reject'), 'reject', () => {
    disableTracking({ notifyProviders: true });
    writeConsent(storage, 'rejected');
    setConsentDialogVisibility(dialog, false);
  });

  document.querySelectorAll('[data-open-cookie-preferences]').forEach((control) => {
    listenOnce(control, 'preferences', () => {
      disableTracking({ notifyProviders: true });
      clearConsent(storage);
      setConsentDialogVisibility(dialog, true);
    });
  });
}

export function bootTracking(config = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (bootedTrackingDocuments.has(document)) return false;

  bootedTrackingDocuments.add(document);
  initTracking(config);
  return true;
}
