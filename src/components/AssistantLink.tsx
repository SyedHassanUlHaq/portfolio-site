"use client";

import { assistant } from "../../content/site";

/** Text link that opens the AI assistant widget. */
export default function AssistantLink({ className }: { className?: string }) {
  if (!assistant.agentId) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:assistant"))} className={className}>
      {assistant.label}
    </button>
  );
}
