"use client";

import { useEffect } from "react";
import { assistant } from "../../content/site";
import { track } from "@/lib/analytics";

const SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";
let loading: Promise<void> | undefined;

/** Loads the ElevenLabs script and mounts the widget once. Nothing is fetched until it's needed. */
function mount(): Promise<void> {
  loading ??= new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => {
      if (!document.querySelector("elevenlabs-convai")) {
        const el = document.createElement("elevenlabs-convai");
        el.setAttribute("agent-id", assistant.agentId);
        document.body.appendChild(el);
      }
      resolve();
    };
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
  return loading;
}

/** Click the widget's own launcher so "Ask my AI assistant" links can open it. */
function open() {
  const root = document.querySelector("elevenlabs-convai")?.shadowRoot;
  root?.querySelector<HTMLElement>("button")?.click();
}

export default function AssistantWidget() {
  useEffect(() => {
    if (!assistant.agentId) return;

    // Load after the first sign the visitor is actually here (scroll, tap, key), or after a quiet 8s.
    const events = ["scroll", "pointerdown", "keydown"] as const;
    const go = () => {
      events.forEach((e) => window.removeEventListener(e, go));
      clearTimeout(timer);
      void mount();
    };
    const timer = setTimeout(go, 8000);
    events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));

    const onOpen = async () => {
      track("assistant-open");
      await mount();
      // the custom element needs a moment to render its shadow DOM
      setTimeout(open, 600);
    };
    window.addEventListener("portfolio:assistant", onOpen);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("portfolio:assistant", onOpen);
    };
  }, []);

  return null;
}
