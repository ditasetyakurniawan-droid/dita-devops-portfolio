import { TOPICS, type CaseStudy, type Scope, type Topic } from "./cases";

export type ScopeFilter = Scope | "all";
export type TopicFilter = Topic | "all";

export function normalizeScope(value: string | null | undefined): ScopeFilter {
  return value === "enterprise" || value === "independent" ? value : "all";
}

export function normalizeTopic(value: string | null | undefined): TopicFilter {
  return TOPICS.some((topic) => topic.id === value) ? value as Topic : "all";
}

export function filterCases(studies: readonly CaseStudy[], scope: ScopeFilter, topic: TopicFilter): CaseStudy[] {
  return studies.filter((study) =>
    (scope === "all" || study.scope === scope) &&
    (topic === "all" || study.tags.includes(topic))
  );
}

export function workQuery(scope: ScopeFilter, topic: TopicFilter): string {
  const params = new URLSearchParams();
  if (scope !== "all") params.set("scope", scope);
  if (topic !== "all") params.set("topic", topic);
  const query = params.toString();
  return query ? "/work?" + query : "/work";
}
