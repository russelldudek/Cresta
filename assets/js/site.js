import {
  CONDITION_META,
  getScenario,
  activateCondition,
  getActivationState,
} from './activation-model.js';

function setText(root, selector, value) {
  const node = root.querySelector(selector);
  if (node) node.textContent = value;
}

export function renderBoundary(root, scenario) {
  const boundary = root.querySelector('#activation-boundary');
  if (!boundary) return;

  const state = getActivationState(scenario);
  boundary.dataset.status = state.status;
  boundary.dataset.weakCondition = scenario.weakCondition;

  setText(root, '#scenario-context', scenario.context);
  setText(root, '#activation-score', String(state.score));
  setText(
    root,
    '#activation-diagnosis',
    state.status === 'realized' ? scenario.realizedDiagnosis : scenario.stalledDiagnosis,
  );
  setText(root, '#next-decision', scenario.nextDecision);
  setText(root, '#success-signal', scenario.successSignal);

  const weakLabel = CONDITION_META[scenario.weakCondition].label;
  const statusText = state.status === 'realized'
    ? `${scenario.label} crosses the boundary. The outcome is now observable and ready to improve.`
    : `${scenario.label} is stalled at ${weakLabel}. Repair the weak condition to realize the outcome.`;
  setText(root, '#activation-status', statusText);

  root.querySelectorAll('[data-scenario]').forEach((button) => {
    const isActive = button.dataset.scenario === scenario.id;
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  root.querySelectorAll('[data-condition]').forEach((button) => {
    const id = button.dataset.condition;
    const value = scenario.conditions[id];
    const isStrong = value >= 75;
    button.setAttribute('aria-pressed', String(isStrong));
    button.dataset.strength = isStrong ? 'strong' : 'weak';
    button.style.setProperty('--condition-value', `${value}%`);
    setText(button, `[data-value="${id}"]`, String(value));
    const meter = button.querySelector(`[data-meter="${id}"]`);
    if (meter) meter.style.width = `${value}%`;
  });
}

export function initializeActivationBoundary(root = document) {
  const boundary = root.querySelector('#activation-boundary');
  if (!boundary) return;

  let active = getScenario('ai-agent');
  const render = () => renderBoundary(root, active);

  root.querySelectorAll('[data-scenario]').forEach((button, index, buttons) => {
    button.addEventListener('click', () => {
      active = getScenario(button.dataset.scenario);
      render();
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const next = buttons[(index + offset + buttons.length) % buttons.length];
      next.focus();
      next.click();
    });
  });

  root.querySelectorAll('[data-condition]').forEach((button) => {
    button.addEventListener('click', () => {
      active = activateCondition(active, button.dataset.condition);
      render();
    });
  });

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initializeActivationBoundary());
} else {
  initializeActivationBoundary();
}
