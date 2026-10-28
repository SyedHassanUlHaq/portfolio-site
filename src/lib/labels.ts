import { INDUSTRIES, PROJECT_TYPES, TECH, type Term } from "../../content/taxonomy";

const pick = (t: Record<string, Term>) => (id: string) => t[id]?.label ?? id;
export const typeLabel = pick(PROJECT_TYPES);
export const industryLabel = pick(INDUSTRIES);
export const techLabel = pick(TECH);
