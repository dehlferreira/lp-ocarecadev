import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

test('social proof section completely removes synthetic/fake testimonials', () => {
  const component = read('src/components/sections/SocialProof.astro');

  assert.doesNotMatch(component, /Roberto Almeida/, 'Roberto Almeida must be completely removed');
  assert.doesNotMatch(component, /Mariana Costa/, 'Mariana Costa must be completely removed');
  assert.doesNotMatch(component, /Carlos Moura/, 'Carlos Moura must be completely removed');
  assert.doesNotMatch(component, /TechGrowth/, 'TechGrowth must be completely removed');
  assert.doesNotMatch(component, /Agencia XYZ/, 'Agencia XYZ must be completely removed');
});

test('social proof assets exist in canonical directories', () => {
  assert.ok(exists('src/assets/images/proof-whatsapp-vinicius.webp'), 'Vinicius WhatsApp image must exist');
  assert.ok(exists('src/assets/images/proof-instagram-carrera.webp'), 'Carrera Instagram image must exist');
  assert.ok(exists('public/audio/social-proof-audio-1.mp3'), 'Audio 1 mp3 file must exist in public/audio/');
  assert.ok(exists('public/audio/social-proof-audio-2.mp3'), 'Audio 2 mp3 file must exist in public/audio/');
  assert.ok(exists('public/videos/social-proof-audio-1.mp4'), 'Audio 1 video file must exist in public/videos/');
  assert.ok(exists('public/videos/social-proof-audio-2.mp4'), 'Audio 2 video file must exist in public/videos/');
});

test('social proof section renders 4 authentic cases with proper channels and badges', () => {
  const component = read('src/components/sections/SocialProof.astro');

  // Case 1: Carrera Consórcio
  assert.match(component, /Grupo Carrera Consórcio/);
  assert.match(component, /@grupocarreraconsorcio/);
  assert.match(component, /Ficou extraordinário/);

  // Case 2: Vinicius Oliveira
  assert.match(component, /Vinicius Oliveira/);
  assert.match(component, /anúncios pro adwords/);
  assert.match(component, /verified-icon/);

  // Case 3 & 4: Audios
  assert.match(component, /social-proof-audio-1\.mp3/);
  assert.match(component, /social-proof-audio-2\.mp3/);
});

test('whatsapp audio players provide accessible controls and waveforms without video clutter (G1, G4)', () => {
  const component = read('src/components/sections/SocialProof.astro');

  // No raw <video controls> on the page
  assert.doesNotMatch(component, /<video[^>]*controls/);

  // WhatsApp audio players present
  const audioPlayers = component.match(/class="wa-audio-balloon"[^>]*data-audio-player/g) || [];
  assert.equal(audioPlayers.length, 2, 'Must have exactly 2 WhatsApp audio balloons');

  // Play buttons
  assert.match(component, /class="wa-play-btn"/);
  assert.match(component, /aria-label="Reproduzir áudio/);

  // Waveform progress
  assert.match(component, /class="wa-waveform"/);
  assert.match(component, /role="progressbar"/);
  assert.match(component, /class="wa-bar"/);

  // Time display and speed button
  assert.match(component, /class="wa-time"/);
  assert.match(component, /class="wa-speed-btn"/);

  // Audio transcripts are in the DOM for screen readers and silent reading
  assert.match(component, /class="transcript-box"/);
  assert.match(component, /Ler transcrição do áudio/);
});

test('prints use 9:16 vertical smartphone ratio and native accessible lightbox (G1, G3, G7)', () => {
  const component = read('src/components/sections/SocialProof.astro');

  // 9:16 Smartphone frames
  assert.match(component, /class="phone-frame-916"/);
  assert.match(component, /aspect-ratio:\s*9\s*\/\s*16/);
  assert.match(component, /class="phone-island"/);
  assert.match(component, /class="phone-zoom-overlay-btn mockup-zoom-btn"/);

  // Lightbox dialog
  assert.match(component, /<dialog id="proof-lightbox"/);
  assert.match(component, /class="lightbox-close-btn"/);
  assert.match(component, /aria-label="Fechar visualização"/);
  assert.match(component, /data-dialog-src/);
});
