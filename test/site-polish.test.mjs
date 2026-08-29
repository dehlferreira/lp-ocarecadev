import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('mobile reveal animations do not move content outside the viewport', () => {
  const css = read('src/styles/global.css');

  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scroll-animate\.anim-left[\s\S]*translateY\(24px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scroll-animate\.anim-right[\s\S]*translateY\(24px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scrolly-step\.from-left[\s\S]*animation-name:\s*scrolly-rise/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scrolly-step\.from-right[\s\S]*animation-name:\s*scrolly-rise/);
});

test('mobile scrollytelling tracks are shorter to reduce empty scroll space', () => {
  const problem = read('src/components/sections/Problem.astro');
  const agitation = read('src/components/sections/Agitation.astro');
  const solution = read('src/components/sections/Solution.astro');
  const how = read('src/components/sections/HowItWorks.astro');
  const about = read('src/components/sections/About.astro');

  assert.match(problem, /--scrolly-track-mobile:\s*180vh/);
  assert.match(agitation, /--scrolly-track-mobile:\s*180vh/);
  assert.match(solution, /--scrolly-track-mobile:\s*190vh/);
  assert.match(how, /--scrolly-track-mobile:\s*210vh/);
  assert.match(about, /--scrolly-track-mobile:\s*260vh/);
  assert.match(solution, /@media\s*\(max-width:\s*767px\)[\s\S]*\.solution-mockup-col\s*\{\s*max-width:\s*none/);
  assert.match(solution, /@media\s*\(min-width:\s*768px\)[\s\S]*\.solution-mockup-col\s*\{[\s\S]*align-self:\s*stretch/);
  assert.match(read('src\/components\/ui\/HeroMockup.astro'), /\.conversion-mockup--compact\s*\{[\s\S]*height:\s*100%/);
});

test('proof section keeps testimonials in a normal responsive flow without artificial mockups', () => {
  const socialProof = read('src/components/sections/SocialProof.astro');

  assert.match(socialProof, /class="proof-grid"/);
  assert.match(socialProof, /Roberto Almeida/);
  assert.match(socialProof, /Mariana Costa/);
  assert.match(socialProof, /Carlos Moura/);
  assert.doesNotMatch(socialProof, /BeforeAfterMockup/);
  assert.doesNotMatch(socialProof, /scrolly-step/);
  assert.doesNotMatch(socialProof, /proof-mobile/);
});

test('mockups use concrete conversion UI instead of skeleton-only blocks', () => {
  const beforeAfter = read('src/components/ui/BeforeAfterMockup.astro');
  const heroMockup = read('src/components/ui/HeroMockup.astro');

  assert.match(beforeAfter, /Hero sem oferta clara/);
  assert.match(beforeAfter, /Oferta clara/);
  assert.match(heroMockup, /Visita na pagina/);
  assert.match(heroMockup, /Clique no WhatsApp/);
  assert.match(heroMockup, /Lead qualificado/);
  assert.doesNotMatch(heroMockup, /Tratamento odontologico/);
});

test('agitation mockup makes the cost of traffic without leads tangible', () => {
  const frustration = read('src/components/ui/FrustrationChart.astro');

  assert.match(frustration, /Visitas sem conversao/);
  assert.match(frustration, /0 contatos/);
  assert.match(frustration, /Nenhum lead nesta semana/);
  assert.match(frustration, /CTA pouco visivel/);
  assert.doesNotMatch(frustration, /class="bar w-28"/);
});

test('problem section closes with a concrete page audit mockup', () => {
  const problem = read('src/components/sections/Problem.astro');
  const problemMockup = read('src/components/ui/ProblemMockup.astro');

  assert.match(problem, /import ProblemMockup/);
  assert.match(problem, /<ProblemMockup compact \/>/);
  assert.match(problem, /class="problem-mockup-col"/);
  assert.doesNotMatch(problem, /problem-mockup-col scrolly-step/);
  assert.match(problemMockup, /Oferta confusa/);
  assert.match(problemMockup, /Botao sem destaque/);
  assert.match(problemMockup, /Sem proximo passo/);
});

test('problem audit aligns beside the pain list on desktop and fills the mobile container', () => {
  const problem = read('src/components/sections/Problem.astro');
  const problemMockup = read('src/components/ui/ProblemMockup.astro');

  assert.match(problem, /class="container problem-container"/);
  assert.match(problem, /@media\s*\(min-width:\s*768px\)[\s\S]*\.problem-container\s*\{[\s\S]*max-width:\s*1200px/);
  assert.match(problem, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(problem, /class="problem-left"/);
  assert.match(problem, /\.problem-left\s*\{[\s\S]*grid-column:\s*1/);
  assert.match(problem, /\.problem-mockup-col\s*\{[\s\S]*grid-column:\s*2/);
  assert.match(problemMockup, /\.problem-mockup--compact\s*\{[\s\S]*height:\s*100%/);
  assert.match(problemMockup, /\.audit-findings span\s*\{[\s\S]*font-size:\s*0\.6rem/);
  assert.match(problem, /@media\s*\(max-width:\s*767px\)[\s\S]*\.problem-mockup-col\s*\{\s*max-width:\s*none/);
  assert.match(problemMockup, /\.problem-mockup--compact\s*\{[\s\S]*max-width:\s*none/);
});

test('solution and agitation mockups prioritize the available desktop width', () => {
  const solution = read('src/components/sections/Solution.astro');
  const agitation = read('src/components/sections/Agitation.astro');
  const frustration = read('src/components/ui/FrustrationChart.astro');

  assert.match(solution, /\.container\s*\{[\s\S]*max-width:\s*1200px/);
  assert.match(solution, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(agitation, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(agitation, /@media\s*\(min-width:\s*768px\)[\s\S]*\.frustration-img-container\s*\{[\s\S]*max-width:\s*none/);
  assert.match(agitation, /@media\s*\(max-width:\s*767px\)[\s\S]*\.frustration-img-container\s*\{\s*max-width:\s*none/);
  assert.match(frustration, /\.frustration-mockup--compact\s*\{[\s\S]*max-width:\s*none/);
});
