import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { test } from 'node:test';

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
}
function exists(path) {
  return existsSync(new URL(`../${path}`, import.meta.url));
}

const AGENTS = read('AGENTS.md');
const agentFiles = readdirSync(new URL('../.claude/agents', import.meta.url)).filter((f) => f.endsWith('.md'));
const skillDirs = readdirSync(new URL('../skills', import.meta.url), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const agents = agentFiles.map((f) => ({ name: f.replace(/\.md$/, ''), path: `.claude/agents/${f}`, text: read(`.claude/agents/${f}`) }));
const skills = skillDirs.map((d) => ({ name: d, path: `skills/${d}/SKILL.md`, text: read(`skills/${d}/SKILL.md`) }));
const allPrompts = [{ name: 'AGENTS.md', path: 'AGENTS.md', text: AGENTS }, ...agents, ...skills];

const CANONICAL = /\*\*G(\d+) — /g;
const ANNOTATION = /\*\*G(\d+)\*\*/g;
const CITATION = /\bG(\d+)\b/g;
const matchAll = (text, re) => [...text.matchAll(re)].map((m) => Number(m[1]));

test('AGENTS.md defines the canonical guardrails G1..Gn with no gaps', () => {
  const defined = matchAll(AGENTS, CANONICAL);
  assert.ok(defined.length >= 8, `esperava ao menos 8 guardrails canônicos, achei ${defined.length}`);
  assert.deepEqual(defined, [...defined].sort((a, b) => a - b), 'guardrails fora de ordem em AGENTS.md');
  assert.deepEqual(defined, defined.map((_, i) => i + 1), 'numeração de guardrails com buraco ou repetição');
});

test('only AGENTS.md enumerates the guardrails — skills annotate, never restate', () => {
  for (const doc of allPrompts) {
    if (doc.path === 'AGENTS.md') continue;
    const restated = matchAll(doc.text, CANONICAL);
    assert.equal(restated.length, 0, `${doc.path} reescreve a enumeração canônica (G${restated.join(', G')}) — deve citar AGENTS.md`);
  }
});

test('the Dev skill and the QA skill each annotate every canonical guardrail', () => {
  const defined = matchAll(AGENTS, CANONICAL);
  for (const name of ['astro-implementation', 'landing-quality-assurance']) {
    const skill = skills.find((s) => s.name === name);
    assert.ok(skill, `skill ${name} não encontrada`);
    const annotated = new Set(matchAll(skill.text, ANNOTATION));
    for (const g of defined) {
      assert.ok(annotated.has(g), `${skill.path} não anota G${g} — todo guardrail precisa de "como implementar" e "como verificar"`);
    }
  }
});

test('every guardrail cited anywhere exists in AGENTS.md', () => {
  const defined = new Set(matchAll(AGENTS, CANONICAL));
  for (const doc of allPrompts) {
    for (const g of new Set(matchAll(doc.text, CITATION))) {
      assert.ok(defined.has(g), `${doc.path} cita G${g}, que não existe em AGENTS.md`);
    }
  }
});

test('the SPEC skill delegates the guardrail list instead of owning it', () => {
  const spec = skills.find((s) => s.name === 'technical-design');
  assert.match(spec.text, /AGENTS\.md §Guardrails/, 'technical-design precisa apontar para a enumeração canônica');
  assert.match(spec.text, /Não a reescreva na SPEC/, 'technical-design precisa proibir explicitamente a cópia da lista');
});

test('every agent declares name and description, and name matches the filename', () => {
  for (const agent of agents) {
    const fm = agent.text.split('---')[1];
    assert.ok(fm, `${agent.path} sem frontmatter`);
    for (const field of ['name', 'description']) {
      assert.match(fm, new RegExp(`^${field}:\\s*\\S`, 'm'), `${agent.path} sem campo "${field}"`);
    }
    assert.match(fm, new RegExp(`^name:\\s*${agent.name}\\s*$`, 'm'), `${agent.path}: name diverge do nome do arquivo`);
  }
});

test('every skill declares name matching its folder, and frontmatter fits the 1024-char limit', () => {
  for (const skill of skills) {
    const fm = skill.text.split('---')[1];
    assert.ok(fm, `${skill.path} sem frontmatter`);
    assert.match(fm, new RegExp(`^name:\\s*${skill.name}\\s*$`, 'm'), `${skill.path}: name diverge da pasta`);
    assert.match(fm, /^description:\s*\S/m, `${skill.path} sem description`);
    assert.ok(fm.length <= 1024, `${skill.path}: frontmatter com ${fm.length} chars, limite é 1024`);
  }
});

test('AGENTS.md routes to every agent and every skill that exists', () => {
  for (const agent of agents) {
    assert.ok(AGENTS.includes(`\`${agent.name}\``), `AGENTS.md não menciona o agente ${agent.name}`);
  }
  for (const skill of skills) {
    assert.ok(AGENTS.includes(`skills/${skill.name}/`), `AGENTS.md não menciona a skill ${skill.name}`);
  }
});

test('every repo path cited by a prompt actually exists', () => {
  const PATH = /`((?:docs|skills|src|test|public)\/[\w./§-]*?\.(?:md|mjs|js|css|ts|astro))`/g;
  for (const doc of allPrompts) {
    for (const m of doc.text.matchAll(PATH)) {
      const path = m[1].replace(/§.*$/, '');
      if (
        path.includes('NNN') ||
        path.includes('...') ||
        path.includes('descricao-curta') ||
        path.includes('exemplo') ||
        path.includes('###')
      ) {
        continue;
      }
      assert.ok(exists(path), `${doc.path} cita ${path}, que não existe`);
    }
  }
});

test('every npm script cited by a prompt exists in package.json', () => {
  const scripts = JSON.parse(read('package.json')).scripts;
  for (const doc of allPrompts) {
    for (const m of doc.text.matchAll(/npm run ([\w:-]+)/g)) {
      assert.ok(scripts[m[1]], `${doc.path} cita "npm run ${m[1]}", que não existe em package.json`);
    }
    if (/npm test\b/.test(doc.text)) assert.ok(scripts.test, `${doc.path} cita "npm test", que não existe em package.json`);
  }
});

test('no prompt hardcodes a test-count baseline that goes stale', () => {
  for (const doc of allPrompts) {
    const stale = doc.text.match(/baseline[^.\n]*?\d+/i);
    assert.equal(stale, null, `${doc.path} crava contagem em baseline ("${stale?.[0]}") — o critério é 0 falhas`);
  }
});
