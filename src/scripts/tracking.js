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

function getConfiguredId(value, prefix) {
  return isConfigured(value, prefix) ? value.trim() : null;
}

function getGoogleAdsConversionLabel(value) {
  return typeof value === 'string' && value.trim() && !value.includes('XXXX')
    ? value.trim()
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

function appendPartytownScript(provider, src) {
  return safeCall(() => {
    if (document.querySelector(`script[data-tracking-provider="${provider}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/partytown';
    script.src = src;
    script.dataset.trackingProvider = provider;
    document.head.append(script);
  });
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
  const gaId = getConfiguredId(config.gaId, 'G-');
  const googleAdsId = getConfiguredId(config.googleAdsId, 'AW-');

  if (!gaId && !googleAdsId) return;

  appendPartytownScript('google', `https://www.googletagmanager.com/gtag/js?id=${gaId || googleAdsId}`);
  callGtag('js', new Date());
  if (gaId) callGtag('config', gaId);
  if (googleAdsId) callGtag('config', googleAdsId);
}

function loadMeta(config) {
  const metaPixelId = getMetaPixelId(config.metaPixelId);

  if (!metaPixelId) return;

  appendPartytownScript('meta', 'https://connect.facebook.net/en_US/fbevents.js');
  callFbq('init', metaPixelId);
}

function eventKey(eventName, payload) {
  if (eventName === 'scroll_depth') return `scroll_depth:${payload.percent_scrolled}`;
  return payload.event_id ? `${eventName}:${payload.event_id}` : eventName;
}

function trackEvent(config, eventName, payload = {}) {
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

function trackPageView(config) {
  trackEvent(config, 'page_view');
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

function getLocalStorage() {
  return safeCall(() => window.localStorage) || null;
}

export function initTracking(config = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const consent = readConsent(getLocalStorage());
  if (consent === 'accepted') {
    loadGoogle(config);
    loadMeta(config);
    trackPageView(config);
  }
}
