// @ts-check
import { defineConfig } from 'astro/config';

import partytown from '@astrojs/partytown';

/**
 * @param {URL} url
 * @param {Location} location
 * @param {import('@qwik.dev/partytown/integration').ResolveUrlType} type
 */
export function resolvePartytownUrl(url, location, type) {
  if (type !== 'script' || url.hostname !== 'connect.facebook.net') return url;

  const proxyUrl = new URL('/partytown-proxy', location.origin);
  proxyUrl.searchParams.set('url', url.href);
  return proxyUrl;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ocarecadev.com.br',
  integrations: [partytown({
    config: {
      forward: ['dataLayer.push', 'fbq'],
      resolveUrl: resolvePartytownUrl,
    },
  })],
  server: {
    host: true
  }
});
