const freezeScenario = (scenario) => Object.freeze({
  ...scenario,
  conditions: Object.freeze({ ...scenario.conditions }),
});

export const CONDITION_META = Object.freeze({
  outcome: Object.freeze({
    label: 'Outcome',
    prompt: 'Is success defined before configuration begins?',
  }),
  readiness: Object.freeze({
    label: 'Readiness',
    prompt: 'Can data, integrations, policy, and risk support the launch?',
  }),
  adoption: Object.freeze({
    label: 'Adoption',
    prompt: 'Will frontline and supervisors change how the work gets done?',
  }),
  evidence: Object.freeze({
    label: 'Evidence',
    prompt: 'Will the team know quickly whether behavior and outcomes moved?',
  }),
});

export const SCENARIOS = Object.freeze({
  'ai-agent': freezeScenario({
    id: 'ai-agent',
    label: 'AI Agent',
    context: 'A customer-facing agent is technically ready, but the release decision lacks an agreed evidence threshold.',
    weakCondition: 'evidence',
    conditions: { outcome: 84, readiness: 82, adoption: 78, evidence: 52 },
    stalledDiagnosis: 'The build can launch, but the customer cannot yet distinguish an impressive demo from a production-safe operating result.',
    realizedDiagnosis: 'Release criteria, exception signals, and an optimization cadence turn the launch into an observable operating commitment.',
    nextDecision: 'Agree on the minimum evidence required to release, hold, intervene, or expand.',
    successSignal: 'Containment and customer experience improve without hidden escalation, policy, or trust costs.',
  }),
  'agent-assist': freezeScenario({
    id: 'agent-assist',
    label: 'Agent Assist',
    context: 'The guidance works, but frontline behavior and supervisor reinforcement have not been designed into deployment.',
    weakCondition: 'adoption',
    conditions: { outcome: 86, readiness: 80, adoption: 49, evidence: 78 },
    stalledDiagnosis: 'The capability is present in the workflow, yet inconsistent use keeps technical availability from becoming operating impact.',
    realizedDiagnosis: 'Role-based enablement, supervisor reinforcement, and visible agent feedback make the new behavior easier to repeat.',
    nextDecision: 'Name the behavior that must change and the supervisor cadence that will reinforce it.',
    successSignal: 'Usage quality and target operating metrics move together—not merely login counts.',
  }),
  'conversation-intelligence': freezeScenario({
    id: 'conversation-intelligence',
    label: 'Conversation Intelligence',
    context: 'The platform can surface signals, but ownership of the resulting decisions remains diffuse.',
    weakCondition: 'outcome',
    conditions: { outcome: 55, readiness: 83, adoption: 77, evidence: 88 },
    stalledDiagnosis: 'More insight arrives, but no one has committed to the decision, baseline, or operating action the insight should change.',
    realizedDiagnosis: 'A named outcome and decision owner convert conversation signal into a repeatable management intervention.',
    nextDecision: 'Choose the business decision this signal must improve and who owns acting on it.',
    successSignal: 'The analysis changes a defined coaching, quality, service, retention, or revenue decision.',
  }),
});

export function getScenario(id) {
  return SCENARIOS[id] ?? SCENARIOS['ai-agent'];
}

export function activateCondition(scenario, conditionId) {
  if (!Object.hasOwn(CONDITION_META, conditionId)) return scenario;

  return freezeScenario({
    ...scenario,
    conditions: {
      ...scenario.conditions,
      [conditionId]: Math.max(90, scenario.conditions[conditionId]),
    },
  });
}

export function getActivationState(scenario) {
  const values = Object.values(scenario.conditions);
  const floor = Math.min(...values);
  return Object.freeze({
    score: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
    floor,
    status: floor >= 75 ? 'realized' : 'stalled',
  });
}
