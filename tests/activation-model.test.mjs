import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SCENARIOS,
  getScenario,
  activateCondition,
  getActivationState,
} from '../assets/js/activation-model.js';

test('exposes three role-relevant scenarios', () => {
  assert.deepEqual(Object.keys(SCENARIOS), [
    'ai-agent',
    'agent-assist',
    'conversation-intelligence',
  ]);
});

test('unknown scenario safely resolves to AI Agent', () => {
  assert.equal(getScenario('missing').id, 'ai-agent');
});

test('strengthening the weak condition realizes the outcome', () => {
  const scenario = getScenario('agent-assist');
  assert.equal(getActivationState(scenario).status, 'stalled');
  const activated = activateCondition(scenario, scenario.weakCondition);
  assert.equal(getActivationState(activated).status, 'realized');
});

test('activation is immutable and ignores unknown conditions', () => {
  const scenario = getScenario('ai-agent');
  const unchanged = activateCondition(scenario, 'unknown');
  assert.deepEqual(unchanged, scenario);
  assert.notStrictEqual(activateCondition(scenario, scenario.weakCondition), scenario);
});
