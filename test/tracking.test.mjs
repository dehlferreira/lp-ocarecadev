import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  CONSENT_STORAGE_KEY,
  buildLeadPayload,
  isConfigured,
  readConsent,
} from '../src/scripts/tracking.js';

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
  assert.match(acceptedBranch[1], /loadGoogle\(config\);/);
  assert.match(acceptedBranch[1], /loadMeta\(config\);/);
  assert.doesNotMatch(source.replace(acceptedBranch[0], ''), /loadGoogle\(config\);|loadMeta\(config\);/);
});

test('scroll depth deduplicates each threshold independently', () => {
  const source = readFileSync(new URL('../src/scripts/tracking.js', import.meta.url), 'utf8');
  assert.match(source, /scroll_depth:\$\{payload\.percent_scrolled\}/);
});
